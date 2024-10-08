import { Box, styled } from '@mui/material';
import React from 'react';
import { Label } from '../atoms/Label';

interface YawPitchDisplayProps {
  yaw: number;
  pitch: number;
}

const StyledBox = styled(Box)`
  position: absolute;
  bottom: 45;
  right: 10;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
`;

export const YawPitchDisplay: React.FC<YawPitchDisplayProps> = ({
  yaw,
  pitch,
}) => {
  return (
    <StyledBox>
      <Label text={`Yaw: ${yaw.toFixed(1)}°`} color="white" />
      <Label text={`Pitch: ${pitch.toFixed(1)}°`} color="white" />
    </StyledBox>
  );
};
