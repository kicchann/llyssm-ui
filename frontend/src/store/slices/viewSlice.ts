import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayerData } from '../../types/layer';
import { MarkerData } from '../../types/marker';
import { SphereData } from '../../types/sphere';

interface ViewerState {
  selectedLayerId: string | null; // 選択中のレイヤーID
  lastSelectedSphereId: string | null; // 直前に選択したSphereID
  selectedSphereId: string | null; // 選択中のSphereID
  selectedMarkerId: string | null; // 選択中のマーカーID
  layerDataList: LayerData[]; // レイヤーデータリスト
  sphereDataList: SphereData[]; // Sphereデータリスト
  markerDataList: MarkerData[]; // マーカーデータリスト
}

const initialState: ViewerState = {
  selectedLayerId: null,
  lastSelectedSphereId: null,
  selectedSphereId: null,
  selectedMarkerId: null,
  layerDataList: [],
  sphereDataList: [],
  markerDataList: [],
};

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    selectLayerId: (state, action: PayloadAction<string | null>) => {
      state.selectedLayerId = action.payload;
    },
    selectLastSphereId: (state, action: PayloadAction<string | null>) => {
      state.lastSelectedSphereId = action.payload;
    },
    selectSphereId: (state, action: PayloadAction<string | null>) => {
      state.selectedSphereId = action.payload;
    },
    selectMarkerId: (state, action: PayloadAction<string | null>) => {
      state.selectedMarkerId = action.payload;
    },
    selectLayerDataList: (state, action: PayloadAction<LayerData[]>) => {
      state.layerDataList = action.payload;
    },
    selectSphereDataList: (state, action: PayloadAction<SphereData[]>) => {
      state.sphereDataList = action.payload;
    },
    selectMarkerDataList: (state, action: PayloadAction<MarkerData[]>) => {
      state.markerDataList = action.payload;
    },
  },
});

export const {
  selectLayerId,
  selectLastSphereId,
  selectSphereId,
  selectMarkerId,
  selectLayerDataList,
  selectSphereDataList,
  selectMarkerDataList,
} = viewerSlice.actions;

export default viewerSlice.reducer;
