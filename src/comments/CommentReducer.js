import * as types from 'comments/CommentsActions';

const initialState = {
  loading: false,
  items: [] // eventually this will be multiple arrays for multiple displayed lists
};

const comments = (state = initialState, action) => {
  switch (action.type) {

  case types.CLEAR_COMMENT_ITEMS:
    return {...state, items: []};

  case types.COMMENT_CLICK:
    return state;

  case types.COMMENTS_REQUEST:
    return {...state, loading: true};

  case types.COMMENTS_SUCCESS:
    return {...state, loading: false, items: action.data.results[0].Docs};

  case types.COMMENTS_FAIL:
    return {...state, items: []};

  default:
    return state;
  }
};

export default comments;
