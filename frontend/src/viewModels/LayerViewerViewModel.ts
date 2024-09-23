import { useDispatch, useSelector } from 'react-redux';
import { selectSphereId, toggleSidebar } from '../store/slices/viewerSlice';
import { RootState } from '../store/store';

export const useLayerViewerViewModel = () => {
  const dispatch = useDispatch();
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const isSidebarOpen = useSelector(
    (state: RootState) => state.viewer.isSidebarOpen
  );

  const selectedLayer = layerDataList.find(
    (layer) => layer.id === selectedLayerId
  );

  // Sphereのピンをクリックしたときの処理
  const handleSphereClick = (sphereId: string) => {
    dispatch(selectSphereId(sphereId));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return {
    selectedLayer,
    sphereDataList,
    handleSphereClick,
    isSidebarOpen,
    handleToggleSidebar,
  };
};
