import { styled } from '@mui/material';
import React from 'react';
import { CompactHeader, Header } from '../organisms/HeaderBase';

interface PageLayoutProps {
  isDesktop: boolean;
  children: React.ReactNode;
}

const Layout = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled('main')`
  display: flex;
  flex: 1;
`;

export const PageLayout: React.FC<PageLayoutProps> = ({
  isDesktop,
  children,
}) => {
  return (
    <Layout>
      {isDesktop ? <Header /> : <CompactHeader />}
      <Content>{children}</Content>
    </Layout>
  );
};
