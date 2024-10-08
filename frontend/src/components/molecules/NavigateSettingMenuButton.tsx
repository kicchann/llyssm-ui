import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GenericIconButton } from '../atoms/GenericIconButton';

export const NavigateSettingMenuButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/setting');
  };

  return (
    <GenericIconButton
      title="setting"
      onClick={handleSettingsClick}
      iconType="settingMenu"
      dataTestId="navigate-setting-menu-button"
      aria-label="setting"
    />
  );
};
