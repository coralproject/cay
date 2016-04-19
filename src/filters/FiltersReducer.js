import _ from 'lodash';
import * as types from 'filters/FiltersActions';

let initialState = {
  configLoaded: false,
  tags: [],
  authors: [],
  sections: [],
  loadingFilters: false,
  loadingUserList: false,
  loadingAuthors: false,
  loadingSections: false,
  'user_name': null,
  'status': null,
  'last_login': null,
  'member_since': null,
  breakdown: 'all',
  counter: 0, // this is a signal for ajax consumed by userFilters
  specificBreakdown: '',
  distributions: null
};

const filters = (state = initialState, action) => {
  switch (action.type) {

  // this should run before any ReactDOM stuff happens
  case types.DATA_CONFIG_LOADED:

    const filterList = [];
    const filters = action.config.filters.reduce((accum, filter, i) => {

      const key = `filter${i}`;
      accum[key] = Object.assign({}, filter, {min: null, max: null, userMin: null, userMax: null, key});

      filterList.push(key);

      return accum;
    }, {});

    return {...state, ...filters, filterList, configLoaded: true};

    // return Object.assign({}, state, filters, {filterList}, {configLoaded: true});

  case types.FILTER_CHANGED:

    const oldFilter = state[action.fieldName];
    const newFilter = {...oldFilter, ...action.data};

    return {...state, [action.fieldName]: newFilter, counter: action.counter};

  case types.REQUEST_ALL_TAGS:
    return {...state, loadingTags: true};

  case types.RECEIVE_ALL_TAGS:
    return {...state, loadingTags: false, tags: action.tags};

  case types.ALL_TAGS_REQUEST_ERROR:
    return {...state, loadingTags: false, tagError: `Failed to load tags ${action.err}`};

  case types.REQUEST_SECTIONS:
    return {...state, loadingSections: true};

  case types.RECEIVE_SECTIONS:
    return {...state, sections: action.data.results[0].Docs };

  case types.REQUEST_AUTHORS:
    return {...state, loadingAuthors: true};

  case types.RECEIVE_AUTHORS:
    return {...state, loadingAuthors: false, authors: action.data.results[0].Docs };

  case types.QUERYSET_RECEIVED:
    return {...state, loadingUserList: false };

  case types.SET_BREAKDOWN:
    return {...state, breakdown: action.breakdown};

  case types.FETCH_DISTRIBUTIONS_SUCCESS:
    return {...state, distributions: action.distros};

  case types.SET_SPECIFIC_BREAKDOWN:
    return {...state, specificBreakdown: action.specificBreakdown};

  case types.RECEIVE_FILTER_RANGES:

    const newFilters = _.reduce(action.data, (accum, filter, key) => {
      accum[key] = Object.assign({}, state[key], action.data[key]);
      return accum;
    }, {});

    return {...state, ...newFilters, counter: action.counter};

  default:
    return state;

  }
};

export default filters;
