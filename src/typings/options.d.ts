// source: https://github.com/KDE/kwin/blob/master/src/options.h

declare namespace KWin {
  export namespace Options {
    /**
     *  Whether to keep all windows mapped when compositing (i.e. whether to have
     * actively updated window pixmaps).
     */
    enum XwaylandEavesdropsMode {
      None,
      NonCharacterKeys,
      AllKeysWithModifier,
      All,
    }

    /**
     * This enum type specifies whether the Xwayland server must be restarted after a crash.
     */
    enum XwaylandCrashPolicy {
      Stop,
      Restart,
    }

    /**
     * Placement policies. How workspace decides the way windows get positioned
     * on the screen. The better the policy, the heavier the resource use.
     * Normally you don't have to worry. What the WM adds to the startup time
     * is nil compared to the creation of the window itself in the memory
     */
    enum PlacementPolicy {
      PlacementNone, // not really a placement
      PlacementDefault, // special, means to use the global default
      PlacementUnknown, // special, means the function should use its default
      PlacementRandom,
      PlacementSmart,
      PlacementCentered,
      PlacementZeroCornered,
      PlacementUnderMouse, // special
      PlacementOnMainWindow, // special
      PlacementMaximizing,
    }

    enum FocusStealingPreventionLevel {
      None = 0,
      Low = 1,
      Medium = 2,
      High = 3,
      Extreme = 4,
    }

    /**
     * This enum type is used to specify the focus policy.
     *
     * Note that FocusUnderMouse and FocusStrictlyUnderMouse are not
     * particularly useful. They are only provided for old-fashined
     * die-hard UNIX people ;-)
     */
    enum FocusPolicy {
      /**
       * Clicking into a window activates it. This is also the default.
       */
      ClickToFocus,
      /**
       * Moving the mouse pointer actively onto a normal window activates it.
       * For convenience, the desktop and windows on the dock are excluded.
       * They require clicking.
       */
      FocusFollowsMouse,
      /**
       * The window that happens to be under the mouse pointer becomes active.
       * The invariant is: no window can have focus that is not under the mouse.
       * This also means that Alt-Tab won't work properly and popup dialogs are
       * usually unusable with the keyboard. Note that the desktop and windows on
       * the dock are excluded for convenience. They get focus only when clicking
       * on it.
       */
      FocusUnderMouse,
      /**
       * This is even worse than FocusUnderMouse. Only the window under the mouse
       * pointer is active. If the mouse points nowhere, nothing has the focus. If
       * the mouse points onto the desktop, the desktop has focus. The same holds
       * for windows on the dock.
       */
      FocusStrictlyUnderMouse,
    }

    enum ActivationDesktopPolicy {
      SwitchToOtherDesktop,
      BringToCurrentDesktop,
      DoNothing,
    }

    enum WindowOperation {
      MaximizeOp = 5000,
      RestoreOp,
      MinimizeOp,
      MoveOp,
      UnrestrictedMoveOp,
      ResizeOp,
      UnrestrictedResizeOp,
      CloseOp,
      OnAllDesktopsOp,
      KeepAboveOp,
      KeepBelowOp,
      WindowRulesOp,
      // /** @obsolete */
      // ToggleStoreSettingsOp = WindowRulesOp,
      HMaximizeOp,
      VMaximizeOp,
      LowerOp,
      FullScreenOp,
      NoBorderOp,
      NoOp,
      SetupWindowShortcutOp,
      ApplicationRulesOp,
    }

    enum MouseCommand {
      MouseRaise,
      MouseLower,
      MouseOperationsMenu,
      MouseToggleRaiseAndLower,
      MouseActivateAndRaise,
      MouseActivateAndLower,
      MouseActivate,
      MouseActivateRaiseAndPassClick,
      MouseActivateAndPassClick,
      MouseMove,
      MouseUnrestrictedMove,
      MouseActivateRaiseAndMove,
      MouseActivateRaiseAndUnrestrictedMove,
      MouseResize,
      MouseUnrestrictedResize,
      MouseMaximize,
      MouseRestore,
      MouseMinimize,
      MouseNextDesktop,
      MousePreviousDesktop,
      MouseAbove,
      MouseBelow,
      MouseOpacityMore,
      MouseOpacityLess,
      MouseClose,
      MouseNothing,
      MouseActivateRaiseOnReleaseAndPassClick,
    }
    enum MouseWheelCommand {
      MouseWheelRaiseLower,
      MouseWheelMaximizeRestore,
      MouseWheelAboveBelow,
      MouseWheelPreviousNextDesktop,
      MouseWheelChangeOpacity,
      MouseWheelNothing,
    }

