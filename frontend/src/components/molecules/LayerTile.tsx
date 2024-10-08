import { Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import { Label } from '../atoms/Label';

interface LayerTileProps {
  id: string;
  name: string;
  imageUrl: string;
  imageSize: { width: number; height: number };
  onClick: (id: string) => void;
}

export const LayerTile: React.FC<LayerTileProps> = ({
  id,
  name,
  imageUrl,
  imageSize,
  onClick,
}) => {
  return (
    <Card onClick={() => onClick(id)} sx={{ cursor: 'pointer' }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <CardContent>
        <Label text={name} color="black" variant="h6" />
        <Label
          text={`Size: ${imageSize.width}x${imageSize.height}`}
          color="black"
        />
      </CardContent>
    </Card>
  );
};
