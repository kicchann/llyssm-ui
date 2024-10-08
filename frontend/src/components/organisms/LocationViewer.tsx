import React from 'react';
import { GeoLocation } from '../../types/location';
import { useLocationViewerViewModel } from '../../viewModels/LocationViewerViewModel';
import { LocationTooltip } from '../molecules/LocationTooltip';
import { MapContainerWrapper } from '../molecules/MapContainerWrapper';

// TODO: react-leaflet が ECMAScript Modules（ESM）を使用しているのに対して、Jest がデフォルトでそれを処理する設定になっていない。
// そのため、Jest の設定ファイル（jest.config.js）に以下の設定を追加する必要がある。
// 現時点ではこのコンポーネントはテストしないことにした。
export const LocationViewer: React.FC = () => {
  const { userGeoLocation, locationDataList, handlePopupClick } =
    useLocationViewerViewModel();

  const geoLocation: GeoLocation = userGeoLocation || {
    latitude: 35.68111,
    longitude: 139.76667,
  };

  return (
    <MapContainerWrapper
      center={[geoLocation.latitude, geoLocation.longitude]}
      zoom={10}
      mapType="base"
    >
      {locationDataList.map((location) => (
        <LocationTooltip
          key={location.id}
          locationData={location}
          onClick={() => handlePopupClick(location.id)}
        />
      ))}
    </MapContainerWrapper>
  );
};
