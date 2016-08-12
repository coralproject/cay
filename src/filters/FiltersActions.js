
/**
 * Module dependencies
 */

import isUndefined from 'lodash/lang/isUndefined';
import isNull from 'lodash/lang/isNull';
import template from 'lodash/string/template';
import { xenia } from 'app/AppActions';
import { makeQueryFromState } from 'search/SearchActions';
import { parseFilterRanges, distributionForInput } from 'filters/utils';

export const FILTERS_CONFIG_LOADED = 'FILTERS_CONFIG_LOADED';

export const FETCH_SECTIONS_REQUEST = 'FETCH_SECTIONS_REQUEST';
export const FETCH_SECTIONS_SUCCESS = 'FETCH_SECTIONS_SUCCESS';

export const FETCH_AUTHORS_REQUEST = 'FETCH_AUTHORS_REQUEST';
export const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS';

export const FETCH_DISTRIBUTIONS_REQUEST = 'FETCH_DISTRIBUTIONS_REQUEST';
export const FETCH_DISTRIBUTIONS_SUCCESS = 'FETCH_DISTRIBUTIONS_SUCCESS';
export const FETCH_DISTRIBUTIONS_ERROR = 'FETCH_DISTRIBUTIONS_FAILURE';

export const FILTER_CHANGED = 'FILTER_CHANGED';

export const SET_BREAKDOWN = 'SET_BREAKDOWN';
export const SET_BREAKDOWN_EDIT = 'SET_BREAKDOWN_EDIT';
export const SET_SPECIFIC_BREAKDOWN = 'SET_SPECIFIC_BREAKDOWN';
export const SET_SPECIFIC_BREAKDOWN_EDIT = 'SET_SPECIFIC_BREAKDOWN_EDIT';

export const RESET_FILTER = 'RESET_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

export const CLEAR_EDITABLE_FILTERS = 'CLEAR_EDITABLE_FILTERS';

export const SORT = 'SORT';

export const FETCH_FILTER_RANGES_REQUEST = 'FETCH_FILTER_RANGES_REQUEST';
export const FETCH_FILTER_RANGES_SUCCESS = 'FETCH_FILTER_RANGES_SUCCESS';
export const FETCH_FILTER_RANGES_FAILURE = 'FETCH_FILTER_RANGES_FAILURE';

/**
 * Action creators
 */

const requestSections = () => ({ type: FETCH_SECTIONS_REQUEST });
const receiveSections = data => ({ type: FETCH_SECTIONS_SUCCESS, data });

const requestAuthors = () => ({ type: FETCH_AUTHORS_REQUEST });
const receiveAuthors = data => ({ type: FETCH_AUTHORS_SUCCESS, data });

const requestDistributions = () => ({ type: FETCH_DISTRIBUTIONS_REQUEST });
const receiveDistributionsSuccess = distros => ({
  type: FETCH_DISTRIBUTIONS_SUCCESS,
  distros
});
const receiveDistributionsFailure = error => ({
  type: FETCH_DISTRIBUTIONS_FAILURE,
  data: error
});

const sortByAction = (template, direction) => ({ type: SORT, template, direction });

const resetFilterAction = name => (dispatch, getState) => {
  const { filters } = getState();
  const resetFilter = {...filters[name], userMin: filters[name].min, userMax: filters[name].max};

  dispatch({
    type: RESET_FILTER,
    filter: {[name]: resetFilter}
  });
};

/**
 * Actions API
 */

export const clearFilters = (editable = false) => (dispatch, getState) => {
  const { filters } = getState();

  // loop over the editable filters and re-initialize them.
  // ranges are being loaded from the server while this is happening.
  const filterList = editable ? filters.editFilterList : filters.filterList;

  const defaults = filterList.reduce((accum, key) => {
    let filter = filters[key];
    const min = isUndefined(filter.minRange) ? null : filter.minRange;
    const max = isUndefined(filter.maxRange) ? null : filter.maxRange;
    const userMin = isNull(min) ? null : filter.minRange;
    const userMax = isNull(max) ? null : filter.maxRange;

    filter = {...filter, min, max, userMin, userMax};

    if (filter.type === 'intDateProximity') {
      filter = {...filter, min: 0, userMin: 0, max: 10000, userMax: 10000};
    }

    accum[key] = filter;

    return accum;
  }, {});

  const breakdowns = editable
    ? {breakdownEdit: 'all', specificBreakdownEdit: ''}
    : {breakdown: 'all', specificBreakdown: ''};

  dispatch({type: CLEAR_EDITABLE_FILTERS, filters: defaults, breakdowns});
};

