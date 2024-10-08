// react
import React from 'react';
// components
import { PageLayout } from './PageLayout';
// hooks
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { useFetchUserGeoLocation } from '../../hooks/useFetchUserGeoLocation';
import { LocationViewer } from '../organisms/LocationViewer';

export const MapPageTemplate: React.FC = () => {
  useFetchUserGeoLocation();
  useFetchLocations();

  return (
    <PageLayout isDesktop={true}>
      <LocationViewer />
    </PageLayout>
  );
};
