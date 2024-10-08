import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ViewPageTemplate } from '../templates/ViewPageTemplate';
import { NotFoundPage } from './NotFoundPage';

export const ViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLパラメータからidを取得
  const isDesktop = useMediaQuery('pc');

  useAuthRedirect(); // 認証されていない場合はログインページにリダイレクト

  if (!id) {
    return <NotFoundPage />;
  }

  return <ViewPageTemplate isDesktop={isDesktop} locationId={id} />;
};
