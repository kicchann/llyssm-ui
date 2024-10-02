import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import React from 'react';

interface ToggleSidebarButtonProps {
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const StyledIconButton = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.5);
`;

export const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({
  isSidebarOpen,
  onToggle,
}) => {
  return (
    <StyledIconButton
      onClick={onToggle}
      title={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
    >
      {isSidebarOpen ? (
        <KeyboardDoubleArrowLeft />
      ) : (
        <KeyboardDoubleArrowRight />
      )}
    </StyledIconButton>
  );
};
