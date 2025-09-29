// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::VirtualDesktop
declare namespace KWin {
  export class VirtualDesktop {
    // ### Read-only Properties
    readonly id: QString;
    readonly x11DesktopNumber: uint;

    // ### Read-write Properties
    name: QString;

    // ### Signals
    nameChanged(): Signal<() => void>;
    x11DesktopNumberChanged(): Signal<() => void>;
    /** Emitted just before the desktop gets destroyed. */
    aboutToBeDestroyed(): Signal<() => void>;
  }
}
