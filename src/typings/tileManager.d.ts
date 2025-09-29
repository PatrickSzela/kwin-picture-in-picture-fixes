// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::TileManager
declare namespace KWin {
  export class TileManager {
    // ### Read-only Properties
    readonly rootTile: KWin.Tile;
    readonly model: TileModel;

    // ### Signals
    readonly tileRemoved: Signal<(tile: KWin.Tile) => void>;

    // ### Functions
    bestTileForPosition(x: qreal, y: qreal): KWin.Tile;
  }
}
