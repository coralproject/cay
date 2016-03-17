import * as types from '../actions';

const initialState = {
  loading: false,
  authorized: window.localStorage.authorized || null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN_INIT:
    return Object.assign({}, state, {loading: true});

  case types.LOGIN_SUCCESS:
    return Object.assign({}, state, {authorized: true, loading: false});

  case types.LOGIN_FAILURE:
    return Object.assign({}, state, {authorized: false, loading: false});

  case types.LOGGED_OUT:
    return Object.assign({}, state, {authorized: false});

  default:
    return state;
  }
};

export default auth;
