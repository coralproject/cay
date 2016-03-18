import * as types from 'users/UsersActions';

const initialState = {
  loading: false,
  selectedUser: null
};

const users = (state = initialState, action) => {
  switch (action.type) {

  case types.USER_SELECTED:
    return Object.assign({}, state, {selectedUser: action.user});

  default:
    return state;
  }
};

export default users;
