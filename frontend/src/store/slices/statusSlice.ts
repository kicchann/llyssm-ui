import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  isAuthenticated: boolean; // 認証済みかどうか
  isLoading: boolean; // ローディング中かどうか
  isSidebarOpen: boolean; // サイドバーが開いているかどうか
  activeModal: 'layer' | 'marker' | null; // アクティブなモーダル
  notificationMessage: string | null; // 通知メッセージ
  errorMessage: string | null; // エラーメッセージ
}

const initialState: StatusState = {
  isAuthenticated: false,
  isLoading: false,
  isSidebarOpen: true,
  activeModal: null,
  notificationMessage: null,
  errorMessage: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setActiveModal: (
      state,
      action: PayloadAction<'layer' | 'marker' | null>
    ) => {
      state.activeModal = action.payload;
    },
    setNotificationMessage: (state, action: PayloadAction<string | null>) => {
      state.notificationMessage = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setIsLoading,
  toggleSidebar,
  setActiveModal,
  setNotificationMessage,
  setErrorMessage,
} = statusSlice.actions;

export default statusSlice.reducer;
