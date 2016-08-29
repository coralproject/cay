
/**
 * Action types
 */

import * as types from 'comments/CommentsActions';

/**
 * Initial state
 */

const initialState = {
  loading: false,
  items: []
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
  switch (action.type) {

  case types.EMPTY_COMMENTS:
    return {...state, items: []};

  case types.FETCH_COMMENTS_REQUEST:
    return {...state, loading: true};

  case types.FETCH_COMMENTS_SUCCESS:
    return {...state, loading: false, items: action.items };

  case types.FETCH_COMMENTS_FAILURE:
    return {...state, items: []};

  default:
    return state;
  }
};
