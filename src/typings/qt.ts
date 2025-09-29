/** This enum type specifies an edge in a rectangle */
export namespace Qt {
  // source: https://doc.qt.io/qt-6/qt.html#ItemDataRole-enum
  /** The first role that can be used for application-specific purposes. */
  export const UserRole = 0x0100;

  // source: https://doc.qt.io/qt-6/qt.html#Edge-enum
  export enum Edge {
    Top = 0x00001,
    Left = 0x00002,
    Right = 0x00004,
    Bottom = 0x00008,
  }

  // source: https://doc.qt.io/qt-6/qt.html#Corner-enum
  /** This enum type specifies a corner in a rectangle */
  export enum Corner {
    /**	The top-left corner of the rectangle. */
    TopLeft = 0x00000,
    /**	The top-right corner of the rectangle. */
    TopRight = 0x00001,
    /**	The bottom-left corner of the rectangle. */
    BottomLeft = 0x00002,
    /**	The bottom-right corner of the rectangle. */
    BottomRight = 0x00003,
  }

  // source: https://doc.qt.io/qt-6/qt.html#MouseButton-enum
  /** This enum type describes the different mouse buttons. */
  export enum MouseButtons {
    /** The button state does not refer to any button (see QMouseEvent::button()). */
    NoButton = 0x00000000,
    /** This value corresponds to a mask of all possible mouse buttons. Use to set the 'acceptedButtons' property of a MouseArea to accept ALL mouse buttons. */
    AllButtons = 0x07ffffff,
    /** The left button is pressed, or an event refers to the left button. (The left button may be the right button on left-handed mice.) */
    LeftButton = 0x00000001,
    /** The right button. */
    RightButton = 0x00000002,
    /** The middle button. */
    MiddleButton = 0x00000004,
    /** The 'Back' button. (Typically present on the 'thumb' side of a mouse with extra buttons. This is NOT the tilt wheel.) */
    BackButton = 0x00000008,
    /** The 'Back' Button. */
    XButton1 = BackButton,
    /** The 'Back' Button. */
    ExtraButton1 = XButton1,
    /** The 'Forward' Button. (Typically present beside the 'Back' button, and also pressed by the thumb.) */
    ForwardButton = 0x00000010,
    /** The 'Forward Button. */
    XButton2 = ForwardButton,
    /** The 'Forward' Button. */
    ExtraButton2 = ForwardButton,
    /** The 'Task' Button. */
    TaskButton = 0x00000020,
    /** The 'Task' Button. */
    ExtraButton3 = TaskButton,
    /** The 7th non-wheel Mouse Button. */
    ExtraButton4 = 0x00000040,
    /** The 8th non-wheel Mouse Button. */
    ExtraButton5 = 0x00000080,
    /** The 9th non-wheel Mouse Button. */
    ExtraButton6 = 0x00000100,
    /** The 10th non-wheel Mouse Button. */
    ExtraButton7 = 0x00000200,
    /** The 11th non-wheel Mouse Button. */
    ExtraButton8 = 0x00000400,
    /** The 12th non-wheel Mouse Button. */
    ExtraButton9 = 0x00000800,
    /** The 13th non-wheel Mouse Button. */
    ExtraButton10 = 0x00001000,
    /** The 14th non-wheel Mouse Button. */
    ExtraButton11 = 0x00002000,
    /** The 15th non-wheel Mouse Button. */
    ExtraButton12 = 0x00004000,
    /** The 16th non-wheel Mouse Button. */
    ExtraButton13 = 0x00008000,
    /** The 17th non-wheel Mouse Button. */
    ExtraButton14 = 0x00010000,
    /** The 18th non-wheel Mouse Button. */
    ExtraButton15 = 0x00020000,
    /** The 19th non-wheel Mouse Button. */
    ExtraButton16 = 0x00040000,
    /** The 20th non-wheel Mouse Button. */
    ExtraButton17 = 0x00080000,
    /** The 21st non-wheel Mouse Button. */
    ExtraButton18 = 0x00100000,
    /** The 22nd non-wheel Mouse Button. */
    ExtraButton19 = 0x00200000,
    /** The 23rd non-wheel Mouse Button. */
    ExtraButton20 = 0x00400000,
    /** The 24th non-wheel Mouse Button. */
    ExtraButton21 = 0x00800000,
    /** The 25th non-wheel Mouse Button. */
    ExtraButton22 = 0x01000000,
    /** The 26th non-wheel Mouse Button. */
    ExtraButton23 = 0x02000000,
    /** The 27th non-wheel Mouse Button. */
    ExtraButton24 = 0x04000000,
  }

  // source: https://doc.qt.io/qt-6/qt.html#KeyboardModifier-enum
  /** This enum describes the modifier keys. */
  export enum KeyboardModifier {
    /** 	No modifier key is pressed. */
    NoModifier = 0x00000000,
    /** 	A Shift key on the keyboard is pressed. */
    ShiftModifier = 0x02000000,
    /** 	A Ctrl key on the keyboard is pressed. */
    ControlModifier = 0x04000000,
    /** 	An Alt key on the keyboard is pressed. */
    AltModifier = 0x08000000,
    /** 	A Meta key on the keyboard is pressed. */
    MetaModifier = 0x10000000,
    /** 	A keypad button is pressed. */
    KeypadModifier = 0x20000000,
    /** 	X11 only (unless activated on Windows by a command line argument). A Mode_switch key on the keyboard is pressed. */
    GroupSwitchModifier = 0x40000000,
  }
}
