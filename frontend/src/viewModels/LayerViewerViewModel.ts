import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../store/slices/statusSlice';
import { selectSphereId } from '../store/slices/viewSlice';
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

  const selectedLayer = layerDataList.find(
    (layer) => layer.id === selectedLayerId
  );

  // Sphereのピンをクリックしたときの処理
  const handleSphereClick = (sphereId: string) => {
    dispatch(selectSphereId(sphereId));
    dispatch(setActiveModal(null));
  };

  return {
    selectedLayer,
    sphereDataList,
    handleSphereClick,
  };
};
