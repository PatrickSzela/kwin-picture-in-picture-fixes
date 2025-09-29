// ## Global
// Methods and properties added to the global JavaScript object.

// ### Read-only Properties
/** Global property to all configuration values of KWin core. */
declare const options: KWin.Options;
/** Global property to the core wrapper of KWin. */
declare const workspace: KWin.WorkspaceWrapper;
/** Provides access to enums defined in KWin::WorkspaceWrapper */

declare namespace KWin {
  // source: https://github.com/KDE/kwin/blob/master/src/core/outputconfiguration.h
  // TODO: implement
  type OutputChangeSet = any;

  // type OutputChangeSet = {
  //   mode?: OutputMode;
  //   desiredModeSize?: QSize;
  //   desiredModeRefreshRate?: uint32_t;
  //   enabled?: bool;
  //   pos?: QPoint;
  //   scale?: double;
  //   transform?: OutputTransform;
  //   manualTransform?: OutputTransform;
  //   overscan?: uint32_t;
  //   rgbRange?: Output.RgbRange;
  //   vrrPolicy?: VrrPolicy;
  //   highDynamicRange?: bool;
  //   referenceLuminance?: uint32_t;
  //   wideColorGamut?: bool;
  //   autoRotationPolicy?: Output.AutoRotationPolicy;
  //   iccProfilePath?: QString;
  //   iccProfile?: IccProfile;
  //   maxPeakBrightnessOverride?: double;
  //   maxAverageBrightnessOverride?: double;
  //   minBrightnessOverride?: double;
  //   sdrGamutWideness?: double;
  //   colorProfileSource?: Output.ColorProfileSource;
  //   brightness?: double;
  //   // setting "brightness" may trigger animations;
  //   // setting the current brightness doesn't
  //   currentBrightness?: double;
  //   allowSdrSoftwareBrightness?: bool;
  //   colorPowerTradeoff?: Output.ColorPowerTradeoff;
  //   dimming?: double;
  //   brightnessDevice?: BrightnessDevice;
  //   uuid?: QString;
  //   replicationSource?: QString;
  //   detectedDdcCi?: bool;
  //   allowDdcCi?: bool;
  //   maxBitsPerColor?: uint32_t;
  //   edrPolicy?: Output.EdrPolicy;
  // };

  // source: https://github.com/KDE/kwin/blob/master/src/effect/globals.h
  enum Layer {
    UnknownLayer = -1,
    FirstLayer = 0,
    DesktopLayer = FirstLayer,
    BelowLayer,
    NormalLayer,
    AboveLayer,
    /** layer for windows of type notification */
    NotificationLayer,
    /** active fullscreen, or active dialog */
    ActiveLayer,
    /** tooltips, sub- and context menus */
    PopupLayer,
    /** layer for notifications that should be shown even on top of fullscreen */
    CriticalNotificationLayer,
    /** layer for On Screen Display windows such as volume feedback */
    OnScreenDisplayLayer,
    OverlayLayer,
    /** number of layers, must be last */
    NumLayers,
  }

  // source: https://github.com/KDE/kwin/blob/master/src/effect/globals.h
  /**
   * Maximize mode. These values specify how a window is maximized.
   *
   * @note these values are written to session files, don't change the order
   */
  enum MaximizeMode {
    /** The window is not maximized in any direction. **/
    MaximizeRestore = 0,
    /** The window is maximized vertically. **/
    MaximizeVertical = 1,
    /** The window is maximized horizontally. **/
    MaximizeHorizontal = 2,
    /** Equal to @p MaximizeVertical | @p MaximizeHorizontal **/
    MaximizeFull = MaximizeVertical | MaximizeHorizontal,
  }

  //#region ClientAreaOption
  /** geometry where a window will be initially placed after being mapped */
  export const PlacementArea: WorkspaceWrapper.ClientAreaOption.PlacementArea;
  /** ???  window movement snapping area?  ignore struts */
  export const MovementArea: WorkspaceWrapper.ClientAreaOption.MovementArea;
  /** geometry to which a window will be maximized */
  export const MaximizeArea: WorkspaceWrapper.ClientAreaOption.MaximizeArea;
  /** like MaximizeArea, but ignore struts - used e.g. for topmenu */
  export const MaximizeFullArea: WorkspaceWrapper.ClientAreaOption.MaximizeFullArea;
  /** area for fullscreen windows */
  export const FullScreenArea: WorkspaceWrapper.ClientAreaOption.FullScreenArea;
  /** whole workarea (all screens together) */
  export const WorkArea: WorkspaceWrapper.ClientAreaOption.WorkArea;
  /** whole area (all screens together), ignore struts */
  export const FullArea: WorkspaceWrapper.ClientAreaOption.FullArea;
  /** one whole screen, ignore struts */
  export const ScreenArea: WorkspaceWrapper.ClientAreaOption.ScreenArea;
  //#endregion

