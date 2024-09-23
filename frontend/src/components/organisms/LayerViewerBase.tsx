// /workspaces/malaspherer-ui/frontend/src/components/organisms/LayerViewer.tsx
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useLayerViewerViewModel } from '../../viewModels/LayerViewerViewModel';
import { ToggleSidebarButton } from '../molecules/ToggleSidebarButton';

interface LayerViewerBaseProps {
  isDesktop: boolean;
}

const StyledWholeBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
});

const StyledCenterBox = styled(Box)({
  position: 'relative',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledSpherePinBox = styled(Box)({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  width: '24px',
  height: '24px',
});

const StyledMainImg = styled('img')({
  width: '100%',
  height: '100%',
});

const LayerViewerBase: React.FC<LayerViewerBaseProps> = ({ isDesktop }) => {
  const {
    selectedLayer,
    sphereDataList,
    handleSphereClick,
    isSidebarOpen,
    handleToggleSidebar,
  } = useLayerViewerViewModel();
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageSize({ width: naturalWidth, height: naturalHeight });
    }
  }, [selectedLayer]);

  if (!selectedLayer) {
    return <div>No layer selected</div>;
  }

  return (
    <StyledWholeBox>
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
      <StyledCenterBox>
        <TransformWrapper>
          <TransformComponent>
            <StyledMainImg
              ref={imageRef}
              src={selectedLayer.imageUrl}
              alt={selectedLayer.name}
            />
            {/* Sphereのピンを配置 */}
            {sphereDataList
              .filter((sphere) => sphere.layerId === selectedLayer.id)
              .map((sphere) => (
                <StyledSpherePinBox
                  key={sphere.id}
                  title={sphere.name}
                  onClick={() => handleSphereClick(sphere.id)}
                  sx={{
                    top: `${(sphere.position.y / imageSize.height) * 100}%`,
                    left: `${(sphere.position.x / imageSize.width) * 100}%`,
                  }}
                >
                  <Box
                    component="img"
                    src="/images/marker-pano.png"
                    alt="Sphere Pin"
                    sx={{ width: '24px', height: '24px' }}
                  />
                </StyledSpherePinBox>
              ))}
          </TransformComponent>
        </TransformWrapper>
      </StyledCenterBox>
    </StyledWholeBox>
  );
};

// export const CompactPanoramaViewer = () => (
//   <PanoramaViewerBase isDesktop={false} />
// );
// export const PanoramaViewer = () => <PanoramaViewerBase isDesktop={true} />;

export const LayerViewer: React.FC = () => <LayerViewerBase isDesktop={true} />;
export const CompactLayerViewer: React.FC = () => (
  <LayerViewerBase isDesktop={false} />
);
