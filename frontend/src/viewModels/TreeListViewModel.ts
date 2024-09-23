import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useTreeListViewModel = () => {
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const sphereDataList = useSelector(
    (state: RootState) => state.viewer.sphereDataList
  );
  const markerDataList = useSelector(
    (state: RootState) => state.viewer.markerDataList
  );
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const selectedSphereId = useSelector(
    (state: RootState) => state.viewer.selectedSphereId
  );
  const selectedMarkerId = useSelector(
    (state: RootState) => state.viewer.selectedMarkerId
  );

  return {
    layerDataList,
    sphereDataList,
    markerDataList,
    selectedLayerId,
    selectedSphereId,
    selectedMarkerId,
  };
};
