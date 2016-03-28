export const CONFIG_REQUEST = 'CONFIG_REQUEST';
export const CONFIG_LOADED = 'CONFIG_LOADED';
export const CONFIG_ERROR = 'CONFIG_ERROR';

import XeniaDriver from 'xenia-driver';

export const fetchConfig = () => {
  return (dispatch, getState) => {
    const app = getState().app;
    const requiredKeys = [ 'xeniaHost', 'pillarHost', 'basicAuthorization', 'environment', 'googleAnalyticsId', 'requireLogin' ];

    if (app.loadingConfig || app.configLoaded) return {type: 'NOOP'};

    dispatch({type: CONFIG_REQUEST});

    fetch('/config.json')
      .then(res => res.json())
      .then(config => {

        const allKeysDefined = requiredKeys.every(key => 'undefined' !== typeof config[key]);

        if (!allKeysDefined) {
          throw new Error(`missing required keys on config.json. Must define ${requiredKeys.join('|')}`);
        }

        dispatch({type: CONFIG_LOADED, config});
      }).catch(({message}) => dispatch({type: CONFIG_ERROR, message}));
  };
};

/* xenia_package */
export const authXenia = (method = 'GET') => {
  // what? window? see note in AppActions.js
  const headers = new Headers({'Authorization': window.basicAuthorization});

  const init = {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return init;
};

/* Xenia driver instance */
export let xenia;

export const configXenia = config => {
  xenia = XeniaDriver(config.xeniaHost + '/1.0', config.basicAuthorization);
};
