import _ from 'lodash';

export const CONFIG_REQUEST = 'CONFIG_REQUEST';
export const CONFIG_LOADED = 'CONFIG_LOADED';
export const CONFIG_ERROR = 'CONFIG_ERROR';

export const fetchConfig = () => {
  return (dispatch, getState) => {
    const app = getState().app;
    const requiredKeys = [ 'xeniaHost', 'pillarHost', 'basicAuthorization', 'environment', 'googleAnalyticsId', 'requireLogin' ];

    if (app.loadingConfig || app.configLoaded) return {type: 'NOOP'};

    dispatch({type: CONFIG_REQUEST});

    fetch('/config.json')
      .then(res => res.json())
      .then(config => {

        const allKeys = _.map(requiredKeys, key => {
          return !_.isUndefined(config[key]);
        });

        if (!_.every(allKeys)) {
          throw new Error(`missing required keys on confgi.json. Must define ${requiredKeys.join('|')}`);
        }

        dispatch({type: CONFIG_LOADED, config});
      }).catch(err => {
        return dispatch({type: CONFIG_ERROR, message: err.message});
      });
  };
};

/* xenia_package */
export const authXenia = (method) => {
  // what? window? see note in AppActions.js
  const headers = new Headers({'Authorization': window.basicAuthorization});

  const init = {
    method: method || 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return init;
};
