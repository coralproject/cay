export const PIPELINE_SELECTED = 'PIPELINE_SELECTED';
export const PIPELINE_REQUEST = 'PIPELINE_REQUEST'; // request data for a single pipeline
export const PIPELINES_REQUEST = 'PIPELINES_REQUEST';
export const PIPELINES_REQUEST_FAILURE = 'PIPELINES_REQUEST_FAILURE';
export const PIPELINE_REQUEST_FAILURE = 'PIPELINE_REQUEST_FAILURE';
export const PIPELINES_RECEIVED = 'PIPELINES_RECEIVED';
export const PIPELINE_RECEIVED = 'PIPELINE_RECEIVED';

export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // login http request started
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAIL = 'LOGIN_FAIL'; // login request failure
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

export const REQUEST_AUTHORS_AND_SECTIONS = 'REQUEST_AUTHORS_AND_SECTIONS';
export const RECEIVE_AUTHORS_AND_SECTIONS = 'RECEIVE_AUTHORS_AND_SECTIONS';

export const USER_SELECTED = 'USER_SELECTED';

export const FORMULA_CREATED = 'FORMULA_CREATED';

export const REQUEST_ALL_TAGS = 'REQUEST_ALL_TAGS';
export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const ALL_TAGS_REQUEST_ERROR = 'ALL_TAGS_REQUEST_ERROR';

/* config */

var getInit = (method) => {
  var headers = new Headers({'Authorization': 'Basic NmQ3MmU2ZGQtOTNkMC00NDEzLTliNGMtODU0NmQ0ZDM1MTRlOlBDeVgvTFRHWjhOdGZWOGVReXZObkpydm4xc2loQk9uQW5TNFpGZGNFdnc9'});

  var init = {
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
    type: PIPELINES_REQUEST,
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

export const requestAuthorsAndSections = () => {
  return {
    type: REQUEST_AUTHORS_AND_SECTIONS
  };
};

export const receiveAuthorsAndSections = (data) => {
  return {
    type: RECEIVE_AUTHORS_AND_SECTIONS,
    data
  };
};

export const fetchAuthorsAndSections = () => {
  return (dispatch) => {
    dispatch(requestAuthorsAndSections());

    fetch(window.xeniaHost + '1.0/exec/author_and_section_list', getInit())
      .then(response => response.json())
      .then(json => dispatch(receiveAuthorsAndSections(json)))
      .catch(err => {
        console.log('oh no. failed to get authors and section list', err);
      });
  };
};


// get deep list of query_sets
export const fetchPipelines = () => {
  return (dispatch) => {

    dispatch(requestPipelines());

    fetch(window.xeniaHost + '1.0/query', getInit())
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

    fetch(window.xeniaHost + apiPrefix + 'exec/' + pipelineName, getInit())
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
  const url = `${window.xeniaHost}${apiPrefix}exec/comments_by_user?user_id=${user_id}`;
  return (dispatch) => {
    dispatch(requestComments());

    var myRequest = new Request(url, getInit());

    fetch(myRequest)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComments(json));
        dispatch(storeComments(json));
      })
      .catch(err => dispatch(receiveCommentsFailure(err)));


/*      .then(response => {
        dispatch(COMMENTS_SUCCESS, response);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });*/
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
  const url = window.xeniaHost + apiPrefix + 'exec';

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
  const url = window.xeniaHost + apiPrefix + 'exec/' + field + queryParamString;

  return (dispatch, getState) => {

    if (!getState().dataExplorer.loading) {

      dispatch(requestDataExplorationDataset());
      fetch(url, getInit())
      .then(res => res.json())
      .then(json => {
        dispatch(receiveDataExplorationDataset(json));
      })
      .catch(err => {
        console.log('fetchDataExplorationDataset error', err);
        dispatch(dataExplorationFetchError(err));
      });
    } else {
      return { type: 'NOOP' };
    }

  };
};

const formulaCreated = () => {
  return {
    type: FORMULA_CREATED
  };
};

export const createFormula = (filterSettings) => {
  const interval = this.getSensibleInterval(new Date(this.state.minDate), new Date(this.state.maxDate));

  if (this.state.specificBreakdowns.length) {

    var match = {
      $match: {
        $or: this.state.specificBreakdowns.map(bd => {
          return {target_doc: bd};
        })
      }
    };

    computedQuery.queries[0].commands.splice(3, 0, match);
  }

  // validateFormula(filterSettings)

  var computedQuery = {
    name: 'custom_query',
    desc: 'Returns a time series of comments bounded by iso dates!  Totals or broken down by duration [day|week|month] and target type total|user|asset|author|section]',
    pre_script: '',
    pst_script: '',
    params: [],
    queries: [
      {
        name: 'custom_query',
        type: 'pipeline',
        collection: 'comment_timeseries',
        /* this will be generated too... */
        commands: [
          {
            $match: {
              start_iso: {$gte: `#date:${this.state.minDate}`}
            }
          },
          {
            $match: {
              start_iso: {$lt: `#date:${this.state.maxDate}`}
            }
          },
          {
            $match: {
              duration: interval
            }
          },
          {
            $match: {
              target: this.state.selectedBreakdown
            }
          },
          {
            $sort: {
              start_iso: 1
            }
          }
        ],
        'return': true
      }
    ],
    enabled: true
  };

  return (dispatch) => {
    dispatch(createPipelineValueChanged(computedQuery));

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
  const url = window.xeniaHost + '1.0/query';

  return (dispatch) => {
    dispatch(requestControls());

    fetch(url, getInit())
      .then(res => res.json())
      .then(pipelines => dispatch(receiveControls(pipelines)))
      .catch(err => console.log(err));
  };
};

/* github oauth stuff */

export const loginInitGit = () => {
  const clientId = '539db12440cca9ec7e2c';

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=foobar`;

  console.log('url', url);

  return {
    type: LOGIN_INIT,
    url
  };

  // location.href = url;
};

export const loginGitSuccess = (token) => {

  window.localStorage.token = token;

  return {
    type: LOGIN_SUCCESS,
    token
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
        .then(res => res.json())
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
