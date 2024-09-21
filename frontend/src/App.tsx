import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider のインポート
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes/routes';
import store from './store/store'; // Redux ストアのインポート

const App: React.FC = () => {
  return (
    // Redux の Provider でアプリ全体をラップ
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
