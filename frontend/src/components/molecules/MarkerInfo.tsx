// src/components/atoms/MarkerInfo.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';

interface MarkerInfoProps {
  name: string;
  description: string;
  imageUrl: string;
}

export const MarkerInfo: React.FC<MarkerInfoProps> = ({
  name,
  description,
  imageUrl,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        width: '200px',
        color: 'white',
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: '100%', marginTop: '10px' }}
        />
      )}
    </Box>
  );
};
