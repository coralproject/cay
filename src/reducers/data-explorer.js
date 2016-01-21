import * as types from '../actions';

const data_exploration = (state = {
  loading: false,
  loadingControls: false,
  dataset: null,
  datasetName: null,
  pipelineRangeStart: null,
  pipelineRangeEnd: null,
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
    let pipelineTimeRange = {};
    /* if it's a new dataset, we need new max and min timescales */
    if (state.datasetName !== action.data.results[0].Name) {
      pipelineTimeRange = {
        pipelineRangeStart: _.min(_.pluck(action.data.results[0].Docs, 'start')) * 1000,
        pipelineRangeEnd: _.max(_.pluck(action.data.results[0].Docs, 'start')) * 1000
      }
    }
    return Object.assign({}, state, {
      loading: false,
      dataset: action.data.results[0].Docs,
      datasetName: action.data.results[0].Name,
      error: null
    }, pipelineTimeRange);
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
