import _ from 'lodash';
import {xenia} from 'app/AppActions';

export const REQUEST_SECTIONS = 'REQUEST_SECTIONS';
export const RECEIVE_SECTIONS = 'RECEIVE_SECTIONS';
export const REQUEST_AUTHORS = 'REQUEST_AUTHORS';
export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';

export const DATA_CONFIG_LOADED = 'DATA_CONFIG_LOADED';
export const DATA_CONFIG_ERROR = 'DATA_CONFIG_ERROR';

export const FILTER_CHANGED = 'FILTER_CHANGED';

export const SET_BREAKDOWN = 'SET_BREAKDOWN';
export const SET_SPECIFIC_BREAKDOWN = 'SET_SPECIFIC_BREAKDOWN';

export const RESET_FILTERS = 'RESET_FILTERS';

// export const REQUEST_FILTER_RANGES = 'REQUEST_FILTER_RANGES';
export const RECEIVE_FILTER_RANGES = 'RECEIVE_FILTER_RANGES';

export const requestSections = () => {
  return {
    type: REQUEST_SECTIONS
  };
};

export const receiveSections = (data) => {
  return {
    type: RECEIVE_SECTIONS,
    data
  };
};

export const fetchSections = () => {
  return (dispatch) => {
    dispatch(requestSections());

    /* xenia_package */
    xenia().exec('dimension_section_list')
      .then(json => dispatch(receiveSections(json)))
      .catch(err => {
        console.log('oh no. failed to get section list', err);
      });
  };
};

export const requestAuthors = () => {
  return { type: REQUEST_AUTHORS };
};

export const receiveAuthors = (data) => {
  return {
    type: RECEIVE_AUTHORS,
    data
  };
};

export const fetchAuthors = () => {
  return (dispatch) => {
    dispatch(requestAuthors());

    /* xenia_package */
    xenia().exec('dimension_author_list')
      .then(json => dispatch(receiveAuthors(json)))
      .catch(err => {
        console.log('you failed to get the authors list!', err);
      });
  };
};

export const setBreakdown = (breakdown) => {
  return {
    type: SET_BREAKDOWN,
    breakdown
  };
};

export const setSpecificBreakdown = (specificBreakdown) => {
  return (dispatch) => {
    // let counter = getState().filters.counter;
    // counter++;
    dispatch({
      type: SET_SPECIFIC_BREAKDOWN,
      specificBreakdown: specificBreakdown
      // counter
    });
  };
};

const parseFilterRanges = (ranges, filterState) => {

  const newFilters = _.reduce(ranges, (accum, value, aggKey) => {
    let [key, field] = aggKey.split('_');

    if (field === 'id' || value === null) return accum;

    // we might have already updated the old filter with the min value
    // retrieve it from the accumulator in progress instead of the state
    let newFilter = _.has(accum, key) ? accum[key] : {};

    const possibleDateValue = new Date(value);
    // if it's a Date, change the type
    if (_.isString(value) && _.isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
      value = possibleDateValue;
    }

    newFilter[field] = value; // where field is {min|max}
    accum[key] = newFilter;

    // on the first pass, go ahead and force a change on userMin and userMax
    if (field === 'min' && _.isNull(filterState[key].userMin)) {
      newFilter.userMin = value;
    } else if (field === 'max' && _.isNull(filterState[key].userMax)) {
      newFilter.userMax = value;
    }

    return accum;
  }, {});

  return newFilters;
};

// HERE BE DRAGONS
export const getFilterRanges = () => {

  return (dispatch, getState) => {
    let filterState = getState().filters;
    let $group = filterState.filterList.reduce((accum, key) => {

      let dimension;
      if (filterState.breakdown === 'author' && filterState.specificBreakdown !== '') {
        dimension = 'author.' + filterState.specificBreakdown;
      } else if (filterState.breakdown === 'section' && filterState.specificBreakdown !== '') {
        dimension = 'section.' + filterState.specificBreakdown;
      } else { // all
        dimension = 'all';
      }

      // if you change this naming convention
      // you must update the RECEIVE_FILTER_RANGES in reducers/filters.js

      if (filterState[key].type !== 'dateRange') {
        const field = '$' + _.template(filterState[key].template)({dimension});
        accum[key + '_min'] = {
          $min: field
        };

        accum[key + '_max'] = {
          $max: field
        };
      } else {
        accum[key + '_min'] = {
          $min: '$' + _.template(filterState[key].template)({dimension}) + '.first'
        };

        accum[key + '_max'] = {
          $max: '$' + _.template(filterState[key].template)({dimension}) + '.last'
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

    // dispatch({type: REQUEST_FILTER_RANGES});

    xenia(query).exec()
      .then(data => {
        const doc = data.results[0].Docs[0];
        console.log('gs',getState());
        let counter = getState().filters.counter;
        counter++;

        dispatch({
          type: RECEIVE_FILTER_RANGES,
          data: parseFilterRanges(doc, filterState),
          counter
        });
      }).catch(err => {
        console.log(err);
      });
  };
};

export const filterChanged = (fieldName, data) => {
  return (dispatch, getState) => {
    let counter = getState().filters.counter;
    counter++;

    dispatch({
      type: FILTER_CHANGED,
      fieldName,
      data,
      counter
    });
  };
};

export const fetchFilterConfig = () => {
  return (dispatch, getState) => {

    const filters = getState().filters;
    const requiredKeys = ['filters', 'dimensions'];

    if (filters.loadingFilters || filters.configLoaded) return {type: 'NOOP'};

    dispatch({type: DATA_CONFIG_REQUEST});

    fetch('/data_config.json')
      .then(res => res.json())
      .then(config => {

        const allKeysDefined = requiredKeys.every(key => 'undefined' !== typeof config[key]);

        if (!allKeysDefined) {
          throw new Error(`missing required keys on data_config.json. Must define ${requiredKeys.join('|')}`);
        }

        dispatch({type: DATA_CONFIG_LOADED, config});

      }).catch(({message}) => {
        // should probably check instanceof on the error here.
        // we end up in this catch if the file is missing altogether
        return dispatch({type: DATA_CONFIG_ERROR, message});
      });

  };
};

export const resetFilters = () => {
  return {type: RESET_FILTERS};
};
