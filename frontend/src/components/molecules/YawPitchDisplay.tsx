import { Box, styled } from '@mui/material';
import React from 'react';
import { Label } from '../atoms/Label';

interface YawPitchDisplayProps {
  yaw: number;
  pitch: number;
}

const StyledBox = styled(Box)({
  position: 'absolute',
  bottom: 45,
  right: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '5px 10px',
  borderRadius: '5px',
});

export const YawPitchDisplay: React.FC<YawPitchDisplayProps> = ({
  yaw,
  pitch,
}) => {
  return (
    <StyledBox>
      <Label text={`Yaw: ${yaw.toFixed(2)}°`} color="white" />
      <Label text={`Pitch: ${pitch.toFixed(2)}°`} color="white" />
    </StyledBox>
  );
};
