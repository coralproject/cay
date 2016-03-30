import * as types from 'groups/GroupActions';

const initialState = {
  authorized: localStorage.authorized || false,
  loading: false,
  loadingQueryset: false,
  querysets: [],
  users: [],
  groups: []
};

const groups = (state = initialState, action) => {

  switch (action.type) {

  case types.QUERYSETS_REQUEST:
    return {...state, loading: true};

  case types.QUERYSETS_REQUEST_FAILURE:
    return {
      ...state,
      loading: false,
      showTheError: 'failed to load querysets from server'
    };

  case types.QUERYSET_REQUEST_FAILURE:
    return {
      ...state,
      loadingQueryset: false,
      showTheError: `failed to load ${action.querysetName}`
    };

  case types.QUERYSETS_RECEIVED:
    return Object.assign({}, state,
      {
        loading: false,
        // this probably isn't the final way to do this.
        // queries will eventually be length > 1
        groups: action.querysets,
        querysets: action.querysets.filter(qs => {
          return qs.queries[0].collection === 'user_statistics' && qs.name !== 'user_search';
        })
      }
    );

  case types.QUERYSET_SELECTED:
    return state;

  case types.QUERYSET_REQUEST:
    return {...state, loadingQueryset: true}; // query one query_set?

  // query_set executed. receive a list of users.
  case types.QUERYSET_RECEIVED:

    return {...state, loadingQueryset: false, users: action.data.results[0].Docs};

  case types.LOGIN_SUCCESS:
    return {...state, authorized: true};

  case types.LOGGED_OUT:
    return {...state, authorized: false};

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default groups;