    // TODO: fill out
    enum CompositingType {}
  }

  export class Options {
    updateSettings: () => void;

    focusPolicy: Options.FocusPolicy;
    isNextFocusPrefersMouse: bool;

    xwaylandCrashPolicy: Options.XwaylandCrashPolicy;
    xwaylandMaxCrashCount: int;
    xwaylandEavesdrops: Options.XwaylandEavesdropsMode;
    xwaylandEavesdropsMouse: bool;
    xwaylandEisNoPrompt: bool;

    /**
     * Whether clicking on a window raises it in FocusFollowsMouse
     * mode or not.
     */
    isClickRaise: bool;

    /**
     * Whether autoraise is enabled FocusFollowsMouse mode or not.
     */
    isAutoRaise: bool;

    /**
     * Autoraise interval
     */
    autoRaiseInterval: int;

    /**
     * Delayed focus interval.
     */
    delayFocusInterval: int;

    /**
     * Whether to see Xinerama screens separately for focus (in Alt+Tab, when activating next client)
     */
    isSeparateScreenFocus: bool;

    placement: Options.PlacementPolicy;

    focusPolicyIsReasonable: bool;

    activationDesktopPolicy: Options.ActivationDesktopPolicy;

    /**
     * The size of the zone that triggers snapping on desktop borders.
     */
    borderSnapZone: int;

    /**
     * The size of the zone that triggers snapping with other windows.
     */
    windowSnapZone: int;

    /**
     * The size of the zone that triggers snapping on the screen center.
     */
    centerSnapZone: int;

    /**
     * Snap only when windows will overlap.
     */
    isSnapOnlyWhenOverlapping: bool;

    /**
     * The size of the virtual barrier at edges between screens.
     */
    edgeBarrier: int;

    /**
     * Whether to enable a cursor barrier at the corners of the screen.
     */
    cornerBarrier: int;

    /**
     * Whether or not we roll over to the other edge when switching desktops past the edge.
     */
    isRollOverDesktops: bool;

    /**
     * Returns the focus stealing prevention level.
     *
     * @see allowWindowActivation
     */
    focusStealingPreventionLevel: Options.FocusStealingPreventionLevel;

    operationTitlebarDblClick: Options.WindowOperation;
    operationMaxButtonLeftClick: Options.WindowOperation;
    operationMaxButtonRightClick: Options.WindowOperation;
    operationMaxButtonMiddleClick: Options.WindowOperation;
    operationMaxButtonClick(button: Qt.MouseButtons): Options.WindowOperation;

    doubleClickBorderToMaximize: bool;

    operationTitlebarMouseWheel(delta: qreal): Options.MouseCommand;
    operationWindowMouseWheel(delta: qreal): Options.MouseCommand;

    commandActiveTitlebar1: Options.MouseCommand;
    commandActiveTitlebar2: Options.MouseCommand;
    commandActiveTitlebar3: Options.MouseCommand;
    commandInactiveTitlebar1: Options.MouseCommand;
    commandInactiveTitlebar2: Options.MouseCommand;
    commandInactiveTitlebar3: Options.MouseCommand;
    commandWindow1: Options.MouseCommand;
    commandWindow2: Options.MouseCommand;
    commandWindow3: Options.MouseCommand;
    commandWindowWheel: Options.MouseCommand;
    commandAll1: Options.MouseCommand;
    commandAll2: Options.MouseCommand;
    commandAll3: Options.MouseCommand;
    commandAllWheel: Options.MouseWheelCommand;
    keyCmdAllModKey: uint;
    commandAllModifier: Qt.KeyboardModifier;

    // static windowOperation(readonly QString &name, bool restricted): Options.WindowOperation;
    // static mouseCommand(readonly QString &name, bool restricted): Options.MouseCommand;
    // static mouseWheelCommand(readonly QString &name): Options.MouseWheelCommand;

    /**
     * Returns whether the user prefers his caption clean.
     */
    condensedTitle: bool;

    /**
     * @returns true if a window gets maximized when it reaches top screen edge
     * while being moved.
     */
    electricBorderMaximize: bool;
    /**
     * @returns true if window is tiled to half screen when reaching left or
     * right screen edge while been moved.
     */
    electricBorderTiling: bool;
    /**
     * @returns the factor that determines the corner part of the edge (ie. 0.1 means tiny corner)
     */
    electricBorderCornerRatio: float;

    borderlessMaximizedWindows: bool;

    /**
     * Timeout before non-responding application will be killed after attempt to close.
     */
    killPingTimeout: int;

