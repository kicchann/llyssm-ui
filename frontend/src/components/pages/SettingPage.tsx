import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuthenticated } from '../../store/slices/viewerSlice';
import { RootState } from '../../store/store';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.viewer.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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
