import * as types from '../actions';

const initialState = {
  authorized: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_INIT:
      return state;
    case types.LOGIN_REQUEST:
      return state;
    case types.LOGIN_SUCCESS:
      return state;
    case types.LOGIN_FAIL:
      return state;
    default:
      return state;
  }
}

export default auth;
