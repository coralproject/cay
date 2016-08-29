
/**
 * Module dependencies
 */

import XeniaDriver from 'xenia-driver';

/**
 * Module scope constants
 */

export const CONFIG_ERROR = 'CONFIG_ERROR';


/**
 * Module scope variables
 */

export let xenia;

/**
 * Configure xenia action
 */

export const configXenia = () => (dispatch, getState) => {
  const { app } = getState();
  xenia = XeniaDriver(`${app.xeniaHost}/1.0`, app.basicAuthorization);
};

/**
 * Configuration error action
 */

export const configError = message => ({ type: CONFIG_ERROR, message });
