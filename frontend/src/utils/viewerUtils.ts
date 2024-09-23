import { Position, Viewer } from '@photo-sphere-viewer/core';
import { Orientation } from '../types/map';

export const getOrientation = (viewer: Viewer | null) => {
  if (!viewer) return { yaw: 0, pitch: 0 };
  const position: Position = viewer.getPosition();
  if (!position) return { yaw: 0, pitch: 0 };
  const orientation: Orientation = {
    yaw: (position.yaw * 180) / Math.PI,
    pitch: (position.pitch * 180) / Math.PI,
  };
  return orientation;
};
