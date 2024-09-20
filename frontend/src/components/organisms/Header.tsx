import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
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
        <Button color="inherit" onClick={handleSettingsClick}>
          設定
        </Button>
      </Toolbar>
    </AppBar>
  );
};
