// Local constants
const PILLAR_HOST = 'http://localhost:8080/';
const API_PREFIX = 'api/';

// Exported constants
export const TAG_CREATION_STARTED = 'TAG_CREATION_STARTED';
export const TAG_CREATION_SUCCESS = 'TAG_CREATION_SUCCESS';
export const TAG_CREATION_FAILURE = 'TAG_CREATION_FAILURE';

export const TAG_REQUEST_STARTED = 'TAG_REQUEST_STARTED';
export const TAG_REQUEST_SUCCESS = 'TAG_REQUEST_SUCCESS';
export const TAG_REQUEST_FAILURE = 'TAG_REQUEST_FAILURE';

export const TAG_DELETE_STARTED = 'TAG_DELETE_STARTED';
export const TAG_DELETE_SUCCESS = 'TAG_DELETE_SUCCESS';
export const TAG_DELETE_FAILURE = 'TAG_DELETE_FAILURE';


var getInit = (body, method) => {
  
  var headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  var init = {
    method: method || 'POST',
    headers: headers,
    mode: 'cors'
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return init;
};

// Functions
export const getTags = () => {
  return (dispatch) => {
    dispatch(tagRequestStarted());
    fetch(PILLAR_HOST + API_PREFIX + 'tags', getInit(null, 'GET'))
      .then(response => response.json())
      .then(tags => dispatch(tagRequestSuccess(tags)))
      .catch(error => dispatch(tagRequestFailure(error)));
  };
};

export const storeTag = (tagName, tagDescription, index) => {
  return (dispatch) => {
    dispatch(tagCreationStarted(tagName));
    fetch(PILLAR_HOST + API_PREFIX + 'tag', getInit({ 'name': tagName, 'description': tagDescription }))
      .then(response => response.json())
      .then(storedTag => dispatch(tagCreationSuccess(storedTag, index)))
      .catch(error => dispatch(tagCreationFailure(error)));
  };
};

export const deleteTag = (tagName, tagDescription, index) => {
  return (dispatch) => {
    dispatch(tagDeleteStarted(tagName));
    fetch(PILLAR_HOST + API_PREFIX + 'tag', getInit({ 'name': tagName, 'description': tagDescription }, 'DELETE'))
      .then(response => response)
      .then(deletedTag => dispatch(tagDeleteSuccess(deletedTag, index)))
      .catch(error => dispatch(tagDeleteFailure(error)));
  };
};

// Actions
export const tagCreationStarted = (tagName) => {
  return {
    type: TAG_CREATION_STARTED,
    tagName
  };
};

export const tagCreationSuccess = (storedTag, index) => {
  return {
    type: TAG_CREATION_SUCCESS,
    storedTag,
    index
  };
};

export const tagCreationFailure = (err) => {
  return {
    type: TAG_CREATION_FAILURE,
    err
  };
};

export const tagRequestStarted = () => {
  return {
    type: TAG_REQUEST_STARTED
  };
};

export const tagRequestSuccess = (tags) => {
  return {
    type: TAG_REQUEST_SUCCESS,
    tags
  };
};

export const tagRequestFailure = (err) => {
  return {
    type: TAG_REQUEST_FAILURE,
    err
  };
};

export const tagDeleteStarted = () => {
  return {
    type: TAG_DELETE_STARTED
  };
};

export const tagDeleteSuccess = (deletedTag, index) => {
  return {
    type: TAG_DELETE_SUCCESS,
    index
  };
};

export const tagDeleteFailure = (err) => {
  return {
    type: TAG_DELETE_FAILURE,
    err
  };
};