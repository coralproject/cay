
/**
 * Module dependencies
 */

import { xenia } from 'app/AppActions';

/**
 * Action names
 */

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const EMPTY_COMMENTS = 'EMPTY_COMMENTS';

/**
 * Action creators
 */

const requestComments = () => ({ type: FETCH_COMMENTS_REQUEST });

const receiveComments = data => ({ type: FETCH_COMMENTS_SUCCESS, data });

const receiveCommentsFailure = err => ({ type: FETCH_COMMENTS_FAILURE, err });

const emptyComments = () => ({ type: EMPTY_COMMENTS });

/**
 * Actions API
 */

// TODO: we should figure out how to paginate this at some point.
export const fetchCommentsByUser = userId => dispatch => {
  dispatch(emptyComments());
  dispatch(requestComments());

  xenia({
    name: 'comments_by_userid',
    desc: 'get a reverse chron list of comments'
  }).addQuery().collection('comments')
    .match({user_id: `#objid:${userId}`})
    .sort(['date_created', -1])
    .skip(0).limit(50)
    .include(['body', 'date_created', 'date_updated'])
    .exec()
    .then(data => dispatch(receiveComments(data.results[0].Docs)))
    .catch(err => dispatch(receiveCommentsFailure(err)));
};

