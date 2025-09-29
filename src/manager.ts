import { Stack } from "./stack";
import { StackableWindow, type StackableWindowStack } from "./stackableWindow";
import { Qt } from "./typings/qt";
import {
  detectEdgeWindowIsTouching,
  getCornerNeighbor,
  getCornersFromEdge,
  getInitialPlacement,
  getScreensClientArea,
  isHovered,
  isPipWindow,
  rectCenter,
  screenName,
} from "./utils";

export class Manager {
  /** All Stackable Windows handled by the script. */
  protected _stackWindows: Set<StackableWindow> = new Set();
  /** List of all stacks, grouped by their screen. */
  protected _stacks: Map<KWin.Output, Map<Qt.Corner, Stack>> = new Map();
  /** All windows that were handled by the script. */
  protected _allWindows: Set<KWin.Window> = new Set();
  /** Previously active window. */
  protected _prevActiveWindow: KWin.Window | null = this.activeWindow;
  /** List of `move`/`resize` actions user is currently executing. */
  protected _moveResize: ("move" | "resize")[] = [];
  /**
   * List of windows that weren't moved "interactively" by the user.
   *
   * This could be caused by the user moving the window with a keyboard shortcut, monitor being turned off/disabled etc.
   */
  protected _windowsMovedByKWin: Set<StackableWindow> = new Set();

  protected error = {
    stackMissing: (screen: KWin.Output, corner: Qt.Corner) => {
      console.warn(
        `Stack at screen ${screenName(screen)}`,
        `and corner ${corner} doesn't exists!`,
      );
    },
    screenMissing: (screen: KWin.Output) => {
      console.error(`Screen ${screenName(screen)} doesn't exists!`);
    },
    windowNotAdded: (window: StackableWindow | KWin.Window) => {
      console.error(`Window ${window.caption} hasn't been yet added!`);
    },
  };

  constructor() {
    console.info(`Loading ${__NAME__} script...`);

    this.addMissingScreens();

    const onWindowAdded = this.connect();

    for (const w of workspace.windowList()) onWindowAdded(w);
    console.info(`Handled ${this._allWindows.size} windows`);

    console.info(`${__NAME__} script loaded!`);
  }

  // #region getters/setters
  get stackWindowsArray() {
    return Array.from(this._stackWindows);
  }

  get cursorPosition() {
    return workspace.cursorPos;
  }

  get activeWindow(): KWin.Window | null {
    return workspace.activeWindow;
  }

  set activeWindow(window: KWin.Window) {
    workspace.activeWindow = window;
  }

  get hoveredWindows() {
    // we don't use `windowAt` because when window is being removed, it won't be included in the returned list of windows
    return workspace.windowList().filter(isHovered);
    // return workspace.windowAt(workspace.cursorPos, -1) ?? [];
  }

  get screens() {
    return workspace.screens;
  }

  get activeScreen() {
    // we don't use `workspace.activeScreen` because we only care about screen with cursor on it, and not where active window is
    return workspace.screenAt(this.cursorPosition);
  }
  // #endregion

  // #region events
  protected onWindowAdded(window: KWin.Window) {
    if (!isPipWindow(window)) return;

    const w = new StackableWindow(window);
    this._stackWindows.add(w);

    console.info(`Adding window "${w.caption}"`);

    const [screen, corner] = getInitialPlacement(window, this.activeScreen);

    const stack = this.getStack(screen, corner);
    if (!stack) {
      this.error.stackMissing(screen, corner);
      return;
    }

    this.attachWindow(w, screen, corner, true);

    if (
      this.activeWindow === window &&
      this._prevActiveWindow &&
      !isHovered(window)
    ) {
      // focus stealing prevention when PiP window opens
      console.info(
        `Prevented focus stealing, restoring focus to window`,
        `"${this._prevActiveWindow.caption}"`,
      );
      this.activeWindow = this._prevActiveWindow;
    }

    this.update();
  }

  protected onWindowRemoved(window: KWin.Window) {
    if (!isPipWindow(window)) return;

    const w = this.findWindow(window);
    if (!w) {
      this.error.windowNotAdded(window);
      return;
    }

    // focus other window on the stack if the closed one is focused to avoid them moving to a different screen suddenly
    if (isHovered(window) && this.isWindowAttached(w)) {
      const stack = this.getStack(w.screen, w.corner);
      if (stack && stack.windows.length > 1) {
        this.activeWindow = stack.windows.filter((i) => i !== w)[0]!.window;
      }
    }

    console.info(`Removing window "${window.caption}"`);
    this.detachWindow(w);
    this._stackWindows.delete(w);

    this.moveAllAutomaticallyMoveableWindows();
    this.update();
  }

