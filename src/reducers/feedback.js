import * as types from '../actions/feedback';

const initialState = {
  loading: false
};

const feedback = (state = initialState, action) => {
  switch (action.type) {

  case types.FEEDBACK_REQUEST_STARTED:
    return Object.assign({}, state, {loading: true});    

  default:
    return state;
  }
};

export default feedback;
