import * as types from '../actions';

const initialState = {
  authorized: localStorage.authorized || false,
  loading: false,
  loadingQueryset: false,
  loadingTags: false,
  pipesLoaded: false,
  selectedUser: null,
  querysets: [],
  users: [],
  comments: [],
  groups: [],
  tags: [],
  userDetailComments: null,
  loadingUserComments: false
};

const groups = (state = initialState, action) => {

  switch (action.type) {

  case types.QUERYSETS_REQUEST:
    return Object.assign({}, state, {loading: true});

  case types.QUERYSETS_REQUEST_FAILURE:
    return Object.assign({}, state, {loading: false, showTheError: 'failed to load querysets from server'});

  case types.QUERYSET_REQUEST_FAILURE:
    return Object.assign({}, state, {loadingQueryset: false, showTheError: 'failed to load ' + action.querysetName});

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.QUERYSETS_RECEIVED:
    console.log('QUERYSETS_RECEIVED', action);
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
    return Object.assign({}, state, {loadingQueryset: true}); // query one query_set?

  // query_set executed. receive a list of users.
  case types.QUERYSET_RECEIVED:

    return Object.assign({}, state, { loadingQueryset: false, users: action.data.results[0].Docs});

  case types.USER_SELECTED:
    return Object.assign({}, state, {selectedUser: action.user});

  case types.COMMENTS_REQUEST:
    return Object.assign({}, state, {loadingUserComments: true});

  case types.COMMENTS_SUCCESS:
    return Object.assign(
      {},
      state,
      {
        loadingUserComments: false,
        userDetailComments: action.data.results[0].Docs
      }
    );

  case types.CLEAR_USER_DETAIL_COMMENTS:
    return Object.assign({}, state, {userDetailComments: null});

  case types.LOGIN_SUCCESS:
    return Object.assign({}, state, {authorized: true});

  case types.LOGGED_OUT:
    return Object.assign({}, state, {authorized: false});

  case types.REQUEST_ALL_TAGS_USER_DETAIL:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS_USER_DETAIL:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.ALL_TAGS_REQUEST_ERROR_USER_DETAIL:
    return Object.assign({}, state, {loadingTags: false, tagError: 'Failed to load tags ' + action.err});

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default groups;
