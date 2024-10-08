import React from 'react';
import { GenericIconButton } from '../atoms/GenericIconButton';

interface ToggleSidebarButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <GenericIconButton
      iconType={isOpen ? 'closeSidebar' : 'openSidebar'}
      onClick={onToggle}
      dataTestId="toggle-sidebar-button"
      title={isOpen ? 'close sidebar' : 'open sidebar'}
      aria-label={isOpen ? 'close sidebar' : 'open sidebar'}
    />
  );
};
