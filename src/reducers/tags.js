import * as types from '../actions/tags';

const initialState = {
  loading: false
};

const tags = (state = initialState, action) => {

  switch (action.type) {
  case types.TAG_CREATION_STARTED:
    return Object.assign({}, state, {loading: true, hasErrors: false });

  case types.TAG_CREATION_SUCCESS:
    return Object.assign({}, state, {loading: false, hasErrors: false });

  case types.TAG_CREATION_FAILURE:
    return Object.assign({}, state, {loading: false, hasErrors: true, errorMsg: 'Tag creation failed.'});

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default tags;
