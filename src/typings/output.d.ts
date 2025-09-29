// source: https://invent.kde.org/documentation/develop-kde-org/-/blob/master/content/docs/plasma/kwin/api.md?plain=1

// ## KWin::Output
declare namespace KWin {
  export namespace Output {
    // ### Enums
    enum DpmsMode {
      On,
      Standby,
      Suspend,
      Off,
    }
    enum Capability {
      Dpms,
      Overscan,
      Vrr,
      RgbRange,
      HighDynamicRange,
      WideColorGamut,
      AutoRotation,
      IccProfile,
      Tearing,
    }
    enum SubPixel {
      Unknown,
      None,
      Horizontal_RGB,
      Horizontal_BGR,
      Vertical_RGB,
      Vertical_BGR,
    }
    enum RgbRange {
      Automatic,
      Full,
      Limited,
    }
    enum AutoRotationPolicy {
      Never,
      InTabletMode,
      Always,
    }
  }

  export class Output {
    // ### Read-only Properties
    readonly geometry: QRect;
    readonly devicePixelRatio: qreal;
    readonly name: QString;
    readonly manufacturer: QString;
    readonly model: QString;
    readonly serialNumber: QString;

    // ### Signals
    /** This signal is emitted when the geometry of this output has changed. */
    geometryChanged: Signal<() => void>;
    /** This signal is emitted when the output has been enabled or disabled. */
    enabledChanged: Signal<() => void>;
    /** This signal is emitted when the device pixel ratio of the output has changed. */
    scaleChanged: Signal<() => void>;
    /** Notifies that the display will be dimmed in time ms. This allows effects to plan for it and hopefully animate it */
    aboutToTurnOff: Signal<(time: Std.Chrono.Milliseconds) => void>;
    /** Notifies that the output has been turned on and the wake can be decorated. */
    wakeUp: Signal<() => void>;
    /** Notifies that the output is about to change configuration based on a user interaction. Be it because it gets a transformation or moved around. Only to be used for effects */
    aboutToChange: Signal<(changeSet: KWin.OutputChangeSet) => void>;
    /** Notifies that the output changed based on a user interaction. Be it because it gets a transformation or moved around. Only to be used for effects */
    changed: Signal<() => void>;
    currentModeChanged: Signal<() => void>;
    modesChanged: Signal<() => void>;
    outputChange: Signal<(damagedRegion: QRegion) => void>;
    transformChanged: Signal<() => void>;
    dpmsModeChanged: Signal<() => void>;
    capabilitiesChanged: Signal<() => void>;
    overscanChanged: Signal<() => void>;
    vrrPolicyChanged: Signal<() => void>;
    rgbRangeChanged: Signal<() => void>;
    wideColorGamutChanged: Signal<() => void>;
    sdrBrightnessChanged: Signal<() => void>;
    highDynamicRangeChanged: Signal<() => void>;
    autoRotationPolicyChanged: Signal<() => void>;
    iccProfileChanged: Signal<() => void>;
    iccProfilePathChanged: Signal<() => void>;
    brightnessMetadataChanged: Signal<() => void>;
    sdrGamutWidenessChanged: Signal<() => void>;
    colorDescriptionChanged: Signal<() => void>;

    // ### Functions
    mapToGlobal(pos: QPointF): QPointF;
    mapFromGlobal(pos: QPointF): QPointF;
  }
}
