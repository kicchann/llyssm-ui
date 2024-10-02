import { Box, styled } from '@mui/material';
import React, { useRef } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useLayerViewerViewModel } from '../../viewModels/LayerViewerViewModel';

const StyledCenterBox = styled(Box)`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpherePinBox = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const StyledMainImg = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: grab;
`;

const wrapperProps = {
  disabled: false,
  initialScale: 1,
  doubleClick: { mode: 'reset' as 'reset' }, //excluded: [], step: 0.7
  panning: { disabled: false, activationKeys: [], excluded: [] },
  pinch: { excluded: [], step: 5 },
  wheel: { activationKeys: [], excluded: [], smoothStep: 0.001, step: 0.2 },
};

export const LayerViewer: React.FC = () => {
  const { selectedLayer, sphereDataList, handleSphereClick } =
    useLayerViewerViewModel();
  const imageRef = useRef<HTMLImageElement>(null);

  if (!selectedLayer) {
    return <div>No layer selected</div>;
  }

  return (
    <StyledCenterBox>
      <TransformWrapper {...wrapperProps}>
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
                  top: `${(sphere.position.y / selectedLayer.imageSize.height) * 100}%`,
                  left: `${(sphere.position.x / selectedLayer.imageSize.width) * 100}%`,
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
  );
};
