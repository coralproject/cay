import * as types from '../actions';

const initialState = {
  loading: false,
  message: 'It works',
  userVisible: true
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALL:
      return Object.assign({}, state, {userVisible: true});
    case types.HIDE_ALL:
      return Object.assign({}, state, {userVisible: false});
    default:
      return state;
  }
}

export default user;
