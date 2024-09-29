import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal, toggleSidebar } from '../store/slices/statusSlice';
import {
  selectLayerId,
  selectMarkerId,
  selectSphereId,
} from '../store/slices/viewSlice';
import { RootState } from '../store/store';

export const useViewPageTemplateViewModel = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.status.isSidebarOpen
  );
  const activeModal = useSelector(
    (state: RootState) => state.status.activeModal
  );
  const selectedSphereId = useSelector(
    (state: RootState) => state.viewer.selectedSphereId
  );
  const closeModal = () => {
    dispatch(setActiveModal(null));
  };
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const clearSelection = () => {
    dispatch(selectLayerId(null));
    dispatch(selectSphereId(null));
    dispatch(selectMarkerId(null));
  };

  return {
    isSidebarOpen,
    activeModal,
    selectedSphereId,
    closeModal,
    handleToggleSidebar,
    clearSelection,
  };
};
