import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [routeConfig, setRouteConfig] = useState({});
  const [componentMap, setComponentMap] = useState({});

  const loadComponent = (scope, module, url) => {
    return async () => {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      await __webpack_init_sharing__("default");
      const container = window[scope];
      if (!container) {
        throw new Error(`Cannot find module federation scope: ${scope}`);
      }
      await container.init(__webpack_share_scopes__.default);
      const factory = await container.get(module);
      return factory();
    };
  };

  useEffect(() => {
    fetch(process.env.CHILD_CONFIG_URL)
      .then((response) => response.json())
      .then((childConfig) => {
        const dynamicComponents = {};
        Object.keys(childConfig.childApps).forEach((appKey) => {
          const config = childConfig.childApps[appKey];
          dynamicComponents[appKey] = React.lazy(
            loadComponent(config.scope, config.module, config.url)
          );
        });
        setComponentMap(dynamicComponents);

        fetch(process.env.ROUTE_CONFIG_URL)
          .then((response) => response.json())
          .then((routeData) => {
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
