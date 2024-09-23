import styled from '@emotion/styled';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

interface ToggleSidebarButtonProps {
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
});

export const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({
  isSidebarOpen,
  onToggle,
}) => {
  return (
    <StyledIconButton onClick={onToggle}>
      {isSidebarOpen ? (
        <KeyboardDoubleArrowLeft />
      ) : (
        <KeyboardDoubleArrowRight />
      )}
    </StyledIconButton>
  );
};
