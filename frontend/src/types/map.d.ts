export interface GeoLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Orientation {
  yaw: number;
  pitch: number;
}

// export interface FacilityMarkerData {
//   id: string
//   geoLocation: GeoLocation
//   name: string
//   description: string
//   websiteUrl?: string
//   iconType?: keyof typeof icons // 文字列（アイコン名）で指定
// }

export interface SphereMarkerData {
  geoLocation: GeoLocation;
  name: string;
  description: string;
  iconUrl?: string;
}

export interface LayerData {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SphereData {
  id: string;
  layerId: string;
  name: string;
  imageUrl: string;
  position: Position;
  createdAt: string;
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
