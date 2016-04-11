import _ from 'lodash';
import {clamp} from 'components/utils/math';
import {xenia} from 'app/AppActions';

export const QUERYSET_SELECTED = 'QUERYSET_SELECTED';
export const QUERYSET_REQUEST = 'QUERYSET_REQUEST'; // request data for a single queryset
export const QUERYSETS_REQUEST = 'QUERYSETS_REQUEST';
export const QUERYSETS_REQUEST_FAILURE = 'QUERYSETS_REQUEST_FAILURE';
export const QUERYSET_REQUEST_FAILURE = 'QUERYSET_REQUEST_FAILURE';
export const QUERYSETS_RECEIVED = 'QUERYSETS_RECEIVED';
export const QUERYSET_RECEIVED = 'QUERYSET_RECEIVED';

export const RECEIVE_FILTER_RANGES = 'RECEIVE_FILTER_RANGES';

export const QUERYSET_SAVE_SUCCESS = 'QUERYSET_SAVE_SUCCESS';
export const QUERYSET_SAVE_FAILED = 'QUERYSET_SAVE_FAILED';
export const CREATE_QUERY = 'CREATE_QUERY';

export const SUBMIT_CUSTOM_QUERY = 'SUBMIT_CUSTOM_QUERY';

export const PILLAR_SEARCHLIST_REQUEST = 'PILLAR_SEARCHLIST_REQUEST';
export const PILLAR_SEARCHLIST_SUCCESS = 'PILLAR_SEARCHLIST_SUCCESS';
export const PILLAR_SEARCHLIST_FAILED = 'PILLAR_SEARCHLIST_FAILED';

export const PILLAR_SEARCH_SAVE_INIT = 'PILLAR_SEARCH_SAVE_INIT';
export const PILLAR_SEARCH_SAVE_SUCCESS = 'PILLAR_SEARCH_SAVE_SUCCESS';
export const PILLAR_SEARCH_SAVE_FAILED = 'PILLAR_SEARCH_SAVE_FAILED';

export const selectQueryset = (queryset) => {
  return {
    type: QUERYSET_SELECTED,
    queryset
  };
};

export const requestQueryset = (queryset) => {
  return {
    type: QUERYSET_REQUEST,
    queryset
  };
};

export const requestQuerysets = () => {
  return {
    type: QUERYSETS_REQUEST
  };
};

export const receiveQuerysets = (querysets) => {
  return {
    type: QUERYSETS_RECEIVED,
    querysets
  };
};

export const requestQuerysetsFailure = (err) => {
  return {
    type: QUERYSETS_REQUEST_FAILURE,
    err
  };
};

/* xenia_package */
export const fetchQuerysetsIfNotFetched = () => {
  return (dispatch, getState) => {
    if (! getState().groups.loading) {
      return dispatch(fetchQuerysets());
    }
    return {
      type: 'NOOP'
    };
  };
};

/* xenia_package */
// get deep list of query_sets
export const fetchQuerysets = () => {
  return (dispatch) => {

    dispatch(requestQuerysets());

    xenia().getQueries()
      .then(querysets => dispatch(receiveQuerysets(querysets)))
      .catch(err => dispatch(requestQuerysetsFailure(err)));
  };
};

const requestSearches = () => {
  return {type: PILLAR_SEARCHLIST_REQUEST};
};

const receivedSearches = (searches) => {
  return {type: PILLAR_SEARCHLIST_SUCCESS, searches};
};

const searchesFailed = (error) => {
  return {type: PILLAR_SEARCHLIST_FAILED, error};
};

export const fetchSearches = () => {
  return (dispatch, getState) => {
    dispatch(requestSearches());

    const app = getState().app;

    fetch(app.pillarHost + '/api/searches')
      .then(resp => resp.json())
      .then(searches => {
        dispatch(receivedSearches(searches));
      })
      .catch(error => {
        dispatch(searchesFailed(error));
      });
  };
};

export const fetchSearchesIfNotFetched = () => {
  return (dispatch, getState) => {
    if (!getState().groups.loadingSearches) {
      return dispatch(fetchSearches());
    }
    return {
      type: 'NOOP'
    };
  };
};

export const requestQuerysetFailure = (err) => {
  return {
    type: QUERYSET_REQUEST_FAILURE,
    err
  };
};

export const receiveQueryset = (data) => {
  return {
    type: QUERYSET_RECEIVED,
    data
  };
};

