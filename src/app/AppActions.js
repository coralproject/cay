export const CONFIG_ERROR = 'CONFIG_ERROR';

import XeniaDriver from 'xenia-driver';

/* xenia_package */
export const authXenia = (method = 'GET') => {
  // what? window? this is only being used for DataExplorerActions, which needs a refactor
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

export const configXenia = () => {
  return (dispatch, getState) => {
    const app = getState().app;
    xenia = XeniaDriver(app.xeniaHost + '/1.0', app.basicAuthorization);
  };
};

export const configError = (message) => {
  return {type: CONFIG_ERROR, message};
};
