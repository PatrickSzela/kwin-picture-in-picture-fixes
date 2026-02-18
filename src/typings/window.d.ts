// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::Window
declare namespace KWin {
  export namespace Window {
    // ### Enums
    enum SizeMode {
      SizeModeAny,
      SizeModeFixedW,
      SizeModeFixedH,
      SizeModeMax,
    }
    enum SameApplicationCheck {
      RelaxedForActive,
      AllowCrossProcesses,
    }
  }

  export class Window {
    // ### Read-only Properties
    /** This property holds rectangle that the pixmap or buffer of this Window occupies on the screen. This rectangle includes invisible portions of the window, e.g. client-side drop shadows, etc. */
    readonly bufferGeometry: KWin.RectF;
    /** The geometry of the Window without frame borders. */
    readonly clientGeometry: KWin.RectF;
    /** This property holds the position of the Window's frame geometry. */
    readonly pos: QPointF;
    /** This property holds the size of the Window's frame geometry. */
    readonly size: QSizeF;
    /** This property holds the x position of the Window's frame geometry. */
    readonly x: qreal;
    /** This property holds the y position of the Window's frame geometry. */
    readonly y: qreal;
    /** This property holds the width of the Window's frame geometry. */
    readonly width: qreal;
    /** This property holds the height of the Window's frame geometry. */
    readonly height: qreal;
    /** The output where the window center is on */
    readonly output: KWin.Output;
    readonly rect: KWin.RectF;
    readonly resourceName: QString;
    readonly resourceClass: QString;
    readonly windowRole: QString;
    /** Returns whether the window is a desktop background window (the one with wallpaper). See _NET_WM_WINDOW_TYPE_DESKTOP at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly desktopWindow: bool;
    /** Returns whether the window is a dock (i.e. a panel). See _NET_WM_WINDOW_TYPE_DOCK at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly dock: bool;
    /** Returns whether the window is a standalone (detached) toolbar window. See _NET_WM_WINDOW_TYPE_TOOLBAR at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly toolbar: bool;
    /** Returns whether the window is a torn-off menu. See _NET_WM_WINDOW_TYPE_MENU at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly menu: bool;
    /** Returns whether the window is a "normal" window, i.e. an application or any other window for which none of the specialized window types fit. See _NET_WM_WINDOW_TYPE_NORMAL at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly normalWindow: bool;
    /** Returns whether the window is a dialog window. See _NET_WM_WINDOW_TYPE_DIALOG at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly dialog: bool;
    /** Returns whether the window is a splashscreen. Note that many (especially older) applications do not support marking their splash windows with this type. See _NET_WM_WINDOW_TYPE_SPLASH at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly splash: bool;
    /** Returns whether the window is a utility window, such as a tool window. See _NET_WM_WINDOW_TYPE_UTILITY at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly utility: bool;
    /** Returns whether the window is a dropdown menu (i.e. a popup directly or indirectly open from the applications menubar). See _NET_WM_WINDOW_TYPE_DROPDOWN_MENU at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly dropdownMenu: bool;
    /** Returns whether the window is a popup menu (that is not a torn-off or dropdown menu). See _NET_WM_WINDOW_TYPE_POPUP_MENU at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly popupMenu: bool;
    /** Returns whether the window is a tooltip. See _NET_WM_WINDOW_TYPE_TOOLTIP at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly tooltip: bool;
    /** Returns whether the window is a window with a notification. See _NET_WM_WINDOW_TYPE_NOTIFICATION at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly notification: bool;
    /** Returns whether the window is a window with a critical notification. */
    readonly criticalNotification: bool;
    /** Returns whether the window is an applet popup. */
    readonly appletPopup: bool;
    /** Returns whether the window is an On Screen Display. */
    readonly onScreenDisplay: bool;
    /** Returns whether the window is a combobox popup. See _NET_WM_WINDOW_TYPE_COMBO at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly comboBox: bool;
    /** Returns whether the window is a Drag&Drop icon. See _NET_WM_WINDOW_TYPE_DND at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly dndIcon: bool;
    /** Returns the NETWM window type See https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . */
    readonly windowType: int;
    /** Whether this Window is managed by KWin (it has control over its placement and other aspects, as opposed to override-redirect windows that are entirely handled by the application). */
    readonly managed: bool;
    /** Whether this Window represents an already deleted window and only kept for the compositor for animations. */
    readonly deleted: bool;
    /** Whether the window is a popup. */
    readonly popupWindow: bool;
    /** Whether this Window represents the outline. It's always false if compositing is turned off. */
    readonly outline: bool;
    /** This property holds a UUID to uniquely identify this Window. */
    readonly internalId: QUuid;
    /** The pid of the process owning this window. 5.20 */
    readonly pid: int;
    /** The position of this window within Workspace's window stack. */
    readonly stackingOrder: int;
    /** Whether the Window can be set to fullScreen. The property is evaluated each time it is invoked. Because of that there is no notify signal. */
    readonly fullScreenable: bool;
    /** Whether this Window is active or not. Use Workspace::activateWindow() to activate a Window. Workspace::activateWindow */
    readonly active: bool;
    /** Whether the window can be closed by the user. */
    readonly closeable: bool;
    readonly icon: QIcon;
    /** Whether the Window can be shaded. The property is evaluated each time it is invoked. Because of that there is no notify signal. */
    readonly shadeable: bool;
    /** Whether the Window can be minimized. The property is evaluated each time it is invoked. Because of that there is no notify signal. */
    readonly minimizable: bool;
    /** The optional geometry representing the minimized Window in e.g a taskbar. See _NET_WM_ICON_GEOMETRY at https://standards.freedesktop.org/wm-spec/wm-spec-latest.html . The value is evaluated each time the getter is called. Because of that no changed signal is provided. */
    readonly iconGeometry: KWin.RectF;
    /** Returns whether the window is any of special windows types (desktop, dock, splash, ...), i.e. window types that usually don't have a window frame and the user does not use window management (moving, raising,...) on them. The value is evaluated each time the getter is called. Because of that no changed signal is provided. */
    readonly specialWindow: bool;
    /** The Caption of the Window. Read from WM_NAME property together with a suffix for hostname and shortcut. To read only the caption as provided by WM_NAME, use the getter with an additional false value. */
    readonly caption: QString;
    /** Minimum size as specified in WM_NORMAL_HINTS */
    readonly minSize: QSizeF;
    /** Maximum size as specified in WM_NORMAL_HINTS */
    readonly maxSize: QSizeF;
    /** Whether the Window can accept keyboard focus. The value is evaluated each time the getter is called. Because of that no changed signal is provided. */
    readonly wantsInput: bool;
    /** Whether the Window is a transient Window to another Window. transientFor */
    readonly transient: bool;
    /** The Window to which this Window is a transient if any. */
    readonly transientFor: KWin.Window;
    /** Whether the Window represents a modal window. */
    readonly modal: bool;
    /** Whether the Window is currently being moved by the user. Notify signal is emitted when the Window starts or ends move/resize mode. */
    readonly move: bool;
    /** Whether the Window is currently being resized by the user. Notify signal is emitted when the Window starts or ends move/resize mode. */
    readonly resize: bool;
    /** Whether the decoration is currently using an alpha channel. */
    readonly decorationHasAlpha: bool;
    /** Whether the Window provides context help. Mostly needed by decorations to decide whether to show the help button or not. */
    readonly providesContextHelp: bool;
    /** Whether the Window can be maximized both horizontally and vertically. The property is evaluated each time it is invoked. Because of that there is no notify signal. */
    readonly maximizable: bool;
    /** Whether the Window is movable. Even if it is not movable, it might be possible to move it to another screen. The property is evaluated each time it is invoked. Because of that there is no notify signal. moveableAcrossScreens */
    readonly moveable: bool;
    /** Whether the Window can be moved to another screen. The property is evaluated each time it is invoked. Because of that there is no notify signal. moveable */
    readonly moveableAcrossScreens: bool;
    /** Whether the Window can be resized. The property is evaluated each time it is invoked. Because of that there is no notify signal. */
    readonly resizeable: bool;
    /** The desktop file name of the application this Window belongs to. This is either the base name without full path and without file extension of the desktop file for the window's application (e.g. "org.kde.foo"). The application's desktop file name can also be the full path to the desktop file (e.g. "/opt/kde/share/org.kde.foo.desktop") in case it's not in a standard location. */
    readonly desktopFileName: QString;
    /** Whether an application menu is available for this Window */
    readonly hasApplicationMenu: bool;
    /** Whether the application menu for this Window is currently opened */
    readonly applicationMenuActive: bool;
    /** Whether this window is unresponsive. When an application failed to react on a ping request in time, it is considered unresponsive. This usually indicates that the application froze or crashed. */
    readonly unresponsive: bool;
    /** The color scheme set on this window Absolute file path, or name of palette in the user's config directory following KColorSchemes format. An empty string indicates the default palette from kdeglobals is used. this indicates the colour scheme requested, which might differ from the theme applied if the colorScheme cannot be found */
    readonly colorScheme: QString;
    readonly layer: KWin.Layer;
    /** Whether this window is hidden. It's usually the case with auto-hide panels. */
    readonly hidden: bool;
    /** Returns whether this window is a input method window. This is only used for Wayland. */
    readonly inputMethod: bool;
    /**
     * The Tag this window is associated to, if any
     *
     * **UNDOCUMENTED ON KDE WEBSITE**
     */
    readonly tag: QString;

