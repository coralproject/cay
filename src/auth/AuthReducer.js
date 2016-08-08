
/**
 * Import action types
 */

import * as types from 'auth/AuthActions';

/**
 * Initial state
 */

const initialState = {
  loading: false,
  authorized: localStorage.getItem('authorized') === 'true'
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN_INIT:
    return {...state, loading: true};

  case types.LOGIN_SUCCESS:
    return {...state, authorized: true, loading: false};

  case types.LOGIN_FAILURE:
    return {...state, authorized: false, loading: false};

  case types.LOG_OUT:
    return {...state, authorized: false};

  default:
    return state;
  }
};
