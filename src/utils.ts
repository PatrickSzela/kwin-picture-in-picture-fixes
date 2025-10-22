import { Qt } from "./typings/qt";

const DEFAULT_CORNER = Qt.Corner.BottomRight;
const CORNER_GRID = [
  [Qt.Corner.TopLeft, Qt.Corner.TopRight],
  [Qt.Corner.BottomLeft, Qt.Corner.BottomRight],
] as const;
const PIP_TAGS = ["pip"];
const PIP_TITLES = ["picture-in-picture", "picture in picture"];

export function isProperWindow(window: any): window is KWin.Window {
  return (
    typeof window === "object" &&
    typeof window.resourceName === "string" &&
    window.resourceName.trim().length &&
    (!window.specialWindow || window.dock)
  );
}

export function isPipWindow(window: KWin.Window) {
  const title = window.caption.toLowerCase();
  const tag = window.tag.toLowerCase();

  if (!window.moveable && !window.fullScreen) return false;
  if (PIP_TAGS.includes(tag)) return true;

  if (hasBorder(window) || window.specialWindow) return false;
  return PIP_TITLES.some((i) => title.includes(i));
}

export function hasBorder(window: KWin.Window) {
  // we need to check this manually since there doesn't seem to be a `hasBorder` property in KWin's API (except for `noBorder`, but even with a PiP window not having a border, it's set to false)
  return (
    window.frameGeometry.width !== window.clientGeometry.width ||
    window.frameGeometry.height !== window.clientGeometry.height
  );
}

export function screenName(screen: KWin.Output) {
  return `${screen.manufacturer} ${screen.model} (${screen.name})`;
}

export function rectCenter({ x, y, height, width }: QRect | QRectF): QPoint {
  return {
    x: x + width / 2,
    y: y + height / 2,
  };
}

export function rectLocalCenter({ height, width }: QRect | QRectF): QPoint {
  return {
    x: width / 2,
    y: height / 2,
  };
}

export function distance(
  p1: QPoint,
  p2: QPoint,
  horizontalWeight: number = 1,
  verticalWeight: number = 2,
) {
  return Math.sqrt(
    horizontalWeight * Math.pow(p1.x - p2.x, 2) +
      verticalWeight * Math.pow(p1.y - p2.y, 2),
  );
}

export function getOppositeCorners(corner: Qt.Corner) {
  const [x, y] = [corner % 2, Math.floor(corner / 2)];
  return [
    CORNER_GRID[Number(y)]![Number(!x)]!,
    CORNER_GRID[Number(!y)]![Number(x)]!,
    CORNER_GRID[Number(!y)]![Number(!x)]!,
  ] as const;
}

export function findTouchedEdge(p1: QRect, p2: QRect) {
  const diff = (n1: number, n2: number) => Math.abs(n1 - n2) <= 1;

  if (diff(p1.left, p2.left)) return Qt.Edge.Left;
  else if (diff(p1.right, p2.right)) return Qt.Edge.Right;
  else if (diff(p1.top, p2.top)) return Qt.Edge.Top;
  else if (diff(p1.bottom, p2.bottom)) return Qt.Edge.Bottom;
}

export function detectEdgeWindowIsTouching(window: KWin.Window) {
  return findTouchedEdge(
    window.frameGeometry,
    getScreensClientArea(window.output),
  );
}

export function getCornersFromEdge(edge: Qt.Edge): [Qt.Corner, Qt.Corner] {
  switch (edge) {
    case Qt.Edge.Top:
      return [Qt.Corner.TopLeft, Qt.Corner.TopRight];
    case Qt.Edge.Left:
      return [Qt.Corner.TopLeft, Qt.Corner.BottomLeft];
    case Qt.Edge.Right:
      return [Qt.Corner.TopRight, Qt.Corner.BottomRight];
    case Qt.Edge.Bottom:
      return [Qt.Corner.BottomLeft, Qt.Corner.BottomRight];
  }
}

export function getRectCornerPosition(rect: QRect, corner: Qt.Corner): QPoint {
  switch (corner) {
    case Qt.Corner.TopLeft:
      return { x: rect.left, y: rect.top };
    case Qt.Corner.TopRight:
      return { x: rect.right, y: rect.top };
    case Qt.Corner.BottomLeft:
      return { x: rect.left, y: rect.bottom };
    case Qt.Corner.BottomRight:
      return { x: rect.right, y: rect.bottom };
  }
}

