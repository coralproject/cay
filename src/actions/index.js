export const PIPELINE_SELECTED = 'PIPELINE_SELECTED';
export const PIPELINES_REQUEST = 'PIPELINES_REQUEST';
export const PIPELINES_REQUEST_FAILURE = 'PIPELINES_REQUEST_FAILURE';
export const PIPELINES_RECEIVED = 'PIPELINES_RECEIVED';

export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // login http request started
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAIL = 'LOGIN_FAIL'; // login request failure

export const COMMENT_CLICK = 'COMMENT_CLICK';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';

export const STORE_COMMENTS = 'STORE_COMMENTS';

export const REQUEST_DATA_EXPLORATION_DATASET = 'REQUEST_DATA_EXPLORATION_DATASET';
export const RECEIVE_DATA_EXPLORATION_DATASET = 'RECEIVE_DATA_EXPLORATION_DATASET';
export const DATA_EXPLORATION_FETCH_ERROR = 'DATA_EXPLORATION_FETCH_ERROR';

export const REQUEST_EXPLORER_CONTROLS = 'REQUEST_EXPLORER_CONTROLS';
export const RECEIVE_EXPLORER_CONTROLS = 'RECEIVE_EXPLORER_CONTROLS';

/* config */

var getInit = () => {
  var headers = new Headers({'Authorization': 'Basic NmQ3MmU2ZGQtOTNkMC00NDEzLTliNGMtODU0NmQ0ZDM1MTRlOlBDeVgvTFRHWjhOdGZWOGVReXZObkpydm4xc2loQk9uQW5TNFpGZGNFdnc9'});

  var init = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return init;
};

const httpPrefix = true ? 'http://localhost:4000/' : 'production httpPrefix goes here';
const apiPrefix = '1.0/query/'; // maybe later we'll be at api 2.0
const apiSuffix = '/exec';

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

export const receivePipelines = (message) => {
  return {
    type: PIPELINES_RECEIVED,
    message
  };
};

export const requestPipelinesFailure = (err) => {
  return {
    type: PIPELINES_REQUEST_FAILURE,
    err
  };
};

export const fetchPipelinesIfNotFetched = (filterId) => {

  return (dispatch,getState) => {

    if (! getState().userList.loading && getState().userList.loadedFilterId !== filterId) {
      return dispatch(fetchPipelines(filterId));
    }

    return {
      type: 'NOOP'
    };

  };

};


export const fetchPipelines = (filterId) => {
  return (dispatch) => {

    dispatch(requestPipelines(filterId));

    fetch(httpPrefix + '/query', getInit())
      .then(response => response.json())
      .then(pipelines => dispatch(receivePipelines(pipelines)))
      .catch(err => dispatch(requestPipelinesFailure(err)));
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


export const fetchCommentsByUser = (data) => {
  const url = `${httpPrefix}${apiPrefix}comments_by_user${apiSuffix}?user_id=${data.user_id}`;
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


export const fetchDataExplorationDataset = (field, queryParams) => {
  const queryParamString = queryParams ? convert(queryParams) : '';
  const url = httpPrefix + apiPrefix + field + apiSuffix + queryParamString;
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
  const url = httpPrefix + '1.0/query';

  return (dispatch) => {
    dispatch(requestControls());

    fetch(url, getInit())
      .then(res => res.json())
      .then(pipelines => dispatch(receiveControls(pipelines)))
      .catch(err => console.log(err));
  };
};
