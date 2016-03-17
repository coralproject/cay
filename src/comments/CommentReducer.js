import * as types from 'comments/CommentsActions';

const initialState = {
  loading: false,
  item: []
};

const comments = (state = initialState, action) => {
  switch (action.type) {
  case types.COMMENT_CLICK:
    return state;

  case types.COMMENTS_REQUEST:
    return Object.assign({}, state, {loading: true});

  case types.COMMENTS_SUCCESS:
    return Object.assign({}, state, {items: action.data.results[0].Docs});

  case types.COMMENTS_FAIL:
    return Object.assign({}, state, {items: []});

  default:
    return state;
  }
}

export default comments;
