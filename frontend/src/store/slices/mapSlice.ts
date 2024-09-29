import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoLocation, LocationData } from '../../types/map';

interface ViewerState {
  userGeoLocation: GeoLocation | null; // ユーザーの位置情報
  locationDataList: LocationData[]; // マーカーデータリスト
}

const initialState: ViewerState = {
  userGeoLocation: null,
  locationDataList: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setUserGeoLocation: (state, action: PayloadAction<GeoLocation | null>) => {
      state.userGeoLocation = action.payload;
    },
    selectLocationDataList: (state, action: PayloadAction<LocationData[]>) => {
      state.locationDataList = action.payload;
    },
  },
});

export const { setUserGeoLocation, selectLocationDataList } = mapSlice.actions;

export default mapSlice.reducer;
