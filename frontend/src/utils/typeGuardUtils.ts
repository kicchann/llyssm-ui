// src/utils/typeGuards.ts
import { LayerData, MarkerData, SphereData } from '../types/map';

export function isLayerDataList(data: any): data is LayerData[] {
  return (
    Array.isArray(data) && data.every((item) => 'id' in item && 'name' in item)
  );
}

export function isMarkerDataList(data: any): data is MarkerData[] {
  return (
    Array.isArray(data) &&
    data.every((item) => 'id' in item && 'name' in item && 'sphereId' in item)
  );
}

export function isSphereDataList(data: any): data is SphereData[] {
  return (
    Array.isArray(data) &&
    data.every((item) => 'id' in item && 'name' in item && 'layerId' in item)
  );
}
