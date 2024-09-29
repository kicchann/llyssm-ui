import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useMarkerViewerViewModel = () => {
  const selectedMarkerId = useSelector(
    (state: RootState) => state.viewer.selectedMarkerId
  );
  const markerDataList = useSelector(
    (state: RootState) => state.viewer.markerDataList
  );
  const markerData = markerDataList.find(
    (marker) => marker.id === selectedMarkerId
  );

  return {
    markerData,
  };
};