export function getScreensInDirection(screen: KWin.Output, corner: Qt.Corner) {
  const sG = screen.geometry;
  let screens: [KWin.Output, Qt.Corner][] = [];

  for (const i of workspace.screens) {
    if (i === screen) continue;

    const iG = i.geometry;
    const oppositeCorners = getOppositeCorners(corner);
    let direction: [Boolean, Boolean] = [false, false];

    switch (corner) {
      case Qt.Corner.TopLeft:
        direction = [iG.bottom < sG.top, iG.right < sG.left];
        break;
      case Qt.Corner.TopRight:
        direction = [iG.bottom < sG.top, iG.left > sG.right];
        break;
      case Qt.Corner.BottomLeft:
        direction = [iG.top > sG.bottom, iG.right < sG.left];
        break;
      case Qt.Corner.BottomRight:
        direction = [iG.top > sG.bottom, iG.left > sG.right];
        break;
    }

    const [vertical, horizontal] = direction;
    let finalCorner: Qt.Corner;

    if (horizontal && vertical) finalCorner = oppositeCorners[2];
    else if (vertical) finalCorner = oppositeCorners[1];
    else if (horizontal) finalCorner = oppositeCorners[0];
    else continue;

    screens = [...screens, [i, finalCorner]];
  }

  const sC = rectCenter(screen.geometry);

  return screens.sort(([a], [b]) => {
    const [aC, bC] = [rectCenter(a.geometry), rectCenter(b.geometry)];
    const weights = [1, 2];
    return distance(sC, aC, ...weights) - distance(sC, bC, ...weights);
  });
}

export function getCornerNeighbor(
  screen: KWin.Output,
  corner: Qt.Corner,
  allowOtherDirections: boolean = false,
  allowScreensWithFullscreenWindows: boolean = false,
) {
  let corners: Qt.Corner[] = [
    corner,
    ...(allowOtherDirections ? getOppositeCorners(corner) : []),
  ];

  for (const c of corners) {
    let bestScreens = getScreensInDirection(screen, c);

    if (!allowScreensWithFullscreenWindows)
      bestScreens = bestScreens.filter(([i]) => !isFullscreenWindowOnScreen(i));

    if (bestScreens[0]) return bestScreens[0];
  }
}

export function getCornersThatHaveNeighbor(
  screen: KWin.Output,
  startingCorner: Qt.Corner = DEFAULT_CORNER,
  allowScreensWithFullscreenWindows = false,
) {
  return [startingCorner, ...getOppositeCorners(startingCorner)].filter((i) =>
    getCornerNeighbor(screen, i, false, allowScreensWithFullscreenWindows),
  );
}

export function getInitialPlacement(
  window: KWin.Window,
  activeScreen: KWin.Output,
) {
  const screen = window.output;

  let data = getCornersThatHaveNeighbor(screen, DEFAULT_CORNER, true).map(
    (i) => [screen, i] as const,
  );

  if (screen === activeScreen)
    data = data.map((i) => getCornerNeighbor(i[0], i[1]) ?? i);

  const helper = (screen: KWin.Output) =>
    Number(screen === activeScreen) +
    Number(isFullscreenWindowOnScreen(screen));
  data = data.sort(([a], [b]) => helper(a) - helper(b));

  return data[0] ?? [screen, DEFAULT_CORNER];
}

export function isFullscreenWindowOnScreen(screen: KWin.Output) {
  const windows = [...workspace.stackingOrder].reverse();
  const window = windows.find((i) => i.output === screen && isProperWindow(i));
  return !!window?.fullScreen;
}

export function isHovered(window: KWin.Window) {
  // naive detection if removed window was hovered when removing it
  const { bottom, left, right, top } = window.frameGeometry;
  const { x, y } = workspace.cursorPos;
  return x >= left && x <= right && y >= top && y <= bottom;
}

export function getScreensClientArea(screen: KWin.Output) {
  const { currentDesktop } = workspace;
  return workspace.clientArea(KWin.PlacementArea, screen, currentDesktop);
}

export function getRatio(rect: QSize) {
  return rect.width / rect.height;
}
