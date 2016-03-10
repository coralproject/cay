import _ from 'lodash';
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

  case types.PIPELINE_RECEIVED:
    return Object.assign({}, state, { loadingUserList: false });

  case types.SET_BREAKDOWN:
    return Object.assign({}, state, {breakdown: action.breakdown});

  case types.SET_SPECIFIC_BREAKDOWN:
    return Object.assign({}, state, {specificBreakdown: action.specificBreakdown, counter: action.counter});

  case types.RECEIVE_FILTER_RANGES:
    const ranges = action.data.results[0].Docs[0];

    const newFilters = _.reduce(ranges, (accum, value, aggKey) => {
      let [key, field] = aggKey.split('_');

      if (field === 'id' || value === null) return accum;

      // we might have already updated the old filter with the min value
      // retrieve it from the accumulator in progress instead of the state
      let newFilter = _.has(accum, key) ? accum[key] : _.cloneDeep(state[key]);
      newFilter[field] = value; // where field is {min|max}
      accum[key] = newFilter;

      // on the first pass, go ahead and force a change on userMin and userMax
      if (field === 'min' && _.isNull(newFilter.userMin)) {
        newFilter.userMin = value;
      } else if (field === 'max' && _.isNull(newFilter.userMax)) {
        newFilter.userMax = value;
      }

      return accum;
    }, {});

    // _.each(newFilters, f => {
    //
    //   f.userMin = Math.min(Math.max(f.userMin, f.min), f.max);
    //   f.userMax = Math.min(Math.max(f.userMax, f.min), f.max);
    // });

    return Object.assign({}, state, newFilters);

  default:
    return state;

  }
};

export default filters;
