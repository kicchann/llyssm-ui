import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MoreMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/setting');
  };

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleSettingsClick}
    >
      <MoreVert />
    </IconButton>
  );
};
