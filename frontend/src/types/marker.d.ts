export interface Orientation {
  yaw: number;
  pitch: number;
}

export interface MarkerData {
  id: string;
  sphereId: string;
  name: string;
  description: string;
  orientation: Orientation;
  imageUrl: string;
  thumbnailUrl: string;
  markerType: string;
  createdAt: string;
}
