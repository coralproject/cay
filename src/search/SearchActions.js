
/**
 * Module dependencies
 */

import reduce from 'lodash/collection/reduce';
import find from 'lodash/collection/find';
import pick from 'lodash/object/pick';
import has from 'lodash/object/has';
import template from 'lodash/string/template';
import isDate from 'lodash/lang/isDate';
import cloneDeep from 'lodash/lang/cloneDeep';
import compact from 'lodash/array/compact';
import map from 'lodash/collection/map';
import debounce from 'lodash/function/debounce';
import delay from 'lodash/function/delay';
import indexOf from 'lodash/array/indexOf';
import {clamp} from 'components/utils/math';
import {xenia} from 'app/AppActions';
import { fetchSections, fetchAuthors } from 'filters/FiltersActions';
import { fetchAllTags } from 'tags/TagActions';

/**
 * Action names
 */

export const QUERYSET_SELECTED = 'QUERYSET_SELECTED';
export const QUERYSET_REQUEST = 'QUERYSET_REQUEST'; // request data for a single queryset
export const QUERYSETS_REQUEST = 'QUERYSETS_REQUEST';
export const QUERYSETS_REQUEST_FAILURE = 'QUERYSETS_REQUEST_FAILURE';
export const QUERYSET_REQUEST_FAILURE = 'QUERYSET_REQUEST_FAILURE';
export const QUERYSETS_RECEIVED = 'QUERYSETS_RECEIVED';
export const QUERYSET_RECEIVED = 'QUERYSET_RECEIVED';

export const QUERYSET_SAVE_SUCCESS = 'QUERYSET_SAVE_SUCCESS';
export const QUERYSET_SAVE_FAILED = 'QUERYSET_SAVE_FAILED';
export const CREATE_QUERY = 'CREATE_QUERY';

export const SUBMIT_CUSTOM_QUERY = 'SUBMIT_CUSTOM_QUERY';

export const SEARCHLIST_REQUEST = 'SEARCHLIST_REQUEST';
export const SEARCHLIST_SUCCESS = 'SEARCHLIST_SUCCESS';
export const SEARCHLIST_FAILED = 'SEARCHLIST_FAILED';

export const SEARCH_SAVE_INIT = 'SEARCH_SAVE_INIT';
export const SEARCH_SAVE_SUCCESS = 'SEARCH_SAVE_SUCCESS';
export const SEARCH_SAVE_FAILED = 'SEARCH_SAVE_FAILED';

export const SEARCH_DELETE_INIT = 'SEARCH_DELETE_INIT';
export const SEARCH_DELETED = 'SEARCH_DELETED';
export const SEARCH_DELETE_FAILURE = 'SEARCH_DELETE_FAILURE';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const SAVED_SEARCH_EDIT_REQUEST = 'SAVED_SEARCH_EDIT_REQUEST';
export const EDIT_SEARCH_SUCCESS = 'EDIT_SEARCH_SUCCESS';
export const EDIT_SEARCH_FAILED = 'EDIT_SEARCH_FAILED';

export const SEARCH_UPDATE_SUCCESS = 'SEARCH_UPDATE_SUCCESS';
export const SEARCH_UPDATE_FAILED = 'SEARCH_UPDATE_FAILED';

export const UPDATE_EDITABLE_SEARCH_META = 'UPDATE_EDITABLE_SEARCH_META';

// when we're initializing a Saved Search update to Pillar
export const SAVED_SEARCH_UPDATE = 'SAVED_SEARCH_UPDATE';
export const SEARCH_UPDATE_STALE = 'SEARCH_UPDATE_STALE';

export const CLEAR_USER_LIST = 'CLEAR_USER_LIST';
export const CLEAR_USER = 'CLEAR_USER';
export const CLEAR_RECENT_SAVED_SEARCH = 'CLEAR_RECENT_SAVED_SEARCH';

export const TOGGLE_TAG_VISIBILITY = 'TOGGLE_TAG_VISIBILITY';
export const SHOW_SPECIFIC_TAG = 'SHOW_SPECIFIC_TAG';
export const SHOW_ALL_TAGS = 'SHOW_ALL_TAGS';

