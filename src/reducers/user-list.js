import * as types from '../actions';

const initialState = {
  loading: false,
  loadingFilterId: null,
  loadedFilterId: null,
  users: []
};

const userList = (state = initialState, action) => {

  console.log('userList', action);

  switch (action.type) {
    case types.SET_FILTER:
      return Object.assign({}, state, {activeFilter: action.id});

    case types.USERS_REQUEST:
      return Object.assign({}, state, {loading: true, loadingFilterId: action.filterId});

    case types.REQUEST_USERS_FAILURE:
      return Object.assign({}, state, {loading: false, loadingFilterId: null, showTheError: 'TODO'});

    case types.RECIEVE_USERS:
      return Object.assign({}, state, 
          {
            loading: false,
            loadingFilterId: null, 
            loadedFilterId: state.loadingFilterId, 
            users: action.message.results[0].Docs
          }
        );

    case types.UNSET_FILTERS:
      return Object.assign({}, state, {activeFilter: null});

    case types.SELECT_USER:
      return Object.assign({}, state, {selectedUser: action.user});

    default:
      console.log('no reducer matches:', action.type);
      return state;
  }
}

export default userList;
