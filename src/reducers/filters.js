import * as types from '../actions';

const initialState = {

};

const filters = (state = initialState, action) => {
  switch (action.type) {

  case types.USER_QUERY:
    return state;

  case types.FILTER_PARAM:
    console.log(action);
    return state;

  }
};

export default filters;
