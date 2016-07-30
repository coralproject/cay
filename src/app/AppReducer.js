
/**
 * Module dependencies
 */

import * as types from 'app/AppActions';

/**
 * App reducer
 */

export default (state = {}, action) => {
  switch (action.type) {
  case types.CONFIG_ERROR:
    return { ...state, configErrorMessage: action.message };

  default:
    return state;
  }
};
