import * as types from '../actions';

const data_exploration = (state = {
  loading: false,
  loadingControls: false,
  dataset: null,
  error: null,
  pipelines: []
}, action) => {
  switch (action.type) {
  case types.REQUEST_DATA_EXPLORATION_DATASET:
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  case types.RECEIVE_DATA_EXPLORATION_DATASET:
    return Object.assign({}, state, {
      loading: false,
      dataset: action.data.results[0].Docs,
      error: null
    });
  case types.DATA_EXPLORATION_FETCH_ERROR:
    return Object.assign({}, state, {
      loading: false,
      dataset: null,
      error: action.error
    });
  case types.REQUEST_EXPLORER_CONTROLS:
    return Object.assign({}, state, {
      loadingControls: true
    });
  case types.RECEIVE_EXPLORER_CONTROLS:
    return Object.assign({}, state, {
      loadingControls: false,
      pipelines: action.pipelines
    });
  default:
    return state;
  }
};

export default data_exploration;
