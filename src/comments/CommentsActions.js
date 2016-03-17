export const COMMENT_CLICK = 'COMMENT_CLICK';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';
export const STORE_COMMENTS = 'STORE_COMMENTS';
export const CLEAR_USER_DETAIL_COMMENTS = 'CLEAR_USER_DETAIL_COMMENTS';



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

export const fetchCommentsByUser = (user_id) => {
  const url = `${window.xeniaHost}/1.0/exec/comments_by_user?user_id=${user_id}`;
  return (dispatch) => {

    dispatch(clearUserDetailComments());
    dispatch(requestComments());

    var myRequest = new Request(url, getInit());

    fetch(myRequest)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComments(json));
        dispatch(storeComments(json));
      })
      .catch(err => dispatch(receiveCommentsFailure(err)));
  };
};


export const clearUserDetailComments = () => {
  return {
    type: CLEAR_USER_DETAIL_COMMENTS
  };
};

export const storeComments = (data) => {
  return {
    type: STORE_COMMENTS,
    data
  };
};
