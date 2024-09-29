import React from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { LocationViewer } from '../organisms/LocationViewer';
import { MapPageTemplate } from '../templates/MapPageTemplate';

export const MapPage: React.FC = () => {
  useAuthRedirect(); // 認証されていない場合はログインページにリダイレクト

  const content = <LocationViewer />;

  return <MapPageTemplate content={content} />;
};
