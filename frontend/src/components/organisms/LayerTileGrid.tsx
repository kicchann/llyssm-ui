import { Card, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import React from 'react';
import { useLayerTileGridViewModel } from '../../viewModels/LayerTileGridViewModel';

export const LayerTileGrid: React.FC = () => {
  const { layerDataList, handleLayerClick } = useLayerTileGridViewModel();
  return (
    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      padding={2}
    >
      {layerDataList.map((layer) => (
        <Grid2 key={layer.id}>
          <Card
            onClick={() => handleLayerClick(layer.id)}
            sx={{ cursor: 'pointer' }}
          >
            <CardMedia
              component="img"
              height="140"
              image={layer.imageUrl} // imageUrlを表示
              alt={layer.name}
            />
            <CardContent>
              <Typography variant="h6">{layer.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {`Size: ${layer.imageSize.width}x${layer.imageSize.height}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};