/**
 * Action creators
 */

const requestQueryset = queryset => ({ type: QUERYSET_REQUEST, queryset });
const requestSearches = () => ({ type: SEARCHLIST_REQUEST });
const receivedSearches = searches => ({ type: SEARCHLIST_SUCCESS, searches });
const searchesFailed = error => ({ type: SEARCHLIST_FAILED, error });
const requestSearch = () => ({ type: SEARCH_REQUEST });
const receivedSearch = search => ({ type: SEARCH_SUCCESS, search });
const searchFailed = error => ({ type: SEARCH_FAILED, error });

const requestSavedSearchForEdit = () => ({ type: SAVED_SEARCH_EDIT_REQUEST });
const receivedEditSearch = (search, filters, breakdown, specificBreakdown) =>
({ type: EDIT_SEARCH_SUCCESS, search, filters, breakdown, specificBreakdown });

const searchEditFetchFailed = error => ({ type: EDIT_SEARCH_FAILED, error });

const createQuery = query => ({ type: CREATE_QUERY, query });

export const updateEditableSearchMeta = (field, value) =>
({ type: UPDATE_EDITABLE_SEARCH_META, field, value });


export const receiveQueryset = (data, replace) => ({
  type: QUERYSET_RECEIVED,
  data,
  replace,
  userCount: has(data, 'results.1.Docs.0.count') ? data.results[1].Docs[0].count : 0
});

/**
 * Actions API
 */

// get data about a single Saved Search
export const fetchSearch = id => (dispatch, getState) => {
  dispatch(requestSearch());

  const { pillarHost } = getState().app;

  return fetch(`${pillarHost}/api/search/${id}`)
    .then(resp => resp.json())
    .then(search => dispatch(receivedSearch(search)))
    .catch(error => dispatch(searchFailed(error)));
};

export const fetchSavedSearchForEdit = id => (dispatch, getState) => {
  const { app, filters } = getState();

  dispatch(requestSavedSearchForEdit(id));

  return fetch(`${app.pillarHost}/api/search/${id}`)
    .then(resp => resp.json())
    .then(search => {
      const {breakdown, specificBreakdown, values} = search.filters;

      const updatedFilters = reduce(filters.editFilterList, (accum, key) => {
        const oldFilter = filters[key];
        const savedFilter = find(values, {name: oldFilter.name});
        if (savedFilter) {
          // this could probably be more succinct with destructuring, but I was in a hurry
          accum[key] = Object.assign({}, oldFilter, pick(savedFilter, ['userMin', 'userMax', 'min', 'max']));
        }
        return accum;
      }, {});

      return dispatch(receivedEditSearch(search, updatedFilters, breakdown, specificBreakdown));
    })
    .catch(error => dispatch(searchEditFetchFailed(error)));
};

// get a list of Saved Searches from Pillar
export const fetchSearches = () => (dispatch, getState) => {
  dispatch(requestSearches());

  const app = getState().app;

  fetch(app.pillarHost + '/api/searches')
    .then(resp => resp.json())
    .then(searches => dispatch(receivedSearches(searches)))
    .catch(error => dispatch(searchesFailed(error)));
};

export const fetchSearchesIfNotFetched = () => (dispatch, getState) => {
  if (!getState().searches.loadingSearches) {
    return dispatch(fetchSearches());
  }
};

export const requestQuerysetFailure = error => {
  return {type: QUERYSET_REQUEST_FAILURE, error};
};

// execute a saved query_set
export const fetchQueryset = (querysetName, page = 0, replace = false) =>
dispatch => {
  dispatch(requestQueryset(querysetName, page));

  xenia()
    .exec(querysetName, {skip: 20 * page, limit: 20})
    .then(queryset => dispatch(receiveQueryset(queryset, replace)))
    .catch(err => dispatch(requestQuerysetFailure(err)));
};

