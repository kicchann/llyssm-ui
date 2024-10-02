export interface GeoLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface LocationData {
  id: string;
  geoLocation: GeoLocation;
  name: string;
  description: string;
  iconType: 'default' | 'house';
  websiteUrl?: string; // Optional
}