/* xenia_package */
// execute a saved query_set
export const fetchQueryset = (querysetName) => {
  return (dispatch) => {
    dispatch(requestQueryset(querysetName));

    xenia()
      .exec(querysetName)
      .then(queryset => dispatch(receiveQueryset(queryset)))
      .catch(err => dispatch(requestQuerysetFailure(err)));
  };
};

export const executeCustomQueryset = queryset => {
  return {
    type: 'EXECUTE_CUSTOM_QUERYSET',
    queryset
  };
};


export const createQuery = (query) => {
  return {
    type: CREATE_QUERY,
    query
  };
};

/* xenia_package */
export const makeQueryFromState = (type, page = 0) => {
  return (dispatch, getState) => {
    // make a query from the current state
    const filterState = getState().filters;
    const app = getState().app;
    const filters = filterState.filterList.map(key => filterState[key]);
    const x = xenia({
      name: 'user_search_' + Math.random().toString().slice(-10),
      desc: 'user search currently. this is going to be more dynamic in the future'
    });

    x.addQuery();
    filters.forEach(filter => {
      let dbField;
      if (filterState.breakdown === 'author' && filterState.specificBreakdown !== '') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section' && filterState.specificBreakdown !== '') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        x.match({[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}});
      }

      if (filter.max !== filter.userMax) {
        x.match({[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}});
      }
    });

    // doMakeQueryFromStateAsync(query, dispatch, app);
    x.skip(page * 20)
    .limit(20)
    .include(['name', 'avatar', 'statistics.comments']);

    doMakeQueryFromStateAsync(x, dispatch, app);
  };
};

export const saveQueryFromState = (queryName, desc, tag) => {

  return (dispatch, getState) => {
    // make a query from the current state
    const state = getState();

    dispatch({type: PILLAR_SEARCH_SAVE_INIT, query: state.groups.activeQuery});

    console.log('about to doPutQuery');
    doPutQuery(dispatch, state, queryName, desc, tag);
  };
};

/*

this method saves the active query to xenia, then saves the resulting query_set
to pillar with some other metadata to form a "Search"

the filters object only stores non-default values and the dimension breakdowns

*/
const doPutQuery = (dispatch, state, name, desc, tag) => {

  const query = state.groups.activeQuery;

  console.log('about to xenia.saveQuery');
  xenia(query).saveQuery()
    .then(() => { // if response.status < 400
      dispatch({type: QUERYSET_SAVE_SUCCESS, name: query.name});
      // save it to pillar
      const filterList = state.filters.filterList;

      let values = _.compact(_.map(filterList, stateKey => {
        const f = state.filters[stateKey];
        // this will return the ENTIRE filter if only the min OR max was changed.
        // is this the behavior we want?
        if (f.min !== f.userMin || f.max !== f.userMax) {
          return f;
        } else {
          return null;
        }
      }));

      console.log(values);

      const body = {
        name, // the human-readable user-entered name
        description: desc, // user-entered string
        query: query.name, // the name of the xenia query
        tag, // unique name of live-tag
        filters: {
          values,
          breakdown: state.filters.breakdown,
          specificBreakdown: state.filters.specificBreakdown
        }
      };

      /*

      {"id":"56fc126479770e0006b8bc97","name":"my-first-search","description":"wow, this description is super interesting","query":"this-is-the-name-of-a-xenia-query","tag":"name-of-tag","date_created":"2016-03-30T17:52:36.279477937Z","date_updated":"0001-01-01T00:00:00Z"}

      */

      fetch(state.app.pillarHost + '/api/search', {method: 'POST', body: JSON.stringify(body)})
        .then(resp => resp.json())
        .then(search => {
          // do something with savedSearch?
          dispatch({type: PILLAR_SEARCH_SAVE_SUCCESS, search});
        })
        .catch(error => {
          dispatch({type: PILLAR_SEARCH_SAVE_FAILED, error});
        });

    }).catch(error => {
      dispatch({type: QUERYSET_SAVE_FAILED, error});
    });
};
/* xenia_package */
const doMakeQueryFromStateAsync = _.debounce((query, dispatch)=>{
  dispatch(requestQueryset());

  dispatch(createQuery(query._data));

  query.exec()
    .then(json => dispatch(receiveQueryset(json)))
    .catch(() => {});
}, 1000);
