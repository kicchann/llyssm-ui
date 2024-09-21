import { Box } from '@mui/material';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/map-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PanoramaViewerViewModel } from '../../viewModels/PanoramaViewerViewModel';
import { MarkerInfo } from '../molecules/MarkerInfo';

export const CompactPanoramaViewer: React.FC = () => {
  const {
    viewerRef,
    viewerInstanceRef,
    initializeViewer,
    handleSphereChange,
    handleLayerChange,
    handleMarkerChange,
  } = PanoramaViewerViewModel();
  const layerDataList = useSelector(
    (state: RootState) => state.viewer.layerDataList
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
  const hoveredMarker = useSelector((state: RootState) =>
    state.viewer.markerDataList.find(
      (marker) => marker.id === state.viewer.hoveredMarkerId
    )
  );

  // ビューアの初期化
  // 監視対象: layerDataList
  useEffect(() => {
    initializeViewer();

    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current?.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [layerDataList]);

  // Layer が変更された時はmapPluginの更新
  // 監視対象: selectedLayerId
  useEffect(() => {
    handleLayerChange(selectedLayerId);
  }, [selectedLayerId]);

  // Sphere が変更された時の処理
  // 監視対象: selectedSphereId
  useEffect(() => {
    handleSphereChange(selectedSphereId);
  }, [selectedSphereId]);

  // Marker が変更された時の処理
  // 監視対象: selectedMarkerId
  useEffect(() => {
    handleMarkerChange(selectedMarkerId);
  }, [selectedMarkerId]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {/* ビューア本体 */}
        <Box ref={viewerRef} sx={{ width: '100%', height: '100%' }}></Box>

        {/* マーカーの情報表示 */}
        {hoveredMarker && (
          <MarkerInfo
            name={hoveredMarker.name}
            description={hoveredMarker.description}
            imageUrl={hoveredMarker.imageUrl}
          />
        )}
      </Box>
    </Box>
  );
};
