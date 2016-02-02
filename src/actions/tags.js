// Local constants
const PILLAR_HOST = 'http://localhost:8080/';
const API_PREFIX = 'api/';

// Exported constants
export const TAG_CREATION_STARTED = 'TAG_CREATION_STARTED';
export const TAG_CREATION_SUCCESS = 'TAG_CREATION_SUCCESS';
export const TAG_CREATION_FAILURE = 'TAG_CREATION_FAILURE';

var getInit = (jsonObject) => {
  
  var headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  var init = {
    method: 'POST',
    headers: headers,
    mode: 'no-cors',
    cache: 'default',
    body: JSON.stringify(jsonObject)
  };

  return init;
};

export const storeTag = (tagName) => {
  return (dispatch) => {
    dispatch(tagCreationStarted(tagName));
    fetch(PILLAR_HOST + API_PREFIX + 'tag', getInit({ 'name': tagName, 'description': '' }))
      .then(response => response)
      .then(storedTag => dispatch(tagCreationSuccess(storedTag)))
      .catch(error => dispatch(tagCreationFailure(error)));
  };
};

export const tagCreationStarted = (tagName) => {
  return {
    type: TAG_CREATION_STARTED,
    tagName
  };
};

export const tagCreationSuccess = (storedTag) => {
  return {
    type: TAG_CREATION_SUCCESS,
    storedTag
  };
};

export const tagCreationFailure = (err) => {
  return {
    type: TAG_CREATION_FAILURE,
    err
  };
};