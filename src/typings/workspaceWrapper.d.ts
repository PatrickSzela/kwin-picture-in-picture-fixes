// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::WorkspaceWrapper
declare namespace KWin {
  export namespace WorkspaceWrapper {
    // ### Enums
    enum ClientAreaOption {
      /** window movement snapping area? ignore struts */
      PlacementArea,
      MovementArea,
      MaximizeArea,
      MaximizeFullArea,
      FullScreenArea,
      WorkArea,
      FullArea,
      ScreenArea,
    }

    enum ElectricBorder {
      ElectricTop,
      ElectricTopRight,
      ElectricRight,
      ElectricBottomRight,
      ElectricBottom,
      ElectricBottomLeft,
      ElectricLeft,
      ElectricTopLeft,
      ELECTRIC_COUNT,
      ElectricNone,
    }
  }

  export class WorkspaceWrapper {
    // ### Read-only Properties
    readonly desktops: QList<VirtualDesktop>;
    readonly desktopGridSize: QSize;
    readonly desktopGridWidth: int;
    readonly desktopGridHeight: int;
    readonly workspaceWidth: int;
    readonly workspaceHeight: int;
    readonly workspaceSize: QSize;
    readonly activeScreen: KWin.Output;
    readonly screens: QList<KWin.Output>;
    readonly activities: QStringList;
    /** The bounding size of all screens combined. Overlapping areas are not counted multiple times. virtualScreenGeometry */
    readonly virtualScreenSize: QSize;
    /** The bounding geometry of all screens combined. Always starts at (0,0) and has virtualScreenSize as it's size. virtualScreenSize */
    readonly virtualScreenGeometry: QRect;
    /** List of Clients currently managed by KWin, orderd by their visibility (later ones cover earlier ones). */
    readonly stackingOrder: QList<KWin.Window>;
    /** The current position of the cursor. */
    readonly cursorPos: QPoint;

    // ### Read-write Properties
    currentDesktop: VirtualDesktop;
    activeWindow: KWin.Window;
    currentActivity: QString;

    // ### Signals
    readonly windowAdded: Signal<(window: KWin.Window) => void>;
    readonly windowRemoved: Signal<(window: KWin.Window) => void>;
    readonly windowActivated: Signal<(window: KWin.Window) => void>;
    /** This signal is emitted when a virtual desktop is added or removed. */
    readonly desktopsChanged: Signal<() => void>;
    /** Signal emitted whenever the layout of virtual desktops changed. That is desktopGrid(Size/Width/Height) will have new values. 4.11 */
    readonly desktopLayoutChanged: Signal<() => void>;
    /** Emitted when the output list changes, e.g. an output is connected or removed. */
    readonly screensChanged: Signal<() => void>;
    /** Signal emitted whenever the current activity changed. id id of the new activity */
    readonly currentActivityChanged: Signal<(id: QString) => void>;
    /** Signal emitted whenever the list of activities changed. id id of the new activity */
    readonly activitiesChanged: Signal<(id: QString) => void>;
    /** This signal is emitted when a new activity is added id id of the new activity */
    readonly activityAdded: Signal<(id: QString) => void>;
    /** This signal is emitted when the activity is removed id id of the removed activity */
    readonly activityRemoved: Signal<(id: QString) => void>;
    /** Emitted whenever the virtualScreenSize changes. virtualScreenSize() 5.0 */
    readonly virtualScreenSizeChanged: Signal<() => void>;
    /** Emitted whenever the virtualScreenGeometry changes. virtualScreenGeometry() 5.0 */
    readonly virtualScreenGeometryChanged: Signal<() => void>;
    /** This signal is emitted when the current virtual desktop changes. */
    readonly currentDesktopChanged: Signal<(previous: VirtualDesktop) => void>;
    /** This signal is emitted when the cursor position changes. cursorPos() */
    readonly cursorPosChanged: Signal<() => void>;

