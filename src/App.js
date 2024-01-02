import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [routeConfig, setRouteConfig] = useState({});
  const [componentMap, setComponentMap] = useState({});

  useEffect(() => {
    console.log('Fetching config from:', process.env.CHILD_CONFIG_URL);

    fetch(process.env.CHILD_CONFIG_URL)
      .then((response) => response.json())
      .then((childConfig) => {
        const dynamicComponents = {};
        Object.keys(childConfig.childApps).forEach((appKey) => {
          console.log('childConfig',childConfig)
          console.log('appKey',appKey)
          dynamicComponents[appKey] = React.lazy(() =>
            import(`./components/${childConfig.childApps[appKey]}`)
          );
        });
        setComponentMap(dynamicComponents);

        fetch(process.env.ROUTE_CONFIG_URL)
          .then((response) => response.json())
          .then((routeData) => {
            console.log('Loaded route config:', routeData.routes);
            setRouteConfig(routeData.routes);
          })
          .catch((error) =>
            console.error("Error fetching route config:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching child app config:", error)
      );
  }, []);

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
              return (
                <Route
                  key={path}
                  path={path}
                  element={Component ? <Component /> : null}
                />
              );
            })}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
