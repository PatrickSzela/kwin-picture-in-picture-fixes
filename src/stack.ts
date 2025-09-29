import { StackableWindow } from "./stackableWindow";
import { Qt } from "./typings/qt";
import {
  getCornersFromEdge,
  getRectCornerPosition,
  getScreensClientArea,
} from "./utils";

export class Stack {
  /** Stackable Windows attached to this stack. */
  protected _windows: StackableWindow[] = [];
  /** Screen to which this stack belongs to. */
  protected screen: KWin.Output;
  /** Corner to which this stack belongs to. */
  protected corner: Qt.Corner;
  /** Preferred size for the newly added windows to this stack. */
  protected _preferredWindowSize: QSize | null = null;

  constructor(screen: KWin.Output, corner: Qt.Corner) {
    this.screen = screen;
    this.corner = corner;
  }

  get windows() {
    return [...this._windows];
  }

  get preferredSize(): QSize | null {
    return this._preferredWindowSize;
  }

  set preferredSize(size: QSize) {
    // strip rest of the data in case value of a wider type has been passed
    const { width, height } = size;
    this._preferredWindowSize = { width, height };
  }

  hasWindow(window: StackableWindow) {
    return this._windows.includes(window);
  }

  attach(window: StackableWindow | StackableWindow[], userRequested: boolean) {
    if (!Array.isArray(window)) window = [window];

    for (const w of window) {
      if (!this.preferredSize || !this._windows.length) {
        this.preferredSize = w.frameGeometry;
      }

      if (this._windows.length) w.resize(this.preferredSize);

      w.attach(this.screen, this.corner, userRequested);
    }

    this._windows = [...this._windows, ...window];
  }

  detach(window: StackableWindow | StackableWindow[], userRequested: boolean) {
    if (!Array.isArray(window)) window = [window];
    this._windows = this._windows.filter((i) => !window.includes(i));
    for (const w of window) {
      w.detach(userRequested);
    }
  }

  detachAll(userRequested: boolean) {
    const copy = this.windows;
    this.detach(this._windows, userRequested);
    return copy;
  }

  resizeWindows(size: QSize) {
    this.preferredSize = size;
    for (const w of this._windows) w.resize(this.preferredSize);
    this.moveWindows();
  }

  moveWindows() {
    if (!this._windows.length) return;

    const clientSize = getScreensClientArea(this.screen);
    const offset: QPoint = getRectCornerPosition(clientSize, this.corner);

    for (const window of this._windows) {
      const { width, height } = window.frameGeometry;

      const topCorners = getCornersFromEdge(Qt.Edge.Top);
      const leftCorners = getCornersFromEdge(Qt.Edge.Left);

      if (!topCorners.includes(this.corner)) offset.y -= height;

      const pos: QPoint = { ...offset };

      if (leftCorners.includes(this.corner)) pos.x = pos.x;
      else pos.x -= width;

      window.move(pos);
      window.update();

      if (topCorners.includes(this.corner)) offset.y += height;
    }
  }

  update() {
    this.moveWindows();
  }
}
