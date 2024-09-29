// src/utils/typeGuards.ts
import {
  GeoLocation,
  ImageSize,
  LayerData,
  LocationData,
  MarkerData,
  Orientation,
  Position,
  SphereData,
} from '../types/map';

function isGeoLocation(data: any): data is GeoLocation {
  return (
    typeof data === 'object' &&
    'latitude' in data &&
    'longitude' in data &&
    typeof data.latitude === 'number' &&
    typeof data.longitude === 'number'
  );
}

function isPosition(data: any): data is Position {
  return (
    typeof data === 'object' &&
    'x' in data &&
    'y' in data &&
    typeof data.x === 'number' &&
    typeof data.y === 'number'
  );
}

function isOrientation(data: any): data is Orientation {
  return (
    typeof data === 'object' &&
    'yaw' in data &&
    'pitch' in data &&
    typeof data.yaw === 'number' &&
    typeof data.pitch === 'number'
  );
}

function isImageSize(data: any): data is ImageSize {
  return (
    typeof data === 'object' &&
    'width' in data &&
    'height' in data &&
    typeof data.width === 'number' &&
    typeof data.height === 'number'
  );
}

function isLocationData(data: any): data is LocationData {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'geoLocation' in data &&
    'name' in data &&
    'description' in data &&
    isGeoLocation(data.geoLocation)
  );
}

export function isLocationDataList(data: any): data is LocationData[] {
  return Array.isArray(data) && data.every(isLocationData);
}

function isLayerData(data: any): data is LayerData {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'locationId' in data &&
    'name' in data &&
    'imageUrl' in data &&
    'imageSize' in data &&
    'createdAt' in data &&
    'updatedAt' in data &&
    isImageSize(data.imageSize)
  );
}

export function isLayerDataList(data: any): data is LayerData[] {
  return Array.isArray(data) && data.every(isLayerData);
}

function isSphereData(data: any): data is SphereData {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'name' in data &&
    'imageUrl' in data &&
    'position' in data &&
    'createdAt' in data &&
    isPosition(data.position)
  );
}

export function isSphereDataList(data: any): data is SphereData[] {
  return Array.isArray(data) && data.every(isSphereData);
}

function isMarkerData(data: any): data is MarkerData {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'sphereId' in data &&
    'name' in data &&
    'description' in data &&
    'orientation' in data &&
    'imageUrl' in data &&
    'thumbnailUrl' in data &&
    'markerType' in data &&
    'createdAt' in data &&
    isOrientation(data.orientation)
  );
}

export function isMarkerDataList(data: any): data is MarkerData[] {
  return Array.isArray(data) && data.every(isMarkerData);
}
