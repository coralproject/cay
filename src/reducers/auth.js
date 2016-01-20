import * as types from '../actions';

const initialState = {
  authorized: window.localStorage.token !== undefined,
  token: window.localStorage.token || null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN_INIT:
    location.href = action.url;
    return state;
  case types.LOGIN_REQUEST:
    return state;
  case types.LOGIN_SUCCESS:
    window.localStorage.token = action.token; // probably bad.
    return Object.assign({}, state, {authorized: true, token: action.token});
  case types.LOGIN_FAIL:
    return state;
  default:
    return state;
  }
};

export default auth;
