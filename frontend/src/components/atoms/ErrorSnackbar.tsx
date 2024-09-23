import { Alert, Snackbar } from '@mui/material';
import React from 'react';

// TODO: このコンポーネントは、エラーメッセージを表示するSnackbarです。
// TODO: あとで実装します。

interface ErrorSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};
