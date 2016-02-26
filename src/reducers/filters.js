import * as types from '../actions';

const initialState = {
  tags: [],
  authors: [],
  sections: [],
  loadingUserList: false,
  'user_name': null,
  'status': null,
  'last_login': null,
  'member_since': null,
  'stats.accept_ratio': {userMin: 0, userMax: 1},
  'stats.replies_per_comment': {userMin: 0, userMax: 1},
  'stats.comments.total': {userMin: 0, userMax: 10000},
  'stats.replies': {userMin: 0, userMax: 1000}
};

const filters = (state = initialState, action) => {
  switch (action.type) {

  case types.CREATE_QUERY:
    return Object.assign({}, state, {loadingUserList: true});

  case types.RECEIVE_USER_LIST:
    console.log(action);
    return Object.assign({}, state, {loadingUserList: false});

  case types.FILTER_CHANGED:
    return Object.assign({}, state, { [action.fieldName]: action.data });

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.ALL_TAGS_REQUEST_ERROR:
    return Object.assign({}, state, {loadingTags: false, tagError: 'Failed to load tags ' + action.err});

  case types.RECEIVE_AUTHORS_AND_SECTIONS:
    return Object.assign({}, state, {
      sections: Object.keys(action.data.results[0].Docs[0].data.sections),
      authors: Object.keys(action.data.results[0].Docs[0].data.authors)
    });

  default:
    return state;

  }
};

export default filters;
