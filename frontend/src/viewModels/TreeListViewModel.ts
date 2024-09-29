import { useDispatch, useSelector } from 'react-redux';
import {
  selectLayerId,
  selectMarkerId,
  selectSphereId,
} from '../store/slices/viewSlice';
import { RootState } from '../store/store';

export const useTreeListViewModel = () => {
  const dispatch = useDispatch();
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

  const handleItemClick = (
    event: React.SyntheticEvent<Element, Event>,
    itemId: string
  ) => {
    const selectedLayer = layerDataList.find((layer) => layer.id === itemId);
    if (selectedLayer) {
      // dispatch(selectLayerId(itemId));
      // dispatch(selectSphereId(null));
      // dispatch(selectMarkerId(null));
      return;
    }

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === itemId
    );
    if (selectedSphere && selectedSphere.layerId) {
      dispatch(selectLayerId(selectedSphere.layerId));
      dispatch(selectSphereId(itemId));
      dispatch(selectMarkerId(null));
      return;
    }

    const selectedMarker = markerDataList.find(
      (marker) => marker.id === itemId
    );
    if (selectedMarker) {
      const sphereOfMarker = sphereDataList.find(
        (sphere) => sphere.id === selectedMarker.sphereId
      );
      if (sphereOfMarker && sphereOfMarker.layerId) {
        dispatch(selectLayerId(sphereOfMarker.layerId));
        dispatch(selectSphereId(selectedMarker.sphereId));
        dispatch(selectMarkerId(itemId));
        return;
      }
    }
  };

  return {
    layerDataList,
    sphereDataList,
    markerDataList,
    selectedLayerId,
    selectedSphereId,
    selectedMarkerId,
    handleItemClick,
  };
};
