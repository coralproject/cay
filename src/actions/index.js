import _ from 'lodash';
import {clamp} from '../utils';

export const CONFIG_LOADED = 'CONFIG_LOADED';
export const DATA_CONFIG_LOADED = 'DATA_CONFIG_LOADED';

export const PIPELINE_SELECTED = 'PIPELINE_SELECTED';
export const PIPELINE_REQUEST = 'PIPELINE_REQUEST'; // request data for a single pipeline
export const PIPELINES_REQUEST = 'PIPELINES_REQUEST';
export const PIPELINES_REQUEST_FAILURE = 'PIPELINES_REQUEST_FAILURE';
export const PIPELINE_REQUEST_FAILURE = 'PIPELINE_REQUEST_FAILURE';
export const PIPELINES_RECEIVED = 'PIPELINES_RECEIVED';
export const PIPELINE_RECEIVED = 'PIPELINE_RECEIVED';

export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // login request failure
export const LOGGED_OUT = 'LOGGED_OUT';

export const COMMENT_CLICK = 'COMMENT_CLICK';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';

export const CLEAR_USER_DETAIL_COMMENTS = 'CLEAR_USER_DETAIL_COMMENTS';

export const STORE_COMMENTS = 'STORE_COMMENTS';

export const REQUEST_DATA_EXPLORATION_DATASET = 'REQUEST_DATA_EXPLORATION_DATASET';
export const RECEIVE_DATA_EXPLORATION_DATASET = 'RECEIVE_DATA_EXPLORATION_DATASET';
export const DATA_EXPLORATION_FETCH_ERROR = 'DATA_EXPLORATION_FETCH_ERROR';

export const REQUEST_EXPLORER_CONTROLS = 'REQUEST_EXPLORER_CONTROLS';
export const RECEIVE_EXPLORER_CONTROLS = 'RECEIVE_EXPLORER_CONTROLS';

export const REQUEST_SECTIONS = 'REQUEST_SECTIONS';
export const RECEIVE_SECTIONS = 'RECEIVE_SECTIONS';
export const REQUEST_AUTHORS = 'REQUEST_AUTHORS';
export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';

export const USER_SELECTED = 'USER_SELECTED';

export const FORMULA_CREATED = 'FORMULA_CREATED';

export const REQUEST_ALL_TAGS = 'REQUEST_ALL_TAGS';
export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const ALL_TAGS_REQUEST_ERROR = 'ALL_TAGS_REQUEST_ERROR';

export const RECEIVE_UPSERTED_USER = 'RECEIVE_UPSERTED_USER';
export const REQUEST_USER_UPSERT = 'REQUEST_USER_UPSERT';
export const USER_UPSERT_REQUEST_ERROR = 'USER_UPSERT_REQUEST_ERROR';

export const FILTER_CHANGED = 'FILTER_CHANGED';
export const CREATE_QUERY = 'CREATE_QUERY';
export const SUBMIT_CUSTOM_QUERY = 'SUBMIT_CUSTOM_QUERY';
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';

export const SET_BREAKDOWN = 'SET_BREAKDOWN';
export const SET_SPECIFIC_BREAKDOWN = 'SET_SPECIFIC_BREAKDOWN';

export const REQUEST_FILTER_RANGES = 'REQUEST_FILTER_RANGES';
export const RECEIVE_FILTER_RANGES = 'RECEIVE_FILTER_RANGES';

/* config */

