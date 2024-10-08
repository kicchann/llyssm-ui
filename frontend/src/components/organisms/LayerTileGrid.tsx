import { Grid2 } from '@mui/material';
import React from 'react';
import { useLayerTileGridViewModel } from '../../viewModels/LayerTileGridViewModel';
import { LayerTile } from '../molecules/LayerTile';

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
          <LayerTile
            id={layer.id}
            name={layer.name}
            imageUrl={layer.imageUrl}
            imageSize={layer.imageSize}
            onClick={handleLayerClick}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