/* xenia_package */
export const makeQueryFromState = (type, page = 0, replace = false, editMode = false) => {
  const pageSize = 20;

  return (dispatch, getState) => {
    // make a query from the current state

    const fs = getState().filters;
    const app = getState().app;
    const searches = getState().searches;
    const filterList = editMode ? fs.editFilterList : fs.filterList;
    const filters = filterList.map(key => fs[key]);
    let breakdown = editMode ? fs.breakdownEdit : fs.breakdown;
    let specificBreakdown = editMode ? fs.specificBreakdownEdit : fs.specificBreakdown;
    const excludedTags = searches.excluded_tags;

    const x = xenia({
      name: 'user_search_' + Math.random().toString().slice(-10),
      desc: 'user search currently. this is going to be more dynamic in the future'
    });

    const addMatches = x => {

      // filter by breakdown if needed
      if (-1 === ['author', 'section'].indexOf(breakdown) || specificBreakdown === '') {
        breakdown = 'all';
      } else {
        x.match({[`statistics.comments.${breakdown}.${specificBreakdown}`]: { $exists: true }});
      }

      // Filter excluded tags
      excludedTags.filter(t => t !== 'No tags').forEach(tag => x.match({ tags: { $nin: [tag] } }));
      if (-1 !== excludedTags.indexOf('No tags')) {
        x.match({ tags: { $exists: true, $not: { $size: 0 } } });
      }

      return filters.map(filter => {
        let dbField;
        // get the name of the mongo db field we want to $match on.
        if (breakdown !== 'all' && specificBreakdown !== '') {
          dbField = template(filter.template)({dimension: `${breakdown}.${specificBreakdown}`});
        } else { // all
          dbField = template(filter.template)({dimension: 'all'});
        }

        // Only create match statements for non-defaults
        // user min and user max are stored for UX purposes.
        // filter.userMax and filter.max COULD be different values, but be equivalent in the UI (visually)
        // filter.min and filter.max change when the ranges are populated from the server
        const clampedUserMin = clamp(filter.userMin, filter.min, filter.max);
        const clampedUserMax = clamp(filter.userMax, filter.min, filter.max);

        // convert everything to numbers since equivalent Dates are not equal
        // this will break if a string literal is ever a filter value since NaN !== NaN
        if (+filter.min !== +clampedUserMin) {
          let searchMin;
          if (isDate(clampedUserMin)) {
            searchMin = `#date:${clampedUserMin.toISOString()}`;
          } else if (filter.type === 'intDateProximity') {
            searchMin = `#time:${-clampedUserMin*24}h`;
          } else {
            searchMin = clampedUserMin;
          }

          x.match({[dbField]: {$gte: searchMin}});
        }

        if (+filter.max !== +clampedUserMax) {
          let searchMax;
          if (isDate(clampedUserMax)) {
            searchMax = `#date:${clampedUserMax.toISOString()}`;
          } else {
            searchMax = clampedUserMax;
          }
          // This minRange condition is in place to handle fields that
          //  do not exist in documents for their zero value
          //  In these cases we need to account for both less than the max
          //    and the non-existence of the field
          if (filter.minRange === 0) {
            x.match({
              $or: [
                {[dbField]: {$lte: searchMax}},
                {[dbField]: {$exists: false}}
              ]
            });
          } else {
            x.match({[dbField]: {$lte: searchMax}});
          }
        }

        return dbField;
      });

    };

    const dbFields = addMatches(x.addQuery());

    if(fs.sortBy) {
      const breakdown = editMode ? fs.breakdownEdit : fs.breakdown;
      const specificBreakdown = editMode ? fs.specificBreakdownEdit : fs.specificBreakdown;
      const { sortBy } = fs;
      const field = template(sortBy[0])
        ({dimension: `${breakdown}${specificBreakdown ? `.${specificBreakdown}` : ''}`});
      x.sort([field, sortBy[1]]);
    } else {
      // default sorting
      x.sort(['statistics.comments.all.all.count', -1]);
    }

    // statistics.comments.all.all is always needed
    const breakdownFields = specificBreakdown !== '' ?
      `statistics.comments.${breakdown}.${specificBreakdown}` : null;
    x.skip(page * pageSize).limit(pageSize)
      .include(['name', 'avatar', 'statistics.comments.all', breakdownFields]);

    // get the counts
    addMatches(x.addQuery());
    x.group({_id: null, count: {$sum: 1}});

    doMakeQueryFromStateAsync(x, dispatch, app, replace);
  };
};

