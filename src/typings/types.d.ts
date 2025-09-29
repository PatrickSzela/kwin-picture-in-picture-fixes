declare type bool = boolean;
declare type int = number;
declare type float = number;
declare type double = number;

/** Convenience typedef for unsigned int. */
declare type uint = number;
/** Typedef for double unless Qt is configured with the -qreal float option. */
declare type qreal = double;
/** Typedef for unsigned long long int (unsigned __int64 on Windows). This is the same as quint64. */
declare type qulonglong = number;

declare type QString = string;
declare type QList<T> = T[];
declare type QStringList = string[];

/** The QObject class is the base class of all Qt objects. */
declare type QObject = any;
/** The QJSValue class acts as a container for Qt/JavaScript data types. */
declare type QJSValue = any;
/** The QVariant class acts like a union for the most common Qt data types. */
declare type QVariant = any;

/** The QSize class defines the size of a two-dimensional object using integer point precision. */
declare type QSize = {
  width: int;
  height: int;
};
/** The QSizeF class defines the size of a two-dimensional object using floating point precision. */
declare type QSizeF = QSize;

/** The QRect class defines a rectangle in the plane using integer precision. */
declare class QRect {
  x: number;
  y: number;
  width: number;
  height: number;
  get left(): number;
  get right(): number;
  get top(): number;
  get bottom(): number;
};
/** The QRectF class defines a finite rectangle in the plane using floating point precision. */
declare type QRectF = QRect;

/** The QPoint class defines a point in the plane using integer precision. */
declare type QPoint = {
  x: number;
  y: number;
};
/** The QPointF class defines a point in the plane using floating point precision. */
declare type QPointF = QPoint;

/** The QRegion class specifies a clip region for a painter. */
declare type QRegion = any;
/** The QUuid class stores a Universally Unique Identifier (UUID). */
declare type QUuid = any;
/** The QIcon class provides scalable icons in different modes and states. */
declare type QIcon = any;
/** The QPalette class contains color groups for each widget state. */
declare type QPalette = any;

declare interface Signal<T> {
  /**
   * Connects a function to a signal
   * @param callback A function to be called, when the signal is emitted
   * @see {@link Signal.disconnect}
   */
  connect(callback: T): void;
  /**
   * Disconnects a function from a signal
   * @param callback The function to disconnect. Must be the same as on the
   * {@link Signal.connect connect()} call, so anonymous function won't work
   * @see {@link Signal.connect}
   */
  disconnect(callback: T): void;
}
