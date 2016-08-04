import * as types from 'auth/AuthActions';

const initialState = {
  loading: false,
  authorized: localStorage.getItem('authorized') === 'true'
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN_INIT:
    return {...state, loading: true};

  case types.LOGIN_SUCCESS:
    return {...state, authorized: true, loading: false};

  case types.LOGIN_FAILURE:
    return {...state, authorized: false, loading: false};

  case types.LOGGED_OUT:
    return {...state, authorized: false};

  default:
    return state;
  }
};

export default auth;
