import React from 'react';
import { GenericIconButton } from '../atoms/GenericIconButton';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <GenericIconButton
      iconType="close"
      onClick={onClick}
      title="close"
      aria-label="close"
    />
  );
};
