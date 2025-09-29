# Picture-in-Picture Fixes

A KWin script that fixes some issues related to Picture-in-Picture (PiP) windows like positioning, focus stealing and more

## Features:

- **Automatic PiP detection:** Automatically identifies Picture-in-Picture windows, either by their tag or their title
- **Automatic positioning:** Moves the newly created PiP windows to one of the corners of the screen (with preference for an edge that is shared with a different monitor) and stacks them on top of each other
- **Automatic resizing:** When multiple PiP windows are stacked on top of each other, the script resizes them to ensure they all have the same width (except for portrait windows)
- **Multi-monitor support:** If possible, the script moves PiP windows away from the currently "hovered" monitor (the one with cursor on it) to a neighbor monitor, as long as one of the PiP windows isn't hovered or focused
- **Always on top:** Marks the PiP windows to stay above other windows and on all Virtual Desktops
- **Focus prevention:** Stops PiP windows from stealing focus upon opening - automatically refocuses previously active window
- **Hide from taskbar:** Flags PiP windows to be hidden from the taskbar, pager and switcher

Script has been tested with Firefox and Chrome, but it should work with any application that sets the tag of the PiP window to `pip` or its title contains `Picture-in-Picture` or `Picture in Picture` (case insensitive), and it has no border and title bar

## Installation

> [!NOTE]
> This script is not yet available on the KDE Store, but that might change in the future

1. Download the most recent release from the [Releases tab](https://github.com/PatrickSzela/kwin-picture-in-picture-fixes/releases/latest)
2. Install the script by pressing the _Install from File..._ button under _System Settings_ > _Window Management_ > _KWin Scripts_ and selecting the downloaded release

## Building

1. Clone this repository
2. Install the required dependencies: `pnpm i`
3. Build and install the script: `pnpm run dev`
4. Make sure the script is installed and enabled under _System Settings_ > _Window Management_ > _KWin Scripts_

## Uninstallation

1. Delete the script under _System Settings_ > _Window Management_ > _KWin Scripts_

## Roadmap

- Create a configuration window with options to specify preferred corner, ability to toggle features etc.
- Upload the script to KDE Store

## Limitations

- When the script falls back to checking the window's title, it will not detect windows whose title doesn't match the internal logic - only English is currently supported
- Because of KWin Scripting API limitations, to animate the movement of the PiP window between monitors, a separate Desktop Effect needs to be installed, for example [Geometry Change](https://store.kde.org/p/2136283)