  protected onWindowActivated(window: KWin.Window) {
    this.moveAllAutomaticallyMoveableWindows();
    if (this._prevActiveWindow !== window) this._prevActiveWindow = window;
  }

  protected onWindowFullscreenChanged(
    window: KWin.Window,
    fullscreen: boolean,
  ) {
    if (isPipWindow(window)) {
      const w = this.findWindow(window);
      if (!w) return;

      if (fullscreen) {
        if (this.isWindowAttached(w)) {
          this.detachWindow(w);
          this.moveAllWindowsToNeighborCorners(window.output, false, false);
        }
      } else {
        this.attachWindowToClosestCorner(w);
        this.moveAllWindowsToNeighborCorners(window.output, true, false);
      }
    } else if (fullscreen) {
      this.moveAllWindowsToNeighborCorners(window.output, false, false);
    } else {
      this.moveAllAutomaticallyMoveableWindows();
    }

    this.update();
  }

  protected onWindowMovedResized(
    window: KWin.Window,
    isMoving: boolean,
    isResizing: boolean,
  ) {
    if (!isPipWindow(window)) return;

    const w = this.findWindow(window);
    if (!w) return;

    const wasMoving = this._moveResize.includes("move");
    const wasResizing = this._moveResize.includes("resize");

    if (isMoving && this.isWindowAttached(w)) {
      this.detachWindow(w, true);
    } else if (!isMoving && wasMoving && !this.isWindowAttached(w)) {
      this.attachWindowToClosestCorner(w, true);
      this.update();
    } else if (!isResizing && wasResizing && this.isWindowAttached(w)) {
      this.getStack(w.screen, w.corner)?.resizeWindows(w.window.frameGeometry);
      this.update();
    }

    this._windowsMovedByKWin.delete(w);
    this._moveResize = [
      ...(isMoving ? (["move"] as const) : []),
      ...(isResizing ? (["resize"] as const) : []),
    ];
  }

  protected onWindowFrameGeometryChanged(
    window: KWin.Window,
    frameGeometry: QRect,
  ) {
    if (!isPipWindow(window)) return;
    const w = this.findWindow(window);
    if (!w) return;

    // these cases are already handled bt `onWindowMovedResized`
    if (window.move || window.resize) return;

    // prefer the corner window was already attached to
    const corner = this.isWindowAttached(w)
      ? w.corner
      : this.detectClosestCorner(window);

    const screen = window.output;

    // special case for when window has been moved by KWin
    if (corner !== w.corner || screen !== w.screen) {
      if (this.isWindowAttached(w)) {
        this._windowsMovedByKWin.add(w);
        this.detachWindow(w);
      }

      if (corner !== undefined) this.attachWindow(w, w.window.output, corner);

      this.update();
    }
  }

  protected onCursorPosChanged(pos: QPoint) {
    this.moveAllAutomaticallyMoveableWindows();
  }
  // #endregion

  // #region screen
  addScreen(screen: KWin.Output) {
    console.info(`Adding screen ${screenName(screen)}`);

    this._stacks.set(
      screen,
      new Map([
        [Qt.Corner.TopLeft, new Stack(screen, Qt.Corner.TopLeft)],
        [Qt.Corner.TopRight, new Stack(screen, Qt.Corner.TopRight)],
        [Qt.Corner.BottomLeft, new Stack(screen, Qt.Corner.BottomLeft)],
        [Qt.Corner.BottomRight, new Stack(screen, Qt.Corner.BottomRight)],
      ]),
    );

    // find any pip windows on added screen, this can happen if screen was removed and then window has been automatically moved by KWin, and then screen was added back so KWin moved the window back
    for (const window of workspace
      .windowList()
      .filter((i) => i.output === screen)) {
      const w = this.findWindow(window);
      if (!w || this.isWindowAttached(w)) continue;
      this.attachWindowToClosestCorner(w);
    }
  }

  addMissingScreens() {
    for (const screen of this.screens) {
      if (this._stacks.has(screen)) continue;
      this.addScreen(screen);
    }
  }

