import { Qt } from "./typings/qt";
import { getRatio } from "./utils";

export interface StackableWindowStack {
  screen: KWin.Output;
  corner: Qt.Corner;
}

/** Wrapper around KWin's Window interface to store some additional information. */
export class StackableWindow {
  /** Actual window instance assigned to this Stackable Window. */
  protected _window: KWin.Window;
  /** Information about stack to which this Stackable Window is assigned to. */
  public stack: StackableWindowStack | null = null;
  /** Information about stack to which this Stackable Window was assigned to by user's interaction (moving window). */
  public userStack: StackableWindowStack | null = null;
  /** Window's `frameGeometry` cache because setting window's real `frameGeometry` is delayed until next "tick". */
  protected _frameGeometry: KWin.RectF;

  constructor(window: KWin.Window) {
    this._window = window;
    this._frameGeometry = window.frameGeometry;

    window.frameGeometryChanged.connect(() => {
      this._frameGeometry = window.frameGeometry;
    });

    window.skipTaskbar = true;
    window.skipPager = true;
    window.skipSwitcher = true;
    window.onAllDesktops = true;
    window.keepAbove = true;
  }

  get window() {
    return this._window;
  }

  get caption() {
    return this._window.caption;
  }

  get screen() {
    return this.stack?.screen;
  }

  get corner() {
    return this.stack?.corner;
  }

  get frameGeometry() {
    return this._frameGeometry;
  }

  set frameGeometry(value: KWin.RectF) {
    this._window.frameGeometry = value;
  }

  attach(screen: KWin.Output, corner: Qt.Corner, userRequested: boolean) {
    this.stack = { screen, corner };
    if (userRequested) this.userStack = { screen, corner };
  }

  detach(userRequested: boolean) {
    this.stack = null;
    if (userRequested) this.userStack = null;
  }

  move(pos: QPoint) {
    this._frameGeometry = { ...this._frameGeometry, ...pos } as KWin.RectF;
  }

  resize(size: QSize) {
    size = { ...size };
    const { width, height } = this._frameGeometry;
    const data: QSize = { width, height };

    const ratio = getRatio(this.window.frameGeometry);
    const sizeRatio = getRatio(size);
    let factor = 1;

    if ((ratio >= 1 && sizeRatio < 1) || (ratio < 1 && sizeRatio >= 1)) {
      factor = ratio >= 1 && sizeRatio < 1 ? 1.5 : 1 / 1.5;
      const temp = size.width;
      size.width = size.height;
      size.height = temp;
    }

    if (ratio >= 1) {
      data.width = Math.max(this.window.minSize.width, size.width * factor);
      data.height = data.width / ratio;
    } else {
      data.height = Math.max(this.window.minSize.height, size.height * factor);
      data.width = data.height * ratio;
    }

    this._frameGeometry = { ...this._frameGeometry, ...data } as KWin.RectF;
  }

  update() {
    this._window.frameGeometry = this._frameGeometry;
  }
}
