// /workspaces/malaspherer-ui/frontend/src/components/pages/LoginPage.tsx
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuthenticated } from '../../store/slices/viewerSlice';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email && password) {
      // とりあえず簡単なバリデーションを行う
      if (email.includes('@') && password.length > 5) {
        // ログイン成功 (トイモデルなので何もしない)
        setError('');
        dispatch(setIsAuthenticated(true));
        navigate('/view'); // ログイン成功後、viewページへ移動
      } else {
        setError('無効なメールアドレスまたはパスワードです。');
      }
    } else {
      setError('メールアドレスとパスワードを入力してください。');
    }
  };

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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        ログイン
      </Typography>
      <TextField
        label="メールアドレス"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2, width: '300px' }}
      />
      <TextField
        label="パスワード"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2, width: '300px' }}
      />
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        ログイン
      </Button>
    </Box>
  );
};
