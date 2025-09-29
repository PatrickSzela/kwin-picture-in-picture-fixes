// source: https://github.com/KDE/kwin/blob/master/src/scripting/tilemodel.h

declare namespace KWin {
  export namespace TileModel {
    enum Roles {
      TileRole = Qt.UserRole + 1,
    }
  }
  /**
   * Custom tiling zones management per output.
   */
  export class TileModel {
    // TODO: implement
    // QAbstractItemModel overrides
    // QHash<int, QByteArray> roleNames() const override;
    // QVariant data(const QModelIndex &index, int role) const override;
    // Qt::ItemFlags flags(const QModelIndex &index) const override;
    // QModelIndex index(int row, int column,
    //                   const QModelIndex &parent = QModelIndex()) const override;
    // QModelIndex parent(const QModelIndex &index) const override;
    // int rowCount(const QModelIndex &parent = QModelIndex()) const override;
    // int columnCount(const QModelIndex &parent = QModelIndex()) const override;
  }
}
