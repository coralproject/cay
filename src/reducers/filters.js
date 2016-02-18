import * as types from '../actions';

const initialState = {

};

const filters = (state = initialState, action) => {
  switch (action.type) {

  case types.CREATE_QUERY:
    return state;

  case types.FILTER_CHANGED:
    return Object.assign({}, state, { [action.fieldName]: action.value });

  default:
    return state;

  }
};

export default filters;
