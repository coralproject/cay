
/**
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'store.js';
import { configXenia } from 'app/AppActions';

import App from 'App';
import 'i18n';
import { init as analyticsInit, logPageView } from 'services/analytics';
import 'services/styles';
import { loadConfig } from 'services/config';

/**
 *  Load config and launch app
 */

loadConfig()
.then(([app, filters]) => {
  const store = configureStore({ app });

  store.dispatch(configXenia());
  store.dispatch({type: 'DATA_CONFIG_LOADED', config: filters});

  analyticsInit(app.googleAnalyticsId);

  const { features } = app;
  ReactDOM.render(
    <App store={store} onLogPageView={logPageView} features={features}
      defaultRoute={getDefaultRoute(features)} />
  , document.getElementById('root'));
});

/**
 * Determine default route based on config
 */

const getDefaultRoute = features => {
  if (features.trust !== false) {
    return 'saved-searches';
  } else if (features.ask) {
    return 'forms';
  } else {
    return '404';
  }
};
