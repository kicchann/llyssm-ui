import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LocationData } from '../../types/map';
import { getLocationIcon } from '../../utils/mapUtils';

interface LocationTooltipProps {
  locationData: LocationData;
  onClick: (event: React.MouseEvent, itemId: string) => void;
}

export const LocationTooltip: React.FC<LocationTooltipProps> = ({
  locationData: data,
  onClick: onPopupClick,
}) => {
  return (
    <Marker
      position={[data.geoLocation.latitude, data.geoLocation.longitude]}
      icon={getLocationIcon(data.iconType)}
    >
      <Popup>
        <Box onClick={(event) => onPopupClick(event, data.id)}>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <p>クリックで詳細ページへ</p>
        </Box>
      </Popup>
    </Marker>
  );
};
