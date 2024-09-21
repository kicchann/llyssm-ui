import { Box, Typography } from '@mui/material';
import React from 'react';

interface YawPitchDisplayProps {
  yaw: number;
  pitch: number;
}

export const YawPitchDisplay: React.FC<YawPitchDisplayProps> = ({
  yaw,
  pitch,
}) => {
  return (
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
        Yaw: {yaw.toFixed(2)}°
      </Typography>
      <Typography variant="body2" color="white">
        Pitch: {pitch.toFixed(2)}°
      </Typography>
    </Box>
  );
};