export const saveQueryFromState = (queryName, desc, tag) => (dispatch, getState) => {
  // make a query from the current state
  const state = getState();

  dispatch({type: SEARCH_SAVE_INIT, query: state.searches.activeQuery});

  saveSearchToPillar(dispatch, state, queryName, desc, tag);
};

// prepare the active query to be saved to xenia
const createQueryForSave = (query, name, desc) => {
  const q = cloneDeep(query);


  // set params, descriptions, defaults
  q.params = [
    {
      name: 'limit',
      desc: 'Limits the number of records returned.',
      default: '1000'
    },
    {
      name: 'skip',
      desc: 'Skips a number of records before returning.',
      default: '0'
    },
    {
      name: 'sort',
      desc: 'Sort field.',
      default: 'statistics.comments.all.all.count'
    }
  ];

  // inject $limt and $skip commands before saving
  q.queries[0].commands.forEach((command) => {
    if (typeof command.$skip !== 'undefined') {
      command.$skip = '#number:skip';
    } else if (typeof command.$limit !== 'undefined') {
      command.$limit = '#number:limit';
    }
  });


  // disabling this sort
  //  there are two sorts being added to searches, here and in makeQueryFromState
  //  we need to decide whether to store the earch in the query
  //  or expose it via a param
  //const lastMatchIndex = _.findLastIndex(q.queries[0].commands, command => _.has(command, '$match'));
  //if (lastMatchIndex !== -1) {
  //  const sortCommand = { $sort: { '#string:sort': -1 } };
    //q.queries[0].commands.splice(lastMatchIndex + 1, 0, sortCommand);
  //}


  q.name = name;
  q.desc = desc;

  return q;
};

// create the body of request to save a Search to Pillar
const prepSearchForPillar = (filters, query, name, desc, tag, breakdown, specificBreakdown, excluded_tags) => {

  let values = compact(map(filters, f => {
    // this will return the ENTIRE filter if only the min OR max was changed.
    // is this the behavior we want?
    if (f.min !== f.userMin || f.max !== f.userMax) {
      return f;
    } else {
      return null;
    }
  }));

  return {
    name, // the human-readable user-entered name
    description: desc, // user-entered string
    querySet: query, // the full xenia queryset (without the name)
    tag, // unique name of live-tag
    excluded_tags, // excluded tags array
    filters: {
      values,
      breakdown,
      specificBreakdown
    }
  };
};

const saveQuerySetToXenia = (state, search, query) => {

  return dispatch => {
    // we are using a pillar generated queryset name, so
    //   set the query name from the search, which has
    //   been returned from pillar/api/search POST
    query.name = search.query;

    console.log('save search to xenia', query);

    xenia(query)
    .saveQuery()
    .then(() => { // if response.status < 400
      dispatch({type: QUERYSET_SAVE_SUCCESS, name: query.name});
    }).catch(error => {
      dispatch({type: QUERYSET_SAVE_FAILED, error});
    });
  };

};

/*

this method saves the active query to pillar with some other metadata,
then saves the resulting id to xenia to form a "Search"

the filters object only stores non-default values and the dimension breakdowns

*/


const saveSearchToPillar = (dispatch, state, name, desc, tag) => {

  const {breakdown, specificBreakdown} = state.filters;
  const query = createQueryForSave(state.searches.activeQuery, name, desc);
  const filters = state.filters.filterList.map(key => state.filters[key]);
  const excludedTags = state.searches.excluded_tags;

  const body = prepSearchForPillar(filters, query, name, desc, tag, breakdown, specificBreakdown, excludedTags);

  fetch(`${state.app.pillarHost}/api/search`, {method: 'POST', body: JSON.stringify(body)})
    .then(resp => resp.json())
    .then(search => {
      // do something with savedSearch?
      dispatch({type: SEARCH_SAVE_SUCCESS, search});
      dispatch(saveQuerySetToXenia(state, search, query));
    })
    .catch(error => {
      dispatch({type: SEARCH_SAVE_FAILED, error});
    });
};

