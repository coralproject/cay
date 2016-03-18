import * as types from 'users/UsersActions';

const initialState = {
  loading: false,
  selectedUser: null
};

const users = (state = initialState, action) => {
  switch (action.type) {

  case types.USER_SELECTED:
    console.log('UsersReducer USER_SELECTED', action.user);
    return Object.assign({}, state, {selectedUser: action.user});

  default:
    return state;
  }
};

export default users;
