import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { MarkerData } from '../../types/map';
import { useMarkerModalViewModel } from '../../viewModels/MarkerModalViewModel';

interface MarkerModalProps {
  open: boolean;
  onClose: () => void;
  markerData: MarkerData | null;
}

const StyledModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  maxWidth: '800px',
  bgcolor: 'rgba(0, 0, 0, 0.2)',
  p: 1,
  maxHeight: '90vh',
  overflowY: 'auto',
  paddingTop: 36, // 閉じるボタン分のスペースを確保
});

const StyledCenterBox = styled(Box)({
  position: 'relative',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
  color: 'white',
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

export const MarkerModal: React.FC<MarkerModalProps> = ({
  open,
  onClose,
  markerData,
}) => {
  useMarkerModalViewModel(onClose);

  if (!markerData) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="marker-modal-title"
      aria-describedby="marker-modal-description"
    >
      <StyledModalBox>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
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
      </StyledModalBox>
    </Modal>
  );
};
