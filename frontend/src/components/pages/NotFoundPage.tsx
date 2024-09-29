import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6" mb={2}>
        お探しのページは見つかりませんでした。
      </Typography>
      <Button onClick={() => navigate('/')} variant="contained" color="primary">
        ホームに戻る
      </Button>
    </Box>
  );
};
