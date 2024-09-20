// src/utils/animationUtils.ts
import { Viewer } from '@photo-sphere-viewer/core';

export const animateToMarker = (
  viewer: Viewer,
  yaw: number, // Yaw in degrees
  pitch: number, // Pitch in degrees
  speed: number = 500
) => {
  viewer.animate({
    yaw: (yaw * Math.PI) / 180,
    pitch: (pitch * Math.PI) / 180,
    speed: speed,
  });
};
