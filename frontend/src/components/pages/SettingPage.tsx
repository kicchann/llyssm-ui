import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { setIsAuthenticated } from '../../store/slices/statusSlice';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();

  useAuthRedirect(); // 認証されていない場合はログインページにリダイレクト

  const handleLogout = () => {
    dispatch(setIsAuthenticated(false)); // ログアウト
  };

  return (
    <StyledBox>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        設定ページ
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        ログアウト
      </Button>
    </StyledBox>
  );
};