export const fetchSections = () => dispatch => {
  dispatch(requestSections());

  return xenia().exec('dimension_section_list')
    .then(json => dispatch(receiveSections(json)))
    .catch(err => console.log('you failed to get the section list!', err));
};

export const fetchAuthors = () => dispatch => {
  dispatch(requestAuthors());

  return xenia().exec('dimension_author_list')
    .then(json => dispatch(receiveAuthors(json)))
    .catch(err => console.log('you failed to get the authors list!', err));
};

export const setBreakdown = (breakdown, editMode) => ({
  type: editMode ? SET_BREAKDOWN_EDIT : SET_BREAKDOWN,
  breakdown
});

export const setSpecificBreakdown = (specificBreakdown, editMode) => ({
  type: editMode ? SET_SPECIFIC_BREAKDOWN_EDIT : SET_SPECIFIC_BREAKDOWN,
  specificBreakdown
});

export const filterChanged = (fieldName, data) => (dispatch, getState) =>
dispatch({
  type: FILTER_CHANGED,
  fieldName,
  data,
  counter: getState().filters.counter + 1
});

const inputValues = [
  'count',
  'replied_count',
  'replied_ratio',
  'reply_count',
  'reply_ratio',
  'word_count_average'
];

export const populateDistributionStore = () => dispatch => {
  dispatch(fetchDistributions());
  const x = xenia({name: 'distributions'});

  inputValues.forEach(inputValue => distributionForInput(x, inputValue));

  x.exec().then((data, err) => {
    if (err) { return fetchDistributionsError(error); }

    const merged = {};
    data.results.map((result, i) => {
      merged[inputValues[i]] = result.Docs;
    });
    dispatch(fetchDistributionsSuccess(merged));
  }).catch(error => {
    dispatch(fetchDistributionsError(error));
  });
};

export const resetFilters = () => (dispatch, getState) => {
  const filters = getState().filters;
  const resetFilters = filters.filterList.reduce((accum, key) => {
    accum[key] = {...filters[key], userMin: filters[key].min, userMax: filters[key].max};
    return accum;
  }, {});

  dispatch({type: RESET_FILTERS, filters: resetFilters});
};

export const resetFilter = name => dispatch => {
  dispatch(resetFilterAction(name));
  dispatch(makeQueryFromState('user', 0, true));
};

export const sortBy = (template, direction) => dispatch => {
  dispatch(sortByAction(template, direction));
  dispatch(makeQueryFromState('user', 0, true));
};

// TODO: refactor this function. It's large and hard to understand
export const getFilterRanges = (editMode = false) => (dispatch, getState) => {

  dispatch({ type: FETCH_FILTER_RANGES_REQUEST });

  let fs = getState().filters;
  const filterList = editMode ? fs.editFilterList : fs.filterList;
  const breakdown = editMode ? fs.breakdownEdit : fs.breakdown;
  const specificBreakdown = editMode ? fs.specificBreakdownEdit : fs.specificBreakdown;
  let $group = filterList.reduce((accum, key) => {

    var f = fs[key];

    let dimension;
    if (breakdown === 'author' && specificBreakdown !== '') {
      dimension = 'author.' + specificBreakdown;
    } else if (breakdown === 'section' && specificBreakdown !== '') {
      dimension = 'section.' + specificBreakdown;
    } else { // all
      dimension = 'all';
    }

    // if you change this naming convention "<somefilter>_max"
    // you must update the RECEIVE_FILTER_RANGES in reducers/filters.js
    const field = '$' + template(f.template)({dimension});
    if (f.type === 'intDateProximity') {
      return accum; // do not get ranges for "ago" filter (for now).
    } else {
      accum[key + '_min'] = {
        $min: field
      };

      accum[key + '_max'] = {
        $max: field
      };
    }

    return accum;
  }, {_id: null});

  let query = {
    name: 'ranges',
    desc: 'min and max values for arbitrary filters',
    pre_script: '',
    pst_script: '',
    params: [],
    queries: [
      {
        name: 'ranges',
        type: 'pipeline',
        collection: 'user_statistics',
        commands: [ { $group } ],
        return: true
      }
    ],
    enabled: true
  };

  xenia(query).exec()
    .then(data => {
      const doc = data.results[0].Docs[0];
      let counter = getState().filters.counter;
      counter++;

      dispatch({
        type: FETCH_FILTER_RANGES_SUCCESS,
        // get filterState again, as it might have changed
        data: parseFilterRanges(doc, getState().filters),
        counter
      });
    }).catch(err => dispatch({ type: FETCH_FILTER_RANGES_FAILURE }));
};