  removeScreen(screen: KWin.Output) {
    if (!this._stacks.has(screen)) return;

    // there's a very rare case where `screen` can be null
    if (!screen) {
      console.warn(`Removed screen is ${screen}! Trying to recover...`);
      this._stacks.delete(screen);
      return;
    }

    console.info(`Removing screen ${screenName(screen)}`);

    this.moveAllWindowsToNeighborCorners(screen, false, true);

    for (const window of this._windowsMovedByKWin) {
      if (!window.userStack) continue;

      const { screen: oldScreen, corner: oldCorner } = window.userStack;
      const neighbor = getCornerNeighbor(oldScreen, oldCorner, true);

      if (!neighbor) continue;
      const [bestScreen, bestCorner] = neighbor;

      if (this.isWindowAttached(window)) this.detachWindow(window);
      this.attachWindow(window, bestScreen, bestCorner);
      this._windowsMovedByKWin.delete(window);
    }

    this._stacks.delete(screen);
  }
  // #endregion

  getStack(screen: KWin.Output, corner: Qt.Corner) {
    return this._stacks.get(screen)?.get(corner);
  }

  findWindow(window: KWin.Window) {
    return this.stackWindowsArray.find((i) => i.window === window);
  }

  getWindowsOnScreen(screen: KWin.Output) {
    return this.stackWindowsArray.filter((i) => i.screen === screen);
  }

  getWindowsAttachedToCorner(screen: KWin.Output, corner: Qt.Corner) {
    return this.stackWindowsArray.filter(
      (i) => i.screen === screen && i.corner === corner,
    );
  }

  getAutomaticallyMoveableWindowsOnScreen(screen: KWin.Output) {
    return this.getWindowsOnScreen(screen).filter((i) => {
      if (i.corner === undefined) return false;
      if (!getCornerNeighbor(screen, i.corner)) return false;
      return true;
    });
  }

  detectClosestCorner(window: KWin.Window) {
    const edge = detectEdgeWindowIsTouching(window);
    if (edge === undefined) return;

    const corners = getCornersFromEdge(edge);
    const clientArea = getScreensClientArea(window.output);
    const wCenter = rectCenter(window.frameGeometry);
    const sCenter = rectCenter(clientArea);
    let cornerIdx: number;

    if ([Qt.Edge.Top, Qt.Edge.Bottom].includes(edge)) {
      cornerIdx = Number(wCenter.x >= sCenter.x);
    } else {
      const stackPos = corners.map((i, idx) => {
        const windows = this.getStack(window.output, i)?.windows.reverse();
        if (!windows?.[0]) return clientArea[!idx ? "top" : "bottom"];
        return windows?.[0]?.window.frameGeometry[!idx ? "bottom" : "top"];
      }) as [number, number];

      const stackCenter = stackPos[0] + (stackPos[1] - stackPos[0]) / 2;

      cornerIdx = Number(wCenter.y >= stackCenter);
    }

    return corners[cornerIdx]!;
  }

  isWindowAttached(window: StackableWindow): window is StackableWindow & {
    stack: StackableWindowStack;
    corner: Qt.Corner;
    screen: KWin.Output;
  } {
    if (window.corner === undefined || !window.screen) return false;
    const stack = this.getStack(window.screen, window.corner);
    return stack?.hasWindow(window) ?? false;
  }

  attachWindow(
    window: StackableWindow,
    screen: KWin.Output,
    corner: Qt.Corner,
    userRequested: boolean = false,
  ) {
    if (!this._stackWindows.has(window)) {
      this.error.windowNotAdded(window);
      return;
    }

    if (this.isWindowAttached(window)) {
      console.warn(`Window "${window.caption}" is already attached!`);
      return;
    }

    const stack = this.getStack(screen, corner);

    if (!stack) {
      this.error.stackMissing(screen, corner);
      return;
    }

    console.info(
      `Attaching window "${window.caption}"`,
      `to screen ${screenName(screen)} and corner ${corner}`,
    );

    stack.attach(window, userRequested);
  }

  detachWindow(window: StackableWindow, userRequested: boolean = false) {
    if (!this._stackWindows.has(window)) {
      this.error.windowNotAdded(window);
      return;
    }

    if (!this.isWindowAttached(window)) {
      console.warn(`Window "${window.caption}" has already been detached!`);
      return;
    }

    const stack = this.getStack(window.screen, window.corner);

    if (!stack) {
      this.error.stackMissing(window.screen, window.corner);
      return;
    }

    if (!stack.hasWindow(window)) {
      console.error(`Window "${window.caption}" is in a bad state!`);
      return;
    }

    console.info(
      `Detaching window "${window.caption}"`,
      `from screen ${screenName(window.screen)} at corner ${window.corner}`,
    );

    stack.detach(window, userRequested);
  }

