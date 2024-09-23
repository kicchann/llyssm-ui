import { styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchLayers } from '../../hooks/useFetchLayers';
import { useFetchMarkers } from '../../hooks/useFetchMarkers';
import { useFetchSpheres } from '../../hooks/useFetchSpheres';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { RootState } from '../../store/store';
import { CompactHeader, Header } from '../organisms/HeaderBase';
import { Sidebar } from '../organisms/Sidebar';

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const WholeContent = styled('div')({
  display: 'flex',
  height: '100%',
});

const Content = styled('main')({
  flex: 1,
  display: 'flex',
});

interface ViewPageTemplateProps {
  content: React.ReactNode;
}

export const ViewPageTemplate: React.FC<ViewPageTemplateProps> = ({
  content,
}) => {
  const isMobile = useMediaQuery('mobile');
  const isSidebarOpen = useSelector(
    (state: RootState) => state.viewer.isSidebarOpen
  );

  // カスタムフックの使用
  useFetchLayers(); // 修正箇所
  useFetchSpheres(); // 修正箇所
  useFetchMarkers(); // 修正箇所

  return isMobile ? (
    // スマホの場合
    <Layout>
      <CompactHeader />
      <WholeContent>
        <Content>{content}</Content>
      </WholeContent>
    </Layout>
  ) : (
    // PCの場合
    <Layout>
      <Header />
      <WholeContent>
        {/* サイドバー */}
        {<Sidebar isOpen={isSidebarOpen} />}
        {/* メインコンテンツ */}
        <Content>{content}</Content>
      </WholeContent>
    </Layout>
  );
};
