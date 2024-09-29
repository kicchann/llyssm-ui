import { Position, Viewer } from '@photo-sphere-viewer/core';
import { Orientation } from '../types/map';

export const getOrientation = (viewer: Viewer | null) => {
  if (!viewer) return { yaw: 0, pitch: 0 };
  const position: Position = viewer.getPosition();
  if (!position) return { yaw: 0, pitch: 0 };
  // 小数点以下第1位までで四捨五入
  const orientation: Orientation = {
    yaw: Math.round(((position.yaw * 180) / Math.PI) * 10) / 10,
    pitch: Math.round(((position.pitch * 180) / Math.PI) * 10) / 10,
  };
  return orientation;
};
