import React from 'react';
import { GenericIconButton } from '../atoms/GenericIconButton';

interface LayerTileGridButtonProps {
  onClick?: () => void;
}

export const ShowLayerTileGridButton: React.FC<LayerTileGridButtonProps> = ({
  onClick,
}) => {
  return (
    <GenericIconButton
      title="show layer tile grid"
      onClick={onClick ? onClick : () => {}}
      iconType="layerTileGrid"
      dataTestId="show-layer-tile-grid-button"
      aria-label="show layer tile grid"
    />
  );
};
