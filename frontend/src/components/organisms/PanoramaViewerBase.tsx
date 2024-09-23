import { Box } from '@mui/material';
import { styled } from '@mui/system';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/map-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import React from 'react';
import { usePanoramaViewerViewModel } from '../../viewModels/PanoramaViewerViewModel';
import { ToggleSidebarButton } from '../molecules/ToggleSidebarButton';
import { YawPitchDisplay } from '../molecules/YawPitchDisplay';
import { MarkerModal } from './MarkerModal';

interface PanoramaViewerBaseProps {
  isDesktop: boolean;
}
const StyledWholeBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
});

const StyledFlexBox = styled(Box)({
  flexGrow: 1,
});

const ViewerBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const PanoramaViewerBase: React.FC<PanoramaViewerBaseProps> = ({
  isDesktop,
}) => {
  const {
    viewerRef,
    currentOrientation,
    isSidebarOpen,
    isMarkerModalOpen,
    handleToggleSidebar,
    selectedMarkerData,
    handleCloseMarkerModal,
  } = usePanoramaViewerViewModel(isDesktop);

  return (
    <StyledWholeBox>
      <StyledFlexBox>
        {/* ビューア本体 */}
        <ViewerBox ref={viewerRef}></ViewerBox>

        {/*
        yawとpitchを右下に表示
        画面が小さい場合は省略
        */}
        {isDesktop && (
          <YawPitchDisplay
            yaw={currentOrientation.yaw}
            pitch={currentOrientation.pitch}
          />
        )}

        {/*
        トグルボタンを左上に配置
        画面が小さい場合はサイドバーを用いないので、表示しない
        */}
        {isDesktop && (
          <ToggleSidebarButton
            isSidebarOpen={isSidebarOpen}
            onToggle={handleToggleSidebar}
          />
        )}
      </StyledFlexBox>
      {/* selectedMarkerDataがTruethyならMarkerModalを表示 */}
      {!!selectedMarkerData && (
        <MarkerModal
          open={isMarkerModalOpen}
          onClose={handleCloseMarkerModal}
          markerData={selectedMarkerData}
        />
      )}
    </StyledWholeBox>
  );
};

export const CompactPanoramaViewer = () => (
  <PanoramaViewerBase isDesktop={false} />
);
export const PanoramaViewer = () => <PanoramaViewerBase isDesktop={true} />;
