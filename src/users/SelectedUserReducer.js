import * as types from '../actions';

const initialState = {
  loading: false,
  user: null,
  comments: null
};

const selectedUser = (state = initialState, action) => {
  switch (action.type) {
    case types.:
      return state;

    case types.REQUEST_USER:
      return Object.assign({}, state, {loading: true});

    case types.USER_SUCCESS:
      return Object.assign({}, state, {items: action.data.results[0].Docs});

    case types.USER_FAIL:
      return Object.assign({}, state, {items: []});

    default:
      return state;
  }
}

export default selectedUser;
