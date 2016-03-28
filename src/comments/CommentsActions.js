import {authXenia} from 'app/AppActions';

export const COMMENT_CLICK = 'COMMENT_CLICK';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';
export const STORE_COMMENTS = 'STORE_COMMENTS';
export const CLEAR_COMMENT_ITEMS = 'CLEAR_COMMENT_ITEMS';


export const requestComments = () => {
  return {
    type: COMMENTS_REQUEST
  };
};

export const receiveComments = (data) => {
  return {
    type: COMMENTS_SUCCESS,
    data
  };
};

export const receiveCommentsFailure = (err) => {
  return {
    type: COMMENTS_FAIL,
    err
  };
};

/* xenia_package */
export const fetchCommentsByUser = (user_id) => {

  return (dispatch, getState) => {
    const url = `${getState().app.xeniaHost}/1.0/exec/comments_by_user?user_id=${user_id}`;

    dispatch(clearCommentItems());
    dispatch(requestComments());

    var myRequest = new Request(url, authXenia());

    fetch(myRequest)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComments(json));
        dispatch(storeComments(json));
      })
      .catch(err => dispatch(receiveCommentsFailure(err)));
  };
};


export const clearCommentItems = () => {
  return {
    type: CLEAR_COMMENT_ITEMS
  };
};

export const storeComments = (data) => {
  return {
    type: STORE_COMMENTS,
    data
  };
};
