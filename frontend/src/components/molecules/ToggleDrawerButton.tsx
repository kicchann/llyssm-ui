import React from 'react';
import { GenericIconButton } from '../atoms/GenericIconButton';

interface ToggleDrawerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ToggleDrawerButton: React.FC<ToggleDrawerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <GenericIconButton
      title={isOpen ? 'close drawer' : 'open drawer'}
      onClick={onToggle}
      iconType={isOpen ? 'closeDrawer' : 'openDrawer'}
      dataTestId="toggle-drawer-button"
      aria-label={isOpen ? 'close drawer' : 'open drawer'}
    />
  );
};