/* xenia_package */
const doMakeQueryFromStateAsync = debounce((query, dispatch, app, replace) => {
  dispatch(requestQueryset());

  dispatch(createQuery(query._data));

  query.exec()
    .then(json => dispatch(receiveQueryset(json, replace)))
    .catch(() => {});
}, 250);

export const updateSearch = staleSearch => {

  return (dispatch, getState) => {

    // build query from state
    const {app, searches, filters} = getState();
    const {editMeta_name: name, editMeta_tag: tag, editMeta_description: description, excluded_tags} = searches;
    const {id, query: xeniaQueryName} = staleSearch;
    const {breakdownEdit, specificBreakdownEdit} = filters;

    const query = createQueryForSave(searches.activeQuery, xeniaQueryName, description);
    const editFilters = filters.editFilterList.map(key => {
      console.log('updateSearch key', key);
      console.log('updateSearch filters', filters);
      return filters[key];
    });

    dispatch({type: SAVED_SEARCH_UPDATE, query});

    // update search in pillar
    const body = prepSearchForPillar(editFilters, query, name, description, tag, breakdownEdit, specificBreakdownEdit, excluded_tags);

    // append the id for update mode
    body.id = id;
    body.query = xeniaQueryName; // make sure to keep old name so xenia save is an update insted of insert

    fetch(`${app.pillarHost}/api/search`, {method: 'PUT', body: JSON.stringify(body)})
      .then(resp => resp.json())
      .then(search => {
        // do something with savedSearch?
        dispatch({type: SEARCH_UPDATE_SUCCESS, search});

        // update search in xenia
        xenia(query).saveQuery().then(() => {

          delay(() => dispatch({type: SEARCH_UPDATE_STALE}), 3000);

          dispatch({type: QUERYSET_SAVE_SUCCESS, name: query.name});
        });

      })
      .catch(error => {
        dispatch({type: SEARCH_UPDATE_FAILED, error});
      });
  };
};

export const deleteSearch = search => {
  return (dispatch, getState) => {
    const app = getState().app;
    const searches = getState().searches;

    dispatch({type: SEARCH_DELETE_INIT, search});

    fetch(`${app.pillarHost}/api/search/${search.id}`, {method: 'DELETE'})
    .then(resp => {
      console.info('search deleted from pillar', resp);
      const newSearches = searches.searches.concat();
      // splice out deleted search
      newSearches.splice(indexOf(map(newSearches, 'id'), search.id), 1);

      dispatch({type: SEARCH_DELETED, search, newSearches});
    })
    .catch(error => {
      console.error('failed to delete search', error);
      console.error(error.stack);
      dispatch({type: SEARCH_DELETE_FAILURE, error});
    });
  };
};

export const fetchInitialData = (editMode = false) => dispatch => {
  // Get initial data for the filters
  dispatch(fetchSections());
  dispatch(fetchAuthors());
  dispatch(fetchAllTags());

  // Get user list
  dispatch(makeQueryFromState('user', 0, true, editMode));
};

export const clearUserList = () => ({ type: CLEAR_USER_LIST });

export const clearRecentSavedSearch = () => ({ type: CLEAR_RECENT_SAVED_SEARCH });

export const toggleTagVisibility = (tag, visible) => dispatch => {
  dispatch({ type: TOGGLE_TAG_VISIBILITY, tag });
  dispatch(makeQueryFromState('user', 0, true, false));
};

export const showAllTags = () => dispatch => {
  dispatch({ type: SHOW_ALL_TAGS });
  dispatch(makeQueryFromState('user', 0, true, false));
};

export const showSpecificTag = (tags, tag) => dispatch => {
  dispatch({ type: SHOW_SPECIFIC_TAG, tags, tag });
  dispatch(makeQueryFromState('user', 0, true, false));
};
