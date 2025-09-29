// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::Tile
declare namespace KWin {
  export namespace Tile {
    // ### Enums
    enum LayoutDirection {
      Floating,
      Horizontal,
      Vertical,
    }
  }

  export class Tile {
    // ### Read-only Properties
    readonly absoluteGeometry: QRectF;
    readonly absoluteGeometryInScreen: QRectF;
    readonly positionInLayout: int;
    readonly parent: Tile;
    readonly tiles: QList<KWin.Tile>;
    readonly windows: QList<KWin.Window>;
    readonly isLayout: bool;
    readonly canBeRemoved: bool;

    // ### Read-write Properties
    relativeGeometry: QRectF;
    padding: qreal;

    // ### Signals
    relativeGeometryChanged: Signal<() => void>;
    absoluteGeometryChanged: Signal<() => void>;
    windowGeometryChanged: Signal<() => void>;
    paddingChanged: Signal<(padding: qreal) => void>;
    rowChanged: Signal<(row: int) => void>;
    isLayoutChanged: Signal<(isLayout: bool) => void>;
    childTilesChanged: Signal<() => void>;
    windowAdded: Signal<(window: Window) => void>;
    windowRemoved: Signal<(window: Window) => void>;
    windowsChanged: Signal<() => void>;

    // ### Functions
    resizeByPixels(delta: qreal, edge: Qt.Edge);
  }
}
