import * as types from '../actions';

let initialState = {
  tags: [],
  authors: [],
  sections: [],
  loadingUserList: false,
  loadingAuthors: false,
  loadingSections: false,
  'user_name': null,
  'status': null,
  'last_login': null,
  'member_since': null,
  breakdown: 'all',
  counter: 0,
  specificBreakdown: ''
  // 'stats.accept_ratio': {userMin: 0, userMax: 1},
  // 'stats.replies_per_comment': {userMin: 0, userMax: 1},
  // 'stats.comments.total': {userMin: 0, userMax: 10000},
  // 'stats.replies': {userMin: 0, userMax: 1000}
};

const filters = (state = initialState, action) => {
  switch (action.type) {

  case types.DATA_CONFIG_LOADED:
    const filters = action.config.filters.reduce((accum, filter) => {
      accum[filter.field] = filter;
      accum[filter.field].userMin = filter.min;
      accum[filter.field].userMax = filter.max;
      return accum;
    }, {});
    return Object.assign({}, state, filters);

  case types.CREATE_QUERY:
    return Object.assign({}, state, {loadingUserList: true});

  case types.RECEIVE_USER_LIST:
    console.log(action);
    return Object.assign({}, state, {loadingUserList: false});

  case types.FILTER_CHANGED:
    console.log(state.counter, state.counter++);
    return Object.assign({}, state, { [action.fieldName]: action.data, counter: state.counter++ });

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.ALL_TAGS_REQUEST_ERROR:
    return Object.assign({}, state, {loadingTags: false, tagError: 'Failed to load tags ' + action.err});

  case types.REQUEST_SECTIONS:
    return Object.assign({}, state, {loadingSections: true});

  case types.RECEIVE_SECTIONS:
    console.log('filters reducer', action);
    return Object.assign({}, state, { sections: action.data.results[0].Docs });

  case types.REQUEST_AUTHORS:
    return Object.assign({}, state, {loadingAuthors: true});

  case types.RECEIVE_AUTHORS:
    return Object.assign({}, state, {
      loadingAuthors: false,
      authors: action.data.results[0].Docs
    });

  case types.PIPELINE_RECEIVED:
    return Object.assign({}, state, { loadingUserList: false });

  case types.SET_BREAKDOWN:
    return Object.assign({}, state, {breakdown: action.breakdown, counter: state.counter++});

  case types.SET_SPECIFIC_BREAKDOWN:
    return Object.assign({}, state, {specificBreakdown: action.specificBreakdown, counter: state.counter++});

  default:
    return state;

  }
};

export default filters;
