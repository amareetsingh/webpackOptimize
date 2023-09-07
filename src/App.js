import React, { useEffect, Suspense } from "react";
import Loader from "./Components/Loader.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "./Config/routes.js";
import { AuthProvider } from "./Context";
import AppRoute from "./Components/AppRoute";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
// import ReactGA from 'react-ga';
//import gtag from 'ga-gtag';
//import { GOOGLE_ANALYTICS_TAG, GOOGLE_TAG_MANAGER } from './Components/API.js';
// ReactGA.initialize(GOOGLE_ANALYTICS_TAG);

function App() {
  const LoadingFallback = () => <><Loader/></>;
  useEffect(() => {
    /*if (GOOGLE_ANALYTICS_TAG) {
		window.dataLayer = window.dataLayer || [];
		function gtag(){window.dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-F2TBJDS3XT');
	
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=G-F2TBJDS3XT`;
		script.async = true;
		document.body.appendChild(script);
	}*/
    //ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route
              exact
              path="/login-redirect"
              render={() => <Redirect to="/dashboard" />}
            />
            {routes.map((route) => (
              <AppRoute
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
