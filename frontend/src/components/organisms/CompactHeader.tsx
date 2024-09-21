import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreMenu } from '../molecules/SettingMenu';
import { LayerMenu } from './LayerMenu';

export const CompactHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/setting');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          View Page
        </Typography>
        <LayerMenu />
        <MoreMenu />
      </Toolbar>
    </AppBar>
  );
};
