// src/components/pages/IndexPage.tsx
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const IndexPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Welcome to the App
      </Typography>

      {/* ログインページへのリンク */}
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary">
          ログインページへ
        </Button>
      </Link>
    </Box>
  );
};
