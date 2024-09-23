import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { selectLayerId } from '../../store/slices/viewerSlice';
import { RootState } from '../../store/store';
import { CompactLayerViewer, LayerViewer } from '../organisms/LayerViewerBase';
import {
  CompactPanoramaViewer,
  PanoramaViewer,
} from '../organisms/PanoramaViewerBase';
import { ViewPageTemplate } from '../templates/ViewPageTemplate';

export const ViewPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>(); // URLパラメータからidを取得
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.viewer.isAuthenticated
  );
  const selectedSphereId = useSelector(
    (state: RootState) => state.viewer.selectedSphereId
  );
  const selectedLayerId = useSelector(
    (state: RootState) => state.viewer.selectedLayerId
  );
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
  );
  const isMobile = useMediaQuery('mobile');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (layerDataList.length > 0 && !selectedLayerId) {
      dispatch(selectLayerId(layerDataList[0].id));
    }
  }, [dispatch, layerDataList, selectedLayerId]);

  const content = isMobile ? (
    selectedSphereId ? (
      <CompactPanoramaViewer />
    ) : (
      <CompactLayerViewer />
    )
  ) : selectedSphereId ? (
    <PanoramaViewer />
  ) : (
    <LayerViewer />
  );
  return <ViewPageTemplate content={content} />;
};
