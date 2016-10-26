
/**
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getStore, {userManager} from 'store';
import { configXenia } from 'app/AppActions';
import { userFound } from 'redux-oidc';

import App from 'App';
import 'i18n';
import { init as analyticsInit, logPageView } from 'services/analytics';
import 'services/styles';
import { loadConfig } from 'services/config';
// import {Oidc} from 'oidc-client';
import { FILTERS_CONFIG_LOADED } from 'filters/FiltersActions';

// Oidc.Log.logger = window.console;

/**
 *  Load config and launch app
 */

loadConfig()
.then(([app, filters]) => {
  getStore({app}).then(([store, user]) => {

    if (user) {
      // I don't know if this is strictly necessary
      // I want to force the user into the state if it's there.
      store.dispatch(userFound(user));
    }

    store.dispatch(configXenia());
    if (app.features.trust === true) {
      store.dispatch({type: FILTERS_CONFIG_LOADED, config: filters});
    }

    analyticsInit(app.googleAnalyticsId);

    const { features } = app;
    ReactDOM.render(
      <App store={store} onLogPageView={logPageView} features={features} userManager={userManager}
        defaultRoute={getDefaultRoute(features)} />
    , document.getElementById('root'));
  });
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
