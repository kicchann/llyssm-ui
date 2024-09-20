import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { LayerViewer } from '../organisms/LayerViewer';
import { PanoramaViewer } from '../organisms/PanoramaViewer';
import { ViewPageTemplate } from '../templates/ViewPageTemplate';

export const ViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLパラメータからidを取得
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const content = selectedSphereId ? (
    <PanoramaViewer />
  ) : selectedLayerId ? (
    <LayerViewer />
  ) : (
    <div>No layer or sphere selected</div>
  );

  return <ViewPageTemplate content={content} />;
};
