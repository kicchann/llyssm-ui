import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useMarkerViewerViewModel } from '../../viewModels/MarkerViewerViewModel';

const StyledCenterBox = styled(Box)({
  position: 'relative',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
});

const StyledH2Typography = styled(Typography)({
  component: 'h2',
  marginBottom: 2,
  color: 'white',
});

const StyledTypography = styled(Typography)({
  marginBottom: 2,
  color: 'white',
});

export const MarkerViewer: React.FC = () => {
  const { markerData } = useMarkerViewerViewModel();

  if (!markerData) {
    return null;
  }

  return (
    <>
      <StyledH2Typography id="marker-modal-title" variant="h6">
        {markerData.name}
      </StyledH2Typography>
      <StyledCenterBox>
        <TransformWrapper>
          <TransformComponent>
            <img
              src={markerData.imageUrl}
              alt={markerData.name}
              style={{
                // 画面中央
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </StyledCenterBox>
      <StyledTypography id="marker-modal-description" variant="body1">
        {markerData.description}
      </StyledTypography>
    </>
  );
};
