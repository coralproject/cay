import {authXenia} from 'app/AppActions';

export const REQUEST_DATA_EXPLORATION_DATASET = 'REQUEST_DATA_EXPLORATION_DATASET';
export const RECEIVE_DATA_EXPLORATION_DATASET = 'RECEIVE_DATA_EXPLORATION_DATASET';
export const DATA_EXPLORATION_FETCH_ERROR = 'DATA_EXPLORATION_FETCH_ERROR';

export const REQUEST_EXPLORER_CONTROLS = 'REQUEST_EXPLORER_CONTROLS';
export const RECEIVE_EXPLORER_CONTROLS = 'RECEIVE_EXPLORER_CONTROLS';


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

export const createQuerysetValueChanged = (config) => {
  return (dispatch, getState) => {
    const url = getState().app.xeniaHost + '/1.0/exec';

    if (!getState().dataExplorer.loading) {

      dispatch(requestDataExplorationDataset());

      var init = authXenia('POST');
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

  return (dispatch, getState) => {
    const url = getState().app.xeniaHost + '/1.0/exec/' + field + queryParamString;

    if (!getState().dataExplorer.loading) {

      dispatch(requestDataExplorationDataset());
      fetch(url, authXenia())
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

const receiveControls = (querysets) => {
  return {
    type: RECEIVE_EXPLORER_CONTROLS,
    querysets
  };
};

export const populateControlsReducer = () => {
  return (dispatch, getState) => {
    const url = getState().app.xeniaHost + '/1.0/query';
    dispatch(requestControls());

    fetch(url, authXenia())
      .then(res => res.json())
      .then(querysets => dispatch(receiveControls(querysets)))
      .catch(err => console.log(err));
  };
};
