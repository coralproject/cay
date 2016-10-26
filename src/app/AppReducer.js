
/**
 * Module dependencies
 */

import * as types from 'app/AppActions';

/**
 * App reducer
 */

const initialState = {authSnackbarDisplayedOnce: false};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CONFIG_ERROR:
    return { ...state, configErrorMessage: action.message };

  case types.AUTH_SNACKBAR_DISPLAYED_ONCE:
    return {...state, authSnackbarDisplayedOnce: true};

  default:
    return state;
  }
};