    // ### Read-write Properties
    opacity: qreal;
    /** Whether the window does not want to be animated on window close. There are legit reasons for this like a screenshot application which does not want it's window being captured. */
    skipsCloseAnimation: bool;
    /** Whether this Window is fullScreen. A Window might either be fullScreen due to the _NET_WM property or through a legacy support hack. The fullScreen state can only be changed if the Window does not use the legacy hack. To be sure whether the state changed, connect to the notify signal. */
    fullScreen: bool;
    /** The virtual desktops this client is on. If it's on all desktops, the list is empty. */
    desktops: QList<KWin.VirtualDesktop>;
    /** Whether the Window is on all desktops. That is desktop is -1. */
    onAllDesktops: bool;
    /** The activities this client is on. If it's on all activities the property is empty. */
    activities: QStringList;
    /** Indicates that the window should not be included on a taskbar. */
    skipTaskbar: bool;
    /** Indicates that the window should not be included on a Pager. */
    skipPager: bool;
    /** Whether the Window should be excluded from window switching effects. */
    skipSwitcher: bool;
    /** Whether the Window is set to be kept above other windows. */
    keepAbove: bool;
    /** Whether the Window is set to be kept below other windows. */
    keepBelow: bool;
    /** Whether the Window is shaded. */
    shade: bool;
    /** Whether the Window is minimized. */
    minimized: bool;
    /** Whether window state _NET_WM_STATE_DEMANDS_ATTENTION is set. This state indicates that some action in or with the window happened. For example, it may be set by the Window Manager if the window requested activation but the Window Manager refused it, or the application may set it if it finished some work. This state may be set by both the Window and the Window Manager. It should be unset by the Window Manager when it decides the window got the required attention (usually, that it got activated). */
    demandsAttention: bool;
    /** The geometry of this Window. Be aware that depending on resize mode the frameGeometryChanged signal might be emitted at each resize step or only at the end of the resize operation. */
    frameGeometry: KWin.RectF;
    /** Whether the window has a decoration or not. This property is not allowed to be set by applications themselves. The decision whether a window has a border or not belongs to the window manager. If this property gets abused by application developers, it will be removed again. */
    noBorder: bool;
    /** The Tile this window is associated to, if any */
    tile: KWin.Tile;

