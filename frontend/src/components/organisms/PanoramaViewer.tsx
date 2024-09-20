import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/map-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/viewerSlice';
import { RootState } from '../../store/store';
import { Orientation } from '../../types/map';
import { PanoramaViewerViewModel } from '../../viewModels/PanoramaViewerViewModel';
import { MarkerInfo } from '../molecules/MarkerInfo';

export const PanoramaViewer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    viewerRef,
    viewerInstanceRef,
    initializeViewer,
    handleSphereChange,
    handleLayerChange,
    handleMarkerChange,
  } = PanoramaViewerViewModel();
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
  const isSidebarOpen = useSelector(
    (state: RootState) => state.viewer.isSidebarOpen
  );
  const [currentOrientation, setCurrentOrientation] = useState<Orientation>({
    yaw: 0.0,
    pitch: 0.0,
  });

  // ビューアの初期化
  // 監視対象: layerDataList, sphereDataList, markerDataList
  useEffect(() => {
    initializeViewer();

    // Yaw と Pitch の更新処理
    const updateOrientation = () => {
      const position = viewerInstanceRef.current?.getPosition();
      if (!position) return;
      setCurrentOrientation({
        yaw: (position.yaw * 180) / Math.PI,
        pitch: (position.pitch * 180) / Math.PI,
      });
      requestAnimationFrame(updateOrientation); // Update on each frame
    };
    updateOrientation(); // Start updating
    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current?.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [initializeViewer, viewerInstanceRef]);

  // Layer が変更された時はmapPluginの更新
  // 監視対象: selectedLayerId
  useEffect(() => {
    handleLayerChange(selectedLayerId);
  }, [selectedLayerId, handleLayerChange]);

  // Sphere が変更された時の処理
  // 監視対象: selectedSphereId
  useEffect(() => {
    handleSphereChange(selectedSphereId);
  }, [selectedSphereId, handleSphereChange]);

  // Marker が変更された時の処理
  // 監視対象: selectedMarkerId
  useEffect(() => {
    handleMarkerChange(selectedMarkerId);
  }, [selectedMarkerId, handleMarkerChange]);

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

        {/* yawとpitchを右下に表示 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 45,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          <Typography variant="body2" color="white">
            Yaw: {currentOrientation.yaw.toFixed(2)}°
          </Typography>
          <Typography variant="body2" color="white">
            Pitch: {currentOrientation.pitch.toFixed(2)}°
          </Typography>
        </Box>

        {/* トグルボタンを左上に配置 */}
        <IconButton
          onClick={() => dispatch(toggleSidebar())}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {isSidebarOpen ? (
            <KeyboardDoubleArrowLeft />
          ) : (
            <KeyboardDoubleArrowRight />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
