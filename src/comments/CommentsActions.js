import {xenia} from 'app/AppActions';

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
  // we should figure out how to paginate this at some point.
  return (dispatch) => {
    dispatch(clearCommentItems());
    dispatch(requestComments());

    xenia({
      name: 'comments_by_userid',
      desc: 'get a reverse chron list of comments'
    }).addQuery().collection('comments')
      .match({user_id: `#objid:${user_id}`})
      .sort(['date_created', -1])
      .skip(0)
      .limit(50)
      // there's a bunch of good stuff here.
      // we need to do another pass to make the comment list more interesting
      .include(['body', 'date_created', 'date_updated'])
      .exec()
      .then(data => {
        dispatch(receiveComments(data));
        dispatch(storeComments(data));
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
