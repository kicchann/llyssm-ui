import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.status.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

/// そのうち実装します
