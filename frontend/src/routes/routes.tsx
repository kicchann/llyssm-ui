import { IndexPage } from '../components/pages/IndexPage';
import { LoginPage } from '../components/pages/LoginPage';
import { MapPage } from '../components/pages/MapPage';
import { SettingPage } from '../components/pages/SettingPage';
import { ViewPage } from '../components/pages/ViewPage';

export const routes = [
  { path: '/', element: <IndexPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/map', element: <MapPage /> },
  { path: '/view', element: <ViewPage /> },
  { path: '/setting', element: <SettingPage /> },
];
