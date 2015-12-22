import * as types from '../actions';

const initialState = {
  loading: false,
  selectedUser: null,
  activeFilter: null,
  userData: {
    lastUpdated: Date.now(),
    isFetching: false,
    didInvalidate: false,
    /* maybe some pagination state like fetchedPageCount & nextPageUrl */
    items: []
  }
};

const users = (state = initialState, action) => {
/*
  switch (action.type) {


    case types.SET_FILTER:
      return Object.assign({}, state, {activeFilter: action.id});
    case types.USERS_REQUEST:
      return state;
    case types.REQUEST_USERS_FAILURE:
      return state;
    case types.RECIEVE_USERS:
      console.log('RECIEVE_USERS', action);
      return Object.assign({}, state, {userData: {items: action.message.results[0].Docs}})
    case types.UNSET_FILTERS:
      return Object.assign({}, state, {activeFilter: null});
    case types.SELECT_USER:
      return Object.assign({}, state, {selectedUser: action.user});
    default:
      console.log('no reducer matches:', action.type);
      return state;
  }
  */

  return state;

};

export default users;