    // ### Signals
    readonly stackingOrderChanged: Signal<() => void>;
    readonly shadeChanged: Signal<() => void>;
    readonly opacityChanged: Signal<
      (window: KWin.Window, oldOpacity: qreal) => void
    >;
    readonly damaged: Signal<(window: KWin.Window) => void>;
    readonly inputTransformationChanged: Signal<() => void>;
    readonly closed: Signal<() => void>;
    readonly windowShown: Signal<(window: KWin.Window) => void>;
    readonly windowHidden: Signal<(window: KWin.Window) => void>;
    /** Emitted whenever the Window's screen changes. This can happen either in consequence to a screen being removed/added or if the Window's geometry changes. 4.11 */
    readonly outputChanged: Signal<() => void>;
    readonly skipCloseAnimationChanged: Signal<() => void>;
    /** Emitted whenever the window role of the window changes. 5.0 */
    readonly windowRoleChanged: Signal<() => void>;
    /** Emitted whenever the window class name or resource name of the window changes. 5.0 */
    readonly windowClassChanged: Signal<() => void>;
    /** Emitted whenever the Surface for this Window changes. */
    readonly surfaceChanged: Signal<() => void>;
    /** Emitted whenever the window's shadow changes. 5.15 */
    readonly shadowChanged: Signal<() => void>;
    /** This signal is emitted when the Window's buffer geometry changes. */
    readonly bufferGeometryChanged: Signal<(oldGeometry: KWin.RectF) => void>;
    /** This signal is emitted when the Window's frame geometry changes. */
    readonly frameGeometryChanged: Signal<(oldGeometry: KWin.RectF) => void>;
    /** This signal is emitted when the Window's client geometry has changed. */
    readonly clientGeometryChanged: Signal<(oldGeometry: KWin.RectF) => void>;
    /** This signal is emitted when the frame geometry is about to change. the new geometry is not known yet */
    readonly frameGeometryAboutToChange: Signal<() => void>;
    /** This signal is emitted when the visible geometry has changed. */
    readonly visibleGeometryChanged: Signal<() => void>;
    /** This signal is emitted when associated tile has changed, including from and to none */
    readonly tileChanged: Signal<(tile: KWin.Tile) => void>;
    readonly fullScreenChanged: Signal<() => void>;
    readonly skipTaskbarChanged: Signal<() => void>;
    readonly skipPagerChanged: Signal<() => void>;
    readonly skipSwitcherChanged: Signal<() => void>;
    readonly iconChanged: Signal<() => void>;
    readonly activeChanged: Signal<() => void>;
    readonly keepAboveChanged: Signal<(old: bool) => void>;
    readonly keepBelowChanged: Signal<(old: bool) => void>;
    /** Emitted whenever the demands attention state changes. */
    readonly demandsAttentionChanged: Signal<() => void>;
    readonly desktopsChanged: Signal<() => void>;
    readonly activitiesChanged: Signal<() => void>;
    readonly minimizedChanged: Signal<() => void>;
    readonly paletteChanged: Signal<(p: QPalette) => void>;
    readonly colorSchemeChanged: Signal<() => void>;
    readonly captionChanged: Signal<() => void>;
    readonly captionNormalChanged: Signal<() => void>;
    readonly maximizedAboutToChange: Signal<(mode: KWin.MaximizeMode) => void>;
    readonly maximizedChanged: Signal<() => void>;
    readonly transientChanged: Signal<() => void>;
    readonly modalChanged: Signal<() => void>;
    readonly quickTileModeChanged: Signal<() => void>;
    readonly moveResizedChanged: Signal<() => void>;
    readonly moveResizeCursorChanged: Signal<(CursorShape) => void>;
    readonly interactiveMoveResizeStarted: Signal<() => void>;
    readonly interactiveMoveResizeStepped: Signal<(geometry: KWin.RectF) => void>;
    readonly interactiveMoveResizeFinished: Signal<() => void>;
    readonly closeableChanged: Signal<(bool) => void>;
    readonly minimizeableChanged: Signal<(bool) => void>;
    readonly shadeableChanged: Signal<(bool) => void>;
    readonly maximizeableChanged: Signal<(bool) => void>;
    readonly desktopFileNameChanged: Signal<() => void>;
    readonly applicationMenuChanged: Signal<() => void>;
    readonly hasApplicationMenuChanged: Signal<(bool) => void>;
    readonly applicationMenuActiveChanged: Signal<(bool) => void>;
    readonly unresponsiveChanged: Signal<(bool) => void>;
    readonly decorationChanged: Signal<() => void>;
    readonly hiddenChanged: Signal<() => void>;
    readonly hiddenByShowDesktopChanged: Signal<() => void>;
    readonly lockScreenOverlayChanged: Signal<() => void>;
    readonly readyForPaintingChanged: Signal<() => void>;
    readonly maximizeGeometryRestoreChanged: Signal<() => void>;
    readonly fullscreenGeometryRestoreChanged: Signal<() => void>;

    // ### Functions
    closeWindow(): void;
    /** Sets the maximization according to vertically and horizontally. */
    setMaximize(vertically: bool, horizontally: bool): void;
  }
}
