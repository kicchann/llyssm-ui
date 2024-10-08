import { styled } from '@mui/material';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

interface MapContainerWrapperProps {
  center: [number, number];
  zoom: number;
  mapType: 'base' | 'google';
  children: React.ReactNode;
}

const mapUrls = {
  base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  google: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
};

// TODO: react-leaflet が ECMAScript Modules（ESM）を使用しているのに対して、Jest がデフォルトでそれを処理する設定になっていない。
// そのため、Jest の設定ファイル（jest.config.js）に以下の設定を追加する必要がある。
// 現時点ではこのコンポーネントはテストしないことにした。
export const MapContainerWrapper: React.FC<MapContainerWrapperProps> = ({
  center,
  zoom,
  mapType,
  children,
}) => {
  return (
    <StyledMapContainer center={center} zoom={zoom}>
      <TileLayer
        url={mapUrls[mapType]}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </StyledMapContainer>
  );
};
