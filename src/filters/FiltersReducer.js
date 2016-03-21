import * as types from 'filters/FiltersActions';

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
  counter: 0, // this is a signal for ajax consumed by userFilters
  specificBreakdown: ''
  // 'stats.accept_ratio': {userMin: 0, userMax: 1},
  // 'stats.replies_per_comment': {userMin: 0, userMax: 1},
  // 'stats.comments.total': {userMin: 0, userMax: 10000},
  // 'stats.replies': {userMin: 0, userMax: 1000}
};

const filters = (state = initialState, action) => {
  switch (action.type) {

  // this should run before any ReactDOM stuff happens
  case types.DATA_CONFIG_LOADED:

    console.log("--------------------DATA_CONFIG_LOADED-----------------\n\n\n", action);

    const filterList = [];
    const filters = action.config.filters.reduce((accum, filter) => {

      const key = Math.random().toString().slice(2, 18);
      accum[key] = Object.assign({}, filter, {min: null, max: null, userMin: null, userMax: null, key});

      filterList.push(key);

      return accum;
    }, {});

    return Object.assign({}, state, filters, {filterList});

  case types.CREATE_QUERY:
    return Object.assign({}, state, {loadingUserList: true});

  case types.RECEIVE_USER_LIST:
    return Object.assign({}, state, {loadingUserList: false});

  case types.FILTER_CHANGED:

    const oldFilter = state[action.fieldName];
    const newFilter = Object.assign({}, oldFilter, action.data);
    return Object.assign({}, state, { [action.fieldName]: newFilter, counter: action.counter });

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.ALL_TAGS_REQUEST_ERROR:
    return Object.assign({}, state, {loadingTags: false, tagError: 'Failed to load tags ' + action.err});

  case types.REQUEST_SECTIONS:
    return Object.assign({}, state, {loadingSections: true});

  case types.RECEIVE_SECTIONS:
    return Object.assign({}, state, { sections: action.data.results[0].Docs });

  case types.REQUEST_AUTHORS:
    return Object.assign({}, state, {loadingAuthors: true});

  case types.RECEIVE_AUTHORS:
    return Object.assign({}, state, {
      loadingAuthors: false,
      authors: action.data.results[0].Docs
    });

  case types.QUERYSET_RECEIVED:
    return Object.assign({}, state, { loadingUserList: false });

  case types.SET_BREAKDOWN:
    return Object.assign({}, state, {breakdown: action.breakdown});

  case types.SET_SPECIFIC_BREAKDOWN:
    return Object.assign({}, state, {specificBreakdown: action.specificBreakdown, counter: action.counter});

  case types.RECEIVE_FILTER_RANGES:

    console.log('FiltersReducer.RECEIVE_FILTER_RANGES', action.data);

    // const newFilters = Object.keys(action.data).map(key => {
    //   return Object.assign({}, state[key], action.data[key]);
    // });
    //
    // console.log('newFilters', newFilters);

    return Object.assign({}, state, ...action.data);

  default:
    return state;

  }
};

export default filters;
