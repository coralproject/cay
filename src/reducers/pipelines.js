import * as types from '../actions';

const initialState = {
  loading: false,
  pipelines: []
};

const pipelines = (state = initialState, action) => {

  switch (action.type) {
  case types.PIPELINE_SELECTED:
    return state;

  case types.PIPELINES_REQUEST:
    return Object.assign({}, state, {loading: true});

  case types.PIPELINE_REQUEST:
    return state; // query one pipeline?

  case types.PIPELINES_REQUEST_FAILURE:
    return Object.assign({}, state, {loading: false, showTheError: 'TODO'});

  case types.PIPELINES_RECEIVED:
    return Object.assign({}, state, { loading: false, pipelines: action.pipelines } );

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default pipelines;