  //#region ElectricBorder
  export const ElectricTop = WorkspaceWrapper.ElectricBorder.ElectricTop;
  export const ElectricTopRight =
    WorkspaceWrapper.ElectricBorder.ElectricTopRight;
  export const ElectricRight = WorkspaceWrapper.ElectricBorder.ElectricRight;
  export const ElectricBottomRight =
    WorkspaceWrapper.ElectricBorder.ElectricBottomRight;
  export const ElectricBottom = WorkspaceWrapper.ElectricBorder.ElectricBottom;
  export const ElectricBottomLeft =
    WorkspaceWrapper.ElectricBorder.ElectricBottomLeft;
  export const ElectricLeft = WorkspaceWrapper.ElectricBorder.ElectricLeft;
  export const ElectricTopLeft =
    WorkspaceWrapper.ElectricBorder.ElectricTopLeft;
  export const ELECTRIC_COUNT = WorkspaceWrapper.ElectricBorder.ELECTRIC_COUNT;
  export const ElectricNone = WorkspaceWrapper.ElectricBorder.ElectricNone;
  //#endregion
}

// ### Functions
/**
 * Prints all provided values to kDebug and as a D-Bus signal
 */
declare function print(...values: QVariant[]);
/**
 * Reads the config value for key in the Script's configuration with the optional default value. If not providing a default value and no value stored in the configuration an undefined value is returned.
 */
declare function readConfig(key: QString, defaultValue?: QVariant): QVariant;
/**
 * Registers the callback for the screen edge. When the mouse gets pushed against the given edge the callback will be invoked. Scripts can also add "X-KWin-Border-Activate" to their metadata file to have the effect listed in the screen edges KCM. This will write an entry BorderConfig= in the script configuration object with a list of ScreenEdges the user has selected.
 */
declare function registerScreenEdge(
  border: KWin.WorkspaceWrapper.ElectricBorder,
  callback: QJSValue,
): bool;
/**
 * Unregisters the callback for the screen edge. This will disconnect all callbacks from this script to that edge.
 */
declare function unregisterScreenEdge(
  border: KWin.WorkspaceWrapper.ElectricBorder,
): bool;
/**
 * Registers keySequence as a global shortcut. When the shortcut is invoked the callback will be called. Title and text are used to name the shortcut and make it available to the global shortcut configuration module.
 */
declare function registerShortcut(
  title: QString,
  text: QString,
  keySequence: QString,
  callback: QJSValue,
): bool;
/**
 * Aborts the execution of the script if value does not evaluate to true. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assert(value: bool, message?: QString): bool;
/**
 * Aborts the execution of the script if value does not evaluate to true. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertTrue(value: bool, message?: QString): bool;
/**
 * Aborts the execution of the script if value does not evaluate to false. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertFalse(value: bool, message?: QString): bool;
/**
 * Aborts the execution of the script if the actual value is not equal to the expected value. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertEquals(
  expected: QVariant,
  actual: QVariant,
  message?: QString,
): bool;
/**
 * Aborts the execution of the script if value is not null. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertNull(value: QVariant, message?: QString): bool;
/**
 * Aborts the execution of the script if value is null. If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertNotNull(value: QVariant, message?: QString): bool;
/**
 * Call a D-Bus method at (service, path, interface and method). A variable number of arguments can be added to the method call. The D-Bus call is always performed in an async way invoking the callback provided as the last (optional) argument. The reply values of the D-Bus method call are passed to the callback.
 */
declare function callDBus(
  service: QString,
  path: QString,
  interface: QString,
  method: QString,
  // @ts-expect-error `...arg` should be last, but according to API it isn't
  ...arg: QVariant[],
  callback?: QJSValue,
);
/**
 * Registers the passed in callback to be invoked whenever the User actions menu (`Alt+F3` or right click on window decoration) is about to be shown. The callback is invoked with a reference to the Client for which the menu is shown. The callback can return either a single menu entry to be added to the menu or an own sub menu with multiple entries. The object for a menu entry should be
 * ```js
 *  {
 *    title: "My Menu entry",
 *    checkable: true,
 *    checked: false,
 *    triggered: function (action) {
 *      // callback with triggered QAction
 *    }
 *  }
 *  ```
 *  for a menu it should be
 *  ```js
 *  {
 *    title: "My menu",
 *    items: [{...}, {...}, ...] // list with entries as described
 *  }
 *  ```
 */
declare function registerUserActionsMenu(callback: QJSValue);
