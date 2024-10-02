// react
import { styled } from '@mui/material';
import React from 'react';
// components
import { Header } from '../organisms/HeaderBase';
// hooks
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { useFetchUserGeoLocation } from '../../hooks/useFetchUserGeoLocation';

const Layout = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled('main')`
  flex: 1;
  display: flex;
`;

interface MapPageTemplateProps {
  content: React.ReactNode;
}

export const MapPageTemplate: React.FC<MapPageTemplateProps> = ({
  content,
}) => {
  useFetchUserGeoLocation();
  useFetchLocations();

  return (
    <Layout>
      <Header />
      <Content>{content}</Content>
    </Layout>
  );
};
