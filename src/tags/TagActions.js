// Local constants
const API_PREFIX = '/api/';

// Exported constants
export const TAG_REQUEST_STARTED = 'TAG_REQUEST_STARTED';
export const TAG_REQUEST_SUCCESS = 'TAG_REQUEST_SUCCESS';
export const TAG_REQUEST_FAILURE = 'TAG_REQUEST_FAILURE';

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
    fetch(window.pillarHost + API_PREFIX + 'tags', getInit(null, 'GET'))
      .then(
        response => response.json()
      )
      .then(tags => dispatch(tagRequestSuccess(tags, null, 'list')))
      .catch(error => dispatch(tagRequestFailure(error)));
  };
};

export const storeTag = (tagName, tagDescription, index, oldValue) => {
  return (dispatch) => {
    dispatch(tagRequestStarted());

    var preparedTag = { 'name': tagName, 'description': tagDescription };
    if (typeof oldValue != "undefined") {
      preparedTag["old_name"] = oldValue;
    }
    fetch(window.pillarHost + API_PREFIX + 'tag', getInit(preparedTag))
      .then(response => response.text())
      .then(responseText => {
        // Temporary fix, errors from pillar are not in JSON notation.
        try {
          var responseJson = JSON.parse(responseText);
          dispatch(tagRequestSuccess(responseJson, index, 'create'));
        } catch(e) {
          dispatch(tagRequestFailure(responseText));  
        }
      })
      .catch(error => dispatch(tagRequestFailure(error)));
  };
};

export const deleteTag = (tagName, tagDescription, index) => {
  return (dispatch) => {
    dispatch(tagRequestStarted());
    fetch(window.pillarHost + API_PREFIX + 'tag', getInit({ 'name': tagName, 'description': tagDescription }, 'DELETE'))
      .then(response => response)
      .then(deletedTag => dispatch(tagRequestSuccess(deletedTag, index, 'delete')))
      .catch(error => dispatch(tagRequestFailure(error)));
  };
};

export const tagRequestStarted = () => {
  return {
    type: TAG_REQUEST_STARTED
  };
};

export const tagRequestSuccess = (payload, index, requestType) => {
  return {
    type: TAG_REQUEST_SUCCESS,
    payload,
    index,
    requestType
  };
};

export const tagRequestFailure = (err) => {
  return {
    type: TAG_REQUEST_FAILURE,
    err
  };
};
