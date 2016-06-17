import _ from 'lodash';
import {clamp} from 'components/utils/math';
import {xenia} from 'app/AppActions';
import {makeQueryFromState} from 'search/SearchActions';

export const DATA_CONFIG_REQUEST = 'DATA_CONFIG_REQUEST';

export const REQUEST_SECTIONS = 'REQUEST_SECTIONS';
export const RECEIVE_SECTIONS = 'RECEIVE_SECTIONS';
export const REQUEST_AUTHORS = 'REQUEST_AUTHORS';
export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';

export const DATA_CONFIG_LOADED = 'DATA_CONFIG_LOADED';
export const DATA_CONFIG_ERROR = 'DATA_CONFIG_ERROR';

export const FETCH_DISTRIBUTIONS = 'FETCH_DISTRIBUTIONS';
export const FETCH_DISTRIBUTIONS_SUCCESS = 'FETCH_DISTRIBUTIONS_SUCCESS';
export const FETCH_DISTRIBUTIONS_ERROR = 'FETCH_DISTRIBUTIONS_ERROR';


export const FILTER_CHANGED = 'FILTER_CHANGED';

export const SET_BREAKDOWN = 'SET_BREAKDOWN';
export const SET_BREAKDOWN_EDIT = 'SET_BREAKDOWN_EDIT';
export const SET_SPECIFIC_BREAKDOWN = 'SET_SPECIFIC_BREAKDOWN';
export const SET_SPECIFIC_BREAKDOWN_EDIT = 'SET_SPECIFIC_BREAKDOWN_EDIT';

export const RESET_FILTERS = 'RESET_FILTERS';
export const RESET_FILTER = 'RESET_FILTER';

export const SORT = 'SORT';

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
        console.log('you failed to get the section list!', err);
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

export const setBreakdown = (breakdown, editMode) => {
  return {
    type: editMode ? SET_BREAKDOWN_EDIT : SET_BREAKDOWN,
    breakdown
  };
};

export const setSpecificBreakdown = (specificBreakdown, editMode) => {
  return (dispatch) => {
    // let counter = getState().filters.counter;
    // counter++;
    dispatch({
      type: editMode ? SET_SPECIFIC_BREAKDOWN_EDIT : SET_SPECIFIC_BREAKDOWN,
      specificBreakdown
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
    const oldFilter = filterState[key];
    const clampedUserMin = clamp(oldFilter.userMin, oldFilter.min, oldFilter.max);
    const clampedUserMax = clamp(oldFilter.userMax, oldFilter.min, oldFilter.max);

    const possibleDateValue = new Date(value);
    // if it's a Date, change the type
    // console.log('parsed value', aggKey, value, possibleDateValue);
    if (_.isString(value) && _.isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
      value = possibleDateValue;
    }

    newFilter[field] = value; // where field is {min|max}
    accum[key] = newFilter;

    // on the first pass, go ahead and force a change on userMin and userMax
    // but only if the userMin and userMax are defaults.
    if (field === 'min' && +oldFilter.min === +clampedUserMin) {
      newFilter.userMin = value;
    } else if (field === 'max' && +oldFilter.max === +clampedUserMax) {
      newFilter.userMax = value;
    }

    return accum;
  }, {});

  return newFilters;
};

// HERE BE DRAGONS
export const getFilterRanges = (editMode = false) => {

  return (dispatch, getState) => {
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

      const field = '$' + _.template(f.template)({dimension});
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
          type: RECEIVE_FILTER_RANGES,
          // get filterState again, as it might have changed
          data: parseFilterRanges(doc, getState().filters),
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

const fetchDistributions = () => {
  return {
    type: FETCH_DISTRIBUTIONS
  };
};

const fetchDistributionsSuccess = (distros) => {
  return {
    type: FETCH_DISTRIBUTIONS_SUCCESS,
    distros
  };
};

const fetchDistributionsError = (err) => {
  return {
    type: FETCH_DISTRIBUTIONS_ERROR,
    data: err
  };
};

const distributionForInput = (x, inputValue) => {
  return x.addQuery()
  // .match({['statistics.comments.all.all.'+inputValue]: {$lte: 15}})
  .project({
    count: {
      $subtract: [
        '$statistics.comments.all.all.' + inputValue,
        {
          $mod: ['$statistics.comments.all.all.' + inputValue, 1]
        }
      ]
    },
    _id: false
  })
  .group({
    _id: '$count',
    total: { $sum: 1 }
  })
  .sort({
    '_id': 1
  });
};

const inputValues = [
  'count',
  'replied_count',
  'replied_ratio',
  'reply_count',
  'reply_ratio',
  'word_count_average'
];

export const populateDistributionStore = () => {
  return (dispatch) => {
    dispatch(fetchDistributions());
    const x = xenia({name: 'distributions'});

    inputValues.map((inputValue) => {
      distributionForInput(x, inputValue);
    });

    x.exec().then((data, err) => {
      if (err) {console.log('get dist error',err);}
      const merged = {};
      data.results.map((result, i) => {
        console.log(result)
        merged[inputValues[i]] = result.Docs;
      });
      dispatch(fetchDistributionsSuccess(merged));
    }).catch(error => {
      dispatch(fetchDistributionsError(error));
    });
  };
};

export const resetFilters = () => {
  return (dispatch, getState) => {
    const filters = getState().filters;
    const resetFilters = filters.filterList.reduce((accum, key) => {
      accum[key] = {...filters[key], userMin: filters[key].min, userMax: filters[key].max};
      return accum;
    }, {});

    dispatch({type: RESET_FILTERS, filters: resetFilters});
  };
};

export const resetFilter = name => dispatch => {
  dispatch(resetFilterAction(name));
  dispatch(makeQueryFromState('user', 0, true));
};

export const sortBy = (template, direction) => dispatch => {
  dispatch(sortByAction(template, direction));
  dispatch(makeQueryFromState('user', 0, true));
};

const sortByAction = (template, direction) => {
  return {type: SORT, template, direction};
};

const resetFilterAction = (name) => {

  return (dispatch, getState) => {
    const {filters} = getState();
    const resetFilter = {...filters[name], userMin: filters[name].min, userMax: filters[name].max};

    dispatch({type: RESET_FILTER, filter: {[name]: resetFilter}});
  };
};
