// src/viewModels/SidebarTreeViewModel.ts
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLayerId,
  selectMarkerId,
  selectSphereId,
} from '../store/slices/viewerSlice';
import { RootState } from '../store/store';

export const useSidebarTreeViewModel = () => {
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

  const handleItemClick = (
    event: React.SyntheticEvent<Element, Event>,
    itemId: string
  ) => {
    const selectedLayer = layerDataList.find((layer) => layer.id === itemId);
    if (selectedLayer) {
      dispatch(selectLayerId(itemId));
      dispatch(selectSphereId(null));
      dispatch(selectMarkerId(null));
      return;
    }

    const selectedSphere = sphereDataList.find(
      (sphere) => sphere.id === itemId
    );
    if (selectedSphere) {
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
      dispatch(selectLayerId(sphereOfMarker!.layerId));
      dispatch(selectSphereId(selectedMarker.sphereId));
      dispatch(selectMarkerId(itemId));
    }
  };

  return {
    handleItemClick,
  };
};
