
/**
 * Module constants
 */

const API_PREFIX = '/api/';

/**
 * Action names
 */

export const TAG_REQUEST_STARTED = 'TAG_REQUEST_STARTED';
export const TAG_REQUEST_SUCCESS = 'TAG_REQUEST_SUCCESS';
export const TAG_REQUEST_FAILURE = 'TAG_REQUEST_FAILURE';

export const REQUEST_ALL_TAGS = 'REQUEST_ALL_TAGS';
export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const ALL_TAGS_REQUEST_ERROR = 'ALL_TAGS_REQUEST_ERROR';

/**
 * Aux functions
 */

const getInit = (body, method) => ({
  method: method || 'POST',
  headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
  mode: 'cors',
  body: body ? JSON.stringify(body) : undefined
});

/**
 * Action creators
 */

const tagRequestStarted = () => ({ type: TAG_REQUEST_STARTED });

const tagRequestSuccess = (payload, index, requestType) => ({
  type: TAG_REQUEST_SUCCESS,
  payload,
  index,
  requestType
});

const tagRequestFailure = err => ({ type: TAG_REQUEST_FAILURE, err });

const receiveAllTags = tags => ({ type: RECEIVE_ALL_TAGS, tags });

const requestAllTags = () => ({ type: REQUEST_ALL_TAGS });

const allTagsRequestError = err => ({ type: ALL_TAGS_REQUEST_ERROR, err });

/**
 * Actions API
 */

export const getTags = () => (dispatch, getState) => {
  dispatch(tagRequestStarted());
  return fetch(getState().app.pillarHost + API_PREFIX + 'tags', getInit(null, 'GET'))
    .then(
      response => {
        return response.ok ? response.json() : Promise.reject(response.status + ' ' + response.statusText);
      }
    )
    .then(tags => {
      return dispatch(tagRequestSuccess(tags, null, 'list'));
    })
    .catch(error => dispatch(tagRequestFailure(error)));
};

export const storeTag = (tagName, tagDescription, index, oldValue) => (dispatch, getState) => {
  dispatch(tagRequestStarted());

  var preparedTag = { 'name': tagName, 'description': tagDescription };
  if (typeof oldValue != 'undefined') {
    preparedTag['old_name'] = oldValue;
  }
  return fetch(getState().app.pillarHost + API_PREFIX + 'tag', getInit(preparedTag))
    .then(response => {
        return response.ok ? response.text() : Promise.reject(response.status + ' ' + response.statusText);
      })
    .then(responseText => {
      // Temporary fix, errors from pillar are not in JSON notation.
      try {
        var responseJson = JSON.parse(responseText);
        dispatch(tagRequestSuccess(responseJson, index, 'create'));
      } catch(e) {
        dispatch(tagRequestFailure('Error from pillar: ' + responseText));
      }
    })
    .catch(error => dispatch(tagRequestFailure(error)));
};

export const deleteTag = (tagName, tagDescription, index) => (dispatch, getState) => {
  dispatch(tagRequestStarted());
  return fetch(getState().app.pillarHost + API_PREFIX + 'tag', getInit({ 'name': tagName, 'description': tagDescription }, 'DELETE'))
    .then(response => {
        return response.ok ? response : Promise.reject(response.status + ' ' + response.statusText);
      })
    .then(deletedTag => dispatch(tagRequestSuccess(deletedTag, index, 'delete')))
    .catch(error => dispatch(tagRequestFailure(error)));
};

export const fetchAllTags = () => (dispatch, getState) => {
  if (!getState().loadingTags) {
    dispatch(requestAllTags());

    return fetch(getState().app.pillarHost + '/api/tags')
      .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status + ' ' + res.statusText);
      })
      .then(json => {
        dispatch(receiveAllTags(json));
      }).catch(err => {
        dispatch(allTagsRequestError(err));
      });
  } else {
    return false;
  }
};
