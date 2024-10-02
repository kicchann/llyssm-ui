import { GeoLocation } from './map';

export interface Position {
  x: number;
  y: number;
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
