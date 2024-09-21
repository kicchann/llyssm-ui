import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayerData, MarkerData, SphereData } from '../../types/map';

interface ViewerState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  isAuthenticated: boolean;
  selectedLayerId: string | null;
  lastSelectedSphereId: string | null;
  selectedSphereId: string | null;
  selectedMarkerId: string | null;
  hoveredMarkerId: string | null;
  layerDataList: LayerData[];
  sphereDataList: SphereData[];
  markerDataList: MarkerData[];
}

const initialState: ViewerState = {
  isLoading: false,
  isSidebarOpen: false,
  isAuthenticated: false,
  selectedLayerId: null,
  lastSelectedSphereId: null,
  selectedSphereId: null,
  selectedMarkerId: null,
  hoveredMarkerId: null,
  layerDataList: [],
  sphereDataList: [],
  markerDataList: [],
};

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
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
    selectHoveredMarkerId: (state, action: PayloadAction<string | null>) => {
      state.hoveredMarkerId = action.payload;
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
  setIsLoading,
  toggleSidebar,
  setIsAuthenticated,
  selectLayerId,
  selectLastSphereId,
  selectSphereId,
  selectMarkerId,
  selectHoveredMarkerId,
  selectLayerDataList,
  selectSphereDataList,
  selectMarkerDataList,
} = viewerSlice.actions;

export default viewerSlice.reducer;