const getInit = (method) => {
  const headers = new Headers({'Authorization': window.basicAuthorization});

  const init = {
    method: method || 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return init;
};

const apiPrefix = '1.0/'; // maybe later we'll be at api 2.0

export const selectPipeline = (pipeline) => {
  return {
    type: PIPELINE_SELECTED,
    pipeline
  };
};

export const requestPipeline = (pipeline) => {
  return {
    type: PIPELINE_REQUEST,
    pipeline
  };
};

export const requestPipelines = () => {
  return {
    type: PIPELINES_REQUEST
  };
};

export const receivePipelines = (pipelines) => {
  return {
    type: PIPELINES_RECEIVED,
    pipelines
  };
};

export const requestPipelinesFailure = (err) => {
  return {
    type: PIPELINES_REQUEST_FAILURE,
    err
  };
};

export const fetchPipelinesIfNotFetched = () => {
  return (dispatch, getState) => {
    if (! getState().pipelines.loading) {
      return dispatch(fetchPipelines());
    }
    return {
      type: 'NOOP'
    };
  };
};

// get deep list of query_sets
export const fetchPipelines = () => {
  return (dispatch) => {

    dispatch(requestPipelines());

    fetch(window.xeniaHost + '/1.0/query', getInit())
      .then(response => response.json())
      .then(pipelines => dispatch(receivePipelines(pipelines)))
      .catch(err => dispatch(requestPipelinesFailure(err)));
  };
};

export const requestPipelineFailure = (err) => {
  return {
    type: PIPELINE_REQUEST_FAILURE,
    err
  };
};

export const receivePipeline = (data) => {
  return {
    type: PIPELINE_RECEIVED,
    data
  };
};

// execute a query_set
export const fetchPipeline = (pipelineName) => {
  return (dispatch) => {
    dispatch(requestPipeline(pipelineName));

    fetch(window.xeniaHost + '/' + apiPrefix + 'exec/' + pipelineName, getInit())
      .then(response => response.json())
      .then(pipeline => dispatch(receivePipeline(pipeline)))
      .catch(err => dispatch(requestPipelineFailure(err)));
  };
};

export const executeCustomPipeline = pipeline => {
  return {
    type: 'EXECUTE_CUSTOM_PIPELINE',
    pipeline
  };
};

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

    fetch(window.xeniaHost + '/1.0/exec/dimension_section_list', getInit())
      .then(response => response.json())
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
  return dispatch => {
    dispatch(requestAuthors());

    fetch(window.xeniaHost + '/1.0/exec/dimension_author_list', getInit())
      .then(response => response.json())
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
  return (dispatch, getState) => {
    let counter = getState().filters.counter;
    counter++
    dispatch({
      type: SET_SPECIFIC_BREAKDOWN,
      specificBreakdown: specificBreakdown,
      counter
    });
  };
};

/* stuff for the login screen */

export const initLogin = (username, password) => {
  return {
    type: LOGIN_INIT,
    username,
    password
  };
};

export const loginUser = (username, password) => {
  console.log(username, password);
  return (dispatch) => {
    dispatch();
  };
};

export const fetchCommentsByUser = (user_id) => {
  const url = `${window.xeniaHost}/${apiPrefix}exec/comments_by_user?user_id=${user_id}`;
  return (dispatch) => {

    dispatch(clearUserDetailComments());
    dispatch(requestComments());

    var myRequest = new Request(url, getInit());

    fetch(myRequest)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComments(json));
        dispatch(storeComments(json));
      })
      .catch(err => dispatch(receiveCommentsFailure(err)));
  };
};

export const requestComments = () => {
  return {
    type: COMMENTS_REQUEST
  };
};

export const receiveComments = (data) => {
  return {
    type: COMMENTS_SUCCESS,
    data
  };
};

export const receiveCommentsFailure = (err) => {
  return {
    type: COMMENTS_FAIL,
    err
  };
};

export const clearUserDetailComments = () => {
  return {
    type: CLEAR_USER_DETAIL_COMMENTS
  };
};

export const storeComments = (data) => {
  return {
    type: STORE_COMMENTS,
    data
  };
};

/* data exploration */

const requestDataExplorationDataset = () => {
  return {
    type: REQUEST_DATA_EXPLORATION_DATASET
  };
};

const receiveDataExplorationDataset = (data) => {
  return {
    type: RECEIVE_DATA_EXPLORATION_DATASET,
    data
  };
};

const dataExplorationFetchError = (error) => {
  return {
    type: DATA_EXPLORATION_FETCH_ERROR,
    error
  };
};

