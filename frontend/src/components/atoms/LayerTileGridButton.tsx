import { GridView } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import React from 'react';

interface LayerTileGridButtonProps {
  onClick?: () => void;
}

const StyledIconButton = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.5);
`;

export const LayerTileGridButton: React.FC<LayerTileGridButtonProps> = ({
  onClick,
}) => {
  return (
    <StyledIconButton onClick={onClick} title="レイヤー一覧">
      <GridView />
    </StyledIconButton>
  );
};
