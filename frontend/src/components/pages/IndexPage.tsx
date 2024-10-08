// src/components/pages/IndexPage.tsx
import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const IndexPage: React.FC = () => {
  return (
    <StyledBox>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Welcome to the App
      </Typography>

      {/* ログインページへのリンク */}
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary">
          ログインページへ
        </Button>
      </Link>
    </StyledBox>
  );
};
