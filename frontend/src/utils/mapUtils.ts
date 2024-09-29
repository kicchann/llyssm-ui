import { default as L } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// カスタムアイコンの定義
const icons: { [key: string]: L.Icon } = {
  //   default: Leaflet.Marker.prototype.options.icon,
  default: new L.Icon({
    iconUrl: '/images/marker-icon.png',
    popupAnchor: [12, 0],
  }),
  house: new L.Icon({
    iconUrl: '/images/ie-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, -16],
    popupAnchor: [0, 16],
  }),
  // 他のアイコンもここに追加できます
};

export const getLocationIcon = (iconType: string): L.Icon => {
  return icons[iconType] || icons.default;
};
