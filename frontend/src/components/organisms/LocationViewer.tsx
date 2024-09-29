import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import { GeoLocation } from '../../types/map';
import { useLocationViewerViewModel } from '../../viewModels/LocationViewerViewModel';
import { LocationTooltip } from '../molecules/LocationTooltip';

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

// Base map tile:
const maps = {
  base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  google: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
};

export const LocationViewer: React.FC = () => {
  const { userGeoLocation, locationDataList, handlePopupClick } =
    useLocationViewerViewModel();

  const geoLocation: GeoLocation = userGeoLocation || {
    latitude: 35.68111,
    longitude: 139.76667,
  };

  return (
    <StyledMapContainer
      center={[geoLocation.latitude, geoLocation.longitude]}
      zoom={10}
    >
      <TileLayer
        url={maps.base}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locationDataList.map((location) => (
        <LocationTooltip
          key={location.id}
          locationData={location}
          onClick={() => handlePopupClick(location.id)}
        />
      ))}
    </StyledMapContainer>
  );
};
