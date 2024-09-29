// react
import React from 'react';
import styled from 'styled-components';
// components
import { Header } from '../organisms/HeaderBase';
// hooks
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { useFetchUserGeoLocation } from '../../hooks/useFetchUserGeoLocation';

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const Content = styled('main')({
  flex: 1,
  display: 'flex',
});

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
