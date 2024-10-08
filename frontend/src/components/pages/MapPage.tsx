import React from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { MapPageTemplate } from '../templates/MapPageTemplate';

export const MapPage: React.FC = () => {
  useAuthRedirect(); // 認証されていない場合はログインページにリダイレクト

  return <MapPageTemplate />;
};