    // ### Functions
    slotSwitchDesktopNext(): void;
    slotSwitchDesktopPrevious(): void;
    slotSwitchDesktopRight(): void;
    slotSwitchDesktopLeft(): void;
    slotSwitchDesktopUp(): void;
    slotSwitchDesktopDown(): void;
    slotSwitchToNextScreen(): void;
    slotSwitchToPrevScreen(): void;
    slotSwitchToRightScreen(): void;
    slotSwitchToLeftScreen(): void;
    slotSwitchToAboveScreen(): void;
    slotSwitchToBelowScreen(): void;
    slotWindowToNextScreen(): void;
    slotWindowToPrevScreen(): void;
    slotWindowToRightScreen(): void;
    slotWindowToLeftScreen(): void;
    slotWindowToAboveScreen(): void;
    slotWindowToBelowScreen(): void;
    slotToggleShowDesktop(): void;
    slotWindowMaximize(): void;
    slotWindowMaximizeVertical(): void;
    slotWindowMaximizeHorizontal(): void;
    slotWindowMinimize(): void;
    slotWindowShade(): void;
    slotWindowRaise(): void;
    slotWindowLower(): void;
    slotWindowRaiseOrLower(): void;
    slotActivateAttentionWindow(): void;
    slotWindowMoveLeft(): void;
    slotWindowMoveRight(): void;
    slotWindowMoveUp(): void;
    slotWindowMoveDown(): void;
    slotWindowExpandHorizontal(): void;
    slotWindowExpandVertical(): void;
    slotWindowShrinkHorizontal(): void;
    slotWindowShrinkVertical(): void;
    slotWindowQuickTileLeft(): void;
    slotWindowQuickTileRight(): void;
    slotWindowQuickTileTop(): void;
    slotWindowQuickTileBottom(): void;
    slotWindowQuickTileTopLeft(): void;
    slotWindowQuickTileTopRight(): void;
    slotWindowQuickTileBottomLeft(): void;
    slotWindowQuickTileBottomRight(): void;
    slotSwitchWindowUp(): void;
    slotSwitchWindowDown(): void;
    slotSwitchWindowRight(): void;
    slotSwitchWindowLeft(): void;
    slotIncreaseWindowOpacity(): void;
    slotLowerWindowOpacity(): void;
    slotWindowOperations(): void;
    slotWindowClose(): void;
    slotWindowMove(): void;
    slotWindowResize(): void;
    slotWindowAbove(): void;
    slotWindowBelow(): void;
    slotWindowOnAllDesktops(): void;
    slotWindowFullScreen(): void;
    slotWindowNoBorder(): void;
    slotWindowToNextDesktop(): void;
    slotWindowToPreviousDesktop(): void;
    slotWindowToDesktopRight(): void;
    slotWindowToDesktopLeft(): void;
    slotWindowToDesktopUp(): void;
    slotWindowToDesktopDown(): void;
    /** Sends the Window to the given output. */
    sendClientToScreen(client: KWin.Window, output: KWin.Output): void;
    /** Shows an outline at the specified geometry. If an outline is already shown the outline is moved to the new position. Use hideOutline to remove the outline again. */
    showOutline(geometry: QRect): void;
    /** Overloaded method for convenience. */
    showOutline(x: int, y: int, width: int, height: int): void;
    /** Hides the outline previously shown by showOutline. */
    hideOutline(): void;
    screenAt(pos: QPointF): KWin.Output;
    tilingForScreen(screenName: QString): KWin.TileManager;
    tilingForScreen(output: KWin.Output): KWin.TileManager;
    /** Returns the geometry a Client can use with the specified option. This method should be preferred over other methods providing screen sizes as the various options take constraints such as struts set on panels into account. This method is also multi screen aware, but there are also options to get full areas. option The type of area which should be considered screen The screen for which the area should be considered desktop The desktop for which the area should be considered, in general there should not be a difference The specified screen geometry */
    clientArea(
      option: WorkspaceWrapper.ClientAreaOption,
      output: KWin.Output,
      desktop: VirtualDesktop
    ): QRectF;
    /** Overloaded method for convenience. client The Client for which the area should be retrieved The specified screen geometry */
    clientArea(
      option: WorkspaceWrapper.ClientAreaOption,
      client: KWin.Window
    ): QRectF;
    // clientArea(ClientAreaOption option, const KWin::Window *client): QRectF
    /** Create a new virtual desktop at the requested position. position The position of the desktop. It should be in range [0, count]. name The name for the new desktop, if empty the default name will be used. */
    createDesktop(position: int, name: QString): void;
    /** Removes the specified virtual desktop. */
    removeDesktop(desktop: VirtualDesktop): void;
    /** Provides support information about the currently running KWin instance. */
    supportInformation(): QString;
    /** Raises a Window above all others on the screen. window The Window to raise */
    raiseWindow(window: KWin.Window): void;
    /** Finds the Client with the given windowId. windowId The window Id of the Client The found Client or null */
    getClient(windowId: qulonglong): KWin.Window;
    /** Finds up to count windows at a particular location, prioritizing the topmost one first. A negative count returns all matching clients. pos The location to look for count The number of clients to return A list of Client objects */
    windowAt(pos: QPointF, count?: int): QList<KWin.Window>;
    /** Checks if a specific effect is currently active. pluginId The plugin Id of the effect to check. true if the effect is loaded and currently active, false otherwise. 6.0 */
    isEffectActive(pluginId: QString): bool;
    /**
     * List of Clients currently managed by KWin
     *
     * **UNDOCUMENTED ON KDE WEBSITE**
     */
    windowList(): QList<KWin.Window>;
  }
}