// convert to query string
// http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
const convert = (json) => {
  return '?' +
    Object.keys(json).map((key) => {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
};

export const createPipelineValueChanged = (config) => {
  const url = window.xeniaHost + '/' + apiPrefix + 'exec';

  return (dispatch, getState) => {

    if (!getState().dataExplorer.loading) {

      dispatch(requestDataExplorationDataset());

      var init = getInit('POST');
      init.body = JSON.stringify(config);

      fetch(url, init)
        .then(response => response.json())
        .then(json => {
          dispatch(receiveDataExplorationDataset(json));
        })
        .catch(err => {
          dispatch(dataExplorationFetchError(err));
        });
    }
  };
};

export const fetchDataExplorationDataset = (field, queryParams) => {
  const queryParamString = queryParams ? convert(queryParams) : '';
  const url = window.xeniaHost + '/' + apiPrefix + 'exec/' + field + queryParamString;

  return (dispatch, getState) => {

    if (!getState().dataExplorer.loading) {

      dispatch(requestDataExplorationDataset());
      fetch(url, getInit())
      .then(res => res.json())
      .then(json => {
        dispatch(receiveDataExplorationDataset(json));
      })
      .catch(err => {
        dispatch(dataExplorationFetchError(err));
      });
    } else {
      return { type: 'NOOP' };
    }
  };
};

const requestControls = () => {
  return {
    type: REQUEST_EXPLORER_CONTROLS
  };
};

const receiveControls = (pipelines) => {
  return {
    type: RECEIVE_EXPLORER_CONTROLS,
    pipelines
  };
};

export const populateControlsReducer = () => {
  const url = window.xeniaHost + '/1.0/query';

  return (dispatch) => {
    dispatch(requestControls());

    fetch(url, getInit())
      .then(res => res.json())
      .then(pipelines => dispatch(receiveControls(pipelines)))
      .catch(err => console.log(err));
  };
};

const loginInit = (email, pass) => {
  return {
    type: LOGIN_INIT,
    email,
    pass
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    err
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {

    if (getState().loading) {
      return;
    }

    dispatch(loginInit(email, password));

    fetch(`./auth.php?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .then(response => response.json())
      .then(json => {
        if (json.valid === 1) {
          window.localStorage.authorized = true;
          dispatch(loginSuccess());
        } else {
          dispatch(loginFailure('unauthorized'));
        }
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};

export const logout = () => {
  window.localStorage.removeItem('authorized');
  return {
    type: LOGGED_OUT
  };
};

export const userSelected = (user) => {
  return {
    type: USER_SELECTED,
    user
  };
};

const receiveAllTags = (tags) => {
  return {
    type: RECEIVE_ALL_TAGS,
    tags
  };
};

const requestAllTags = () => {
  return {
    type: REQUEST_ALL_TAGS
  };
};

const allTagsRequestError = (err) => {
  return {
    type: ALL_TAGS_REQUEST_ERROR,
    err
  };
};

export const fetchAllTags = () => {
  const url = window.pillarHost + '/api/tags';

  return (dispatch, getState) => {
    if (!getState().loadingTags) {
      dispatch(requestAllTags());

      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
          dispatch(receiveAllTags(json));
        }).catch(err => {
          dispatch(allTagsRequestError(err));
        });
    } else {
      return {type: 'NOOP'};
    }
  };

};

export const getFilterRanges = () => {

  return (dispatch, getState) => {
    let filterState = getState().filters;
    let $group = filterState.filterList.reduce((accum, key) => {

      let dimension;
      if (filterState.breakdown === 'author') {
        dimension = 'author.' + filterState.specificBreakdown;
      } else if (filterState.breakdown === 'section') {
        dimension = 'section.' + filterState.specificBreakdown;
      } else { // all
        dimension = 'all';
      }
      const field = '$' + _.template(filterState[key].template)({dimension});

      // if you change this naming convention
      // you must update the RECEIVE_FILTER_RANGES in reducers/filters.js
      accum[key + '_min'] = {
        $min: field
      };

      accum[key + '_max'] = {
        $max: field
      };

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

    dispatch({type: 'REQUEST_FILTER_RANGES'});

    const url = window.xeniaHost + '/' + apiPrefix + 'exec';

    var init = getInit('POST');
    init.body = JSON.stringify(query);

    fetch(url, init)
      .then(res => res.json())
      .then(data => {
        console.log('RECEIVE_FILTER_RANGES', data);
        dispatch({type: 'RECEIVE_FILTER_RANGES', data});
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


export const createQuery = (query) => {
  return {
    type: CREATE_QUERY,
    query
  };
};

export const makeQueryFromState = (/*type*/) => {
  return (dispatch, getState) => {
    console.log('function that calls async')
    // make a query from the current state
    const filterState = getState().filters;
    const filters = filterState.filterList.map(key => filterState[key]);

    let matches = _.flatten(_.map(filters, filter => {
      let dbField;
      if (filterState.breakdown === 'author') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      var matches = [];

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        matches.push( {$match: {[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}}});
      }

      if (filter.max !== filter.userMax) {
        matches.push( {$match: {[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}}});
      }

      return matches;

    }));

    let query = {
      name: 'user_search',
      desc: 'user search currently. this is going to be more dynamic in the future',
      pre_script: '',
      pst_script: '',
      params: [],
      queries: [
        {
          name: 'user_search',
          type: 'pipeline',
          collection: 'user_statistics',
          commands: [
            ...matches,
            // {$sort: {'statistics.comments.all.all.count': -1}},
            {$skip: 0},
            {$limit: 20}
            // {
            //   $redact: {
            //     $cond: {
            //       if: {
            //         $eq: [{$ifNull: ['$reply_comments', true]}, true]
            //       },
            //       then: '$$DESCEND',
            //       else: '$$PRUNE'
            //     }
            //   }
            // }
          ],
          return: true
        }
      ],
      enabled: true
    };

    doMakeQueryFromStateAsync(query, dispatch);

  };
};

const doMakeQueryFromStateAsync = _.debounce((query, dispatch)=>{
  console.log('actual async')
  dispatch(requestPipeline());
  dispatch(createQuery(query));

  const url = window.xeniaHost + '/' + apiPrefix + 'exec';

  var init = getInit('POST');
  init.body = JSON.stringify(query);

  fetch(url, init)
    .then(response => response.json())
    .then(json => {
      dispatch(receivePipeline(json));
    })
    .catch(err => {
      dispatch(dataExplorationFetchError(err));
    });
},1000)


const receiveUpsertedUser = (user) => {
  return {
    type: RECEIVE_UPSERTED_USER,
    user
  };
};

const requestUserUpsert = () => {
  return {
    type: REQUEST_USER_UPSERT
  };
};

const userUpsertRequestError = (err) => {
  return {
    type: USER_UPSERT_REQUEST_ERROR,
    err
  };
};

export const upsertUser = (preparedObject) => {
  const url = window.pillarHost + '/api/user';

  return (dispatch, getState) => {
    if (!getState().upsertingUser) {
      dispatch(requestUserUpsert());

      var headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });

      var init = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(preparedObject)
      };

      fetch(url, init)
        .then(res => res.json())
        .then(json => {
          dispatch(receiveUpsertedUser(json));
        }).catch(err => {
          dispatch(userUpsertRequestError(err));
        });

    } else {
      return {type: 'NOOP'};
    }
  };

};


/*****************************************/
/* Redundant, for testing purposes only */

export const REQUEST_ALL_TAGS_USER_DETAIL = 'REQUEST_ALL_TAGS_USER_DETAIL';
export const RECEIVE_ALL_TAGS_USER_DETAIL = 'RECEIVE_ALL_TAGS_USER_DETAIL';
export const ALL_TAGS_REQUEST_ERROR_USER_DETAIL = 'ALL_TAGS_REQUEST_ERROR_USER_DETAIL';

const receiveAllTagsUserDetail = (tags) => {
  return {
    type: RECEIVE_ALL_TAGS_USER_DETAIL,
    tags
  };
};

const requestAllTagsUserDetail = () => {
  return {
    type: REQUEST_ALL_TAGS_USER_DETAIL
  };
};

const allTagsRequestErrorUserDetail = (err) => {
  return {
    type: ALL_TAGS_REQUEST_ERROR_USER_DETAIL,
    err
  };
};

export const fetchAllTagsUserDetail = () => {
  const url = window.pillarHost + '/api/tags';

  return (dispatch, getState) => {
    if (!getState().loadingTags) {
      dispatch(requestAllTagsUserDetail());

      fetch(url)
        .then(res => res.json())
        .then(json => {
          dispatch(receiveAllTagsUserDetail(json));
        }).catch(err => {
          dispatch(allTagsRequestErrorUserDetail(err));
        });
    } else {
      return {type: 'NOOP'};
    }
  };

};
