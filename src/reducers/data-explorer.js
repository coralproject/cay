import * as types from "../actions";

const data_exploration = (state = {
  loading: false,
  dataset: null,
  error: false
}, action) => {
  switch (action.type) {
  case types.REQUEST_DATA_EXPLORATION_DATASET:
    return Object.assign({}, state, {
      loading: true
    });
  case types.RECEIVE_DATA_EXPLORATION_DATASET:
    return Object.assign({}, state, {
      loading: false,
      dataset: action.data
    });
  case types.DATA_EXPLORATION_FETCH_ERROR:
    return Object.assign({}, state, {
      loading: false,
      dataset: null,
      error: true
    });
  default:
    return state;
  }
};

export default data_exploration;
