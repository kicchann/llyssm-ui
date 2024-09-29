import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice';
import statusReducer from './slices/statusSlice';
import viewerReducer from './slices/viewSlice';

const store = configureStore({
  reducer: {
    status: statusReducer,
    viewer: viewerReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
