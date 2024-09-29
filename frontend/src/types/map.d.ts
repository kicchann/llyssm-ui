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

export interface ImageSize {
  width: number;
  height: number;
}

export interface LocationData {
  id: string;
  geoLocation: GeoLocation;
  name: string;
  description: string;
  iconType: 'default' | 'house';
  websiteUrl?: string; // Optional
}

export interface LayerData {
  id: string;
  locationId: string;
  name: string;
  imageUrl: string;
  imageSize: ImageSize;
  createdAt: string;
  updatedAt: string;
}

export interface SphereData {
  id: string;
  name: string;
  imageUrl: string;
  position: Position;
  createdAt: string;
  layerId?: string; // Optional layerIdがない場合はレイヤー上でなく、地図上に表示
  geoLocation?: GeoLocation; // Optional
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