  attachWindowToClosestCorner(
    window: StackableWindow,
    userRequested: boolean = false,
  ) {
    const corner = this.detectClosestCorner(window.window);
    if (corner === undefined) return;

    if (this.isWindowAttached(window)) this.detachWindow(window, userRequested);
    this.attachWindow(window, window.window.output, corner, userRequested);
  }

  moveAllWindowsFromCornerToCorner(
    from: { screen: KWin.Output; corner: Qt.Corner },
    to: { screen: KWin.Output; corner: Qt.Corner },
    ignoreFocused: boolean,
  ) {
    const fromStack = this.getStack(from.screen, from.corner);
    const toStack = this.getStack(to.screen, to.corner);

    if (!fromStack || !toStack) {
      if (!fromStack) this.error.stackMissing(from.screen, from.corner);
      if (!toStack) this.error.stackMissing(to.screen, to.corner);
      return;
    }

    let windows = fromStack.windows;
    if (ignoreFocused) windows = windows.filter((i) => !i.window.active);

    if (!windows.length) return;

    console.info(
      `Moving ${windows.length} windows`,
      `from screen ${screenName(from.screen)} at corner ${from.corner}`,
      `to screen ${screenName(to.screen)} at corner ${to.corner}`,
    );

    fromStack.detach(windows, false);
    toStack.attach(windows, false);
  }

  moveAllWindowsToCorner(
    from: KWin.Output,
    to: { screen: KWin.Output; corner: Qt.Corner },
    ignoreFocused: boolean,
  ) {
    const fromScreen = this._stacks.get(from);

    if (!fromScreen) {
      this.error.screenMissing(from);
      return;
    }

    for (const [corner] of fromScreen) {
      this.moveAllWindowsFromCornerToCorner(
        { screen: from, corner: corner },
        to,
        ignoreFocused,
      );
    }
  }

  moveAllWindowsToNeighborCorners(
    screen: KWin.Output,
    ignoreFocused: boolean,
    allowOtherDirections: boolean,
  ) {
    const fromScreen = this._stacks.get(screen);

    if (!fromScreen) {
      this.error.screenMissing(screen);
      return;
    }

    for (const [corner] of fromScreen) {
      const neighbor = getCornerNeighbor(screen, corner, allowOtherDirections);
      if (!neighbor) continue;
      const [bestScreen, bestCorner] = neighbor;

      this.moveAllWindowsFromCornerToCorner(
        { screen: screen, corner: corner },
        { screen: bestScreen, corner: bestCorner },
        ignoreFocused,
      );
    }
  }

  moveAllAutomaticallyMoveableWindows() {
    if (this.activeWindow && isPipWindow(this.activeWindow)) return;
    if (this.hoveredWindows.some(isPipWindow)) return;
    if (!this.getAutomaticallyMoveableWindowsOnScreen(this.activeScreen).length)
      return;

    this.moveAllWindowsToNeighborCorners(this.activeScreen, true, false);
    this.update();
  }

  update() {
    for (const [screen, corners] of this._stacks) {
      for (const [corner, stack] of corners) {
        stack.update();
      }
    }
  }

  connect() {
    // workaround for `windowAdded` signal getting called after `windowActivated`
    const onWindowAdded = (w: KWin.Window) => {
      if (!w || this._allWindows.has(w)) return;

      this._allWindows.add(w);
      this.onWindowAdded(w);

      w.fullScreenChanged.connect(() => {
        this.onWindowFullscreenChanged(w, w.fullScreen);
      });

      w.moveResizedChanged.connect(() => {
        this.onWindowMovedResized(w, w.move, w.resize);
      });

      w.frameGeometryChanged.connect(() => {
        this.onWindowFrameGeometryChanged(w, w.frameGeometry);
      });
    };

    workspace.windowAdded.connect(onWindowAdded);
    workspace.windowRemoved.connect((w) => {
      if (!w || !this._allWindows.has(w)) return;

      this._allWindows.delete(w);
      this.onWindowRemoved(w);
    });

    workspace.windowActivated.connect((w) => {
      if (!w) return;

      onWindowAdded(w);
      this.onWindowActivated(w);
    });

    workspace.cursorPosChanged.connect(() =>
      this.onCursorPosChanged(this.cursorPosition),
    );

    workspace.screensChanged.connect(() => {
      for (const [screen] of this._stacks) {
        if (!this.screens.includes(screen)) {
          this.removeScreen(screen);
        }
      }

      for (const screen of this.screens) {
        if (!this._stacks.has(screen)) {
          this.addScreen(screen);
        }
      }

      this.update();
    });

    return onWindowAdded;
  }
}
