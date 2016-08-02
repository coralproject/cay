
/**
 * Module dependencies
 */

import reduce from 'lodash/collection/reduce';

/**
 * Import action names
 */

import * as filterTypes from 'filters/FiltersActions';
import * as searchTypes from 'search/SearchActions';
const types = {...filterTypes, ...searchTypes};

/**
 * Initial state
 */

let initialState = {
  configLoaded: false,
  tags: [],
  authors: [],
  sections: [],
  filterList: [],
  editFilterList: [],
  loadingUserList: false,
  loadingAuthors: false,
  loadingSections: false,
  filterRangesLoaded: false, // naive, this just cleans up the console.log statement in UserFilters
  breakdown: 'all',
  breakdownEdit: 'all',
  counter: 0, // this is a signal for ajax consumed by userFilters
  specificBreakdown: '',
  specificBreakdownEdit: '',
  distributions: null,
  sortBy: null
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
  switch (action.type) {

  case types.FILTERS_CONFIG_LOADED:
    const [filters, filterList, editFilterList ] = getFiltersFromConfig(action.config.filters);
    return {...state, ...filters, filterList, editFilterList, configLoaded: true};

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

  case types.FETCH_SECTIONS_REQUEST:
    return {...state, loadingSections: true};

  case types.FETCH_SECTIONS_SUCCESS:
    return {...state, sections: action.data.results[0].Docs };

  case types.FETCH_AUTHORS_REQUEST:
    return {...state, loadingAuthors: true};

  case types.FETCH_AUTHORS_SUCCESS:
    return {...state, loadingAuthors: false, authors: action.data.results[0].Docs };

  case types.QUERYSET_RECEIVED:
    return {...state, loadingUserList: false };

  case types.SET_BREAKDOWN:
    return {...state, breakdown: action.breakdown};

  case types.SET_BREAKDOWN_EDIT:
    return {...state, breakdownEdit: action.breakdown};

  case types.SET_SPECIFIC_BREAKDOWN:
    return {...state, specificBreakdown: action.specificBreakdown};

  case types.SET_SPECIFIC_BREAKDOWN_EDIT:
    return {...state, specificBreakdownEdit: action.specificBreakdown};


  case types.FETCH_DISTRIBUTIONS_SUCCESS:
    return {...state, distributions: action.distros};

  case types.FETCH_FILTER_RANGES_SUCCESS:
    const newFilters = reduce(action.data, (accum, filter, key) => {
      accum[key] = Object.assign({}, state[key], action.data[key]);
      return accum;
    }, {});

    return {...state, ...newFilters, counter: action.counter, filterRangesLoaded: true};

  // this is really more of a soft reset, since we're not resetting the dimensions
  case types.RESET_FILTERS:
    return {...state, ...action.filters};

  case types.RESET_FILTER:
    return {...state, ...action.filter};

  // a Saved Search was loaded from Pillar to be edited
  case types.PILLAR_EDIT_SEARCH_SUCCESS:
    return {
      ...state,
      ...action.filters,
      breakdown: action.breakdown,
      specificBreakdown: action.specificBreakdown
    };

  case types.SORT:
    const sortBy = action.template ? [action.template, action.direction] : null;
    return {...state, sortBy};

  case types.CLEAR_EDITABLE_FILTERS:
    // reset editable filters to their default state while a Saved Search is loading
    return {...state, ...action.filters, breakdownEdit: 'all', specificBreakdownEdit: ''};

  default:
    return state;
  }
};
