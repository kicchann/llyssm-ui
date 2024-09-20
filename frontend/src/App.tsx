import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider のインポート
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { IndexPage } from './components/pages/IndexPage';
import { LoginPage } from './components/pages/LoginPage';
import { MapPage } from './components/pages/MapPage';
import { SettingPage } from './components/pages/SettingPage';
import { ViewPage } from './components/pages/ViewPage';
import store from './store/store'; // Redux ストアのインポート

const App: React.FC = () => {
  return (
    // Redux の Provider でアプリ全体をラップ
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/subscription" element={<h1>Subscription Page</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