    /**
     * Returns the animation time factor for desktop effects.
     */
    animationTimeFactor: double;

    compositingMode: Options.CompositingType;
    setCompositingMode(mode: Options.CompositingType): void;

    allowTearing: bool;
    interactiveWindowMoveEnabled: bool;
    overlayVirtualKeyboardOnWindows: bool;

    pictureInPictureHomeCorner: Qt.Corner;
    setPictureInPictureHomeCorner(corner: Qt.Corner): void;

    pictureInPictureMargin: int;
    setPictureInPictureMargin(margin: int): void;

    /**
     * Performs loading all settings except compositing related.
     */
    loadConfig: () => void;
    reparseConfiguration: () => void;

    // #region Signals
    readonly focusPolicyChanged: Signal<() => void>;
    readonly focusPolicyIsResonableChanged: Signal<() => void>;
    readonly xwaylandCrashPolicyChanged: Signal<() => void>;
    readonly xwaylandMaxCrashCountChanged: Signal<() => void>;
    readonly xwaylandEavesdropsChanged: Signal<() => void>;
    readonly xwaylandEavesdropsMouseChanged: Signal<() => void>;
    readonly xwaylandEisNoPromptChanged: Signal<() => void>;
    readonly nextFocusPrefersMouseChanged: Signal<() => void>;
    readonly clickRaiseChanged: Signal<() => void>;
    readonly autoRaiseChanged: Signal<() => void>;
    readonly autoRaiseIntervalChanged: Signal<() => void>;
    readonly delayFocusIntervalChanged: Signal<() => void>;
    readonly separateScreenFocusChanged: Signal<(bool: bool) => void>;
    readonly placementChanged: Signal<() => void>;
    readonly activationDesktopPolicyChanged: Signal<() => void>;
    readonly borderSnapZoneChanged: Signal<() => void>;
    readonly windowSnapZoneChanged: Signal<() => void>;
    readonly centerSnapZoneChanged: Signal<() => void>;
    readonly snapOnlyWhenOverlappingChanged: Signal<() => void>;
    readonly edgeBarrierChanged: Signal<() => void>;
    readonly cornerBarrierChanged: Signal<() => void>;
    readonly rollOverDesktopsChanged: Signal<(enable: bool) => void>;
    readonly focusStealingPreventionLevelChanged: Signal<() => void>;
    readonly operationTitlebarDblClickChanged: Signal<() => void>;
    readonly operationMaxButtonLeftClickChanged: Signal<() => void>;
    readonly operationMaxButtonRightClickChanged: Signal<() => void>;
    readonly operationMaxButtonMiddleClickChanged: Signal<() => void>;
    readonly commandActiveTitlebar1Changed: Signal<() => void>;
    readonly commandActiveTitlebar2Changed: Signal<() => void>;
    readonly commandActiveTitlebar3Changed: Signal<() => void>;
    readonly commandInactiveTitlebar1Changed: Signal<() => void>;
    readonly commandInactiveTitlebar2Changed: Signal<() => void>;
    readonly commandInactiveTitlebar3Changed: Signal<() => void>;
    readonly commandWindow1Changed: Signal<() => void>;
    readonly commandWindow2Changed: Signal<() => void>;
    readonly commandWindow3Changed: Signal<() => void>;
    readonly commandWindowWheelChanged: Signal<() => void>;
    readonly commandAll1Changed: Signal<() => void>;
    readonly commandAll2Changed: Signal<() => void>;
    readonly commandAll3Changed: Signal<() => void>;
    readonly keyCmdAllModKeyChanged: Signal<() => void>;
    readonly doubleClickBorderToMaximizeChanged: Signal<() => void>;
    readonly condensedTitleChanged: Signal<() => void>;
    readonly electricBorderMaximizeChanged: Signal<() => void>;
    readonly electricBorderTilingChanged: Signal<() => void>;
    readonly electricBorderCornerRatioChanged: Signal<() => void>;
    readonly borderlessMaximizedWindowsChanged: Signal<() => void>;
    readonly killPingTimeoutChanged: Signal<() => void>;
    readonly compositingModeChanged: Signal<() => void>;
    readonly animationSpeedChanged: Signal<() => void>;
    readonly configChanged: Signal<() => void>;
    readonly allowTearingChanged: Signal<() => void>;
    readonly interactiveWindowMoveEnabledChanged: Signal<() => void>;
    readonly pictureInPictureHomeCornerChanged: Signal<() => void>;
    readonly pictureInPictureMarginChanged: Signal<() => void>;
    readonly overlayVirtualKeyboardOnWindowsChanged: Signal<() => void>;
  }
}
