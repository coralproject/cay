import * as types from '../actions';

const data_exploration = (state = {
  loading: false,
  dataset: null,
  error: null
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
  default:
    return state;
  }
};

export default data_exploration;
