
/**
 * Module dependencies
 */

import XeniaDriver from 'xenia-driver';

/**
 * Module scope constants
 */

export const CONFIG_ERROR = 'CONFIG_ERROR';
export const AUTH_SNACKBAR_DISPLAYED_ONCE = 'AUTH_SNACKBAR_DISPLAYED_ONCE';


/**
 * Module scope variables
 */

export let xenia;

/**
 * Configure xenia action
 */

export const configXenia = () => (dispatch, getState) => {
  const { app } = getState();
  xenia = XeniaDriver(`${app.xeniaHost}/v1`, app.basicAuthorization);
};

/**
 * Configuration error action
 */

export const configError = message => ({ type: CONFIG_ERROR, message });

export const authSnackbarDisplayedOnce = () => ({type: AUTH_SNACKBAR_DISPLAYED_ONCE});
