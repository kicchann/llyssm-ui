export interface ImageSize {
  width: number;
  height: number;
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
