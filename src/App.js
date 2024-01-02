import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ChildAppOne from './components/ChildAppOne';
import ChildAppTwo from './components/ChildAppTwo';

const routeConfig = ROUTE_CONFIG.routes;

const componentMap = {
  'appOne': ChildAppOne,
  'appTwo': ChildAppTwo,
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/app-one">App One</Link>
          <Link to="/app-two">App Two</Link>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.entries(routeConfig).map(([path, appName]) => {
              const Component = componentMap[appName];
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
