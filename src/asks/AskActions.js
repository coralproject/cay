
const API_PREFIX = '/api/';

export const ASK_REQUEST_STARTED = 'ASK_REQUEST_STARTED';
export const ASK_REQUEST_SUCCESS = 'ASK_REQUEST_SUCCESS';
export const ASK_REQUEST_FAILURE = 'ASK_REQUEST_FAILURE';

export const ASK_DELETED = 'ASK_DELETED';

const getInit = (body, method) => {

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

export const askRequestStarted = () => {
  return {
    type: ASK_REQUEST_STARTED
  };
};

export const askRequestSuccess = (payload, index, requestType) => {
  return {
    type: ASK_REQUEST_SUCCESS,
    payload,
    index,
    requestType
  };
};

export const askRequestFailure = (err) => {
  return {
    type: ASK_REQUEST_FAILURE,
    err
  };
};

export const deleteSuccessful = (ask) => {
  return {
    type: ASK_DELETED,
    ask
  };
};

export const deleteAsk = (name, description, index) => {
  return (dispatch, getState) => {
    dispatch(askRequestStarted());
    fetch(`${getState().app.pillarHost}${API_PREFIX}tag`, getInit({ name, description }, 'DELETE'))
      .then(res => res.json())
      .then(deletedAsk => {
        dispatch(deleteSuccessful(deletedAsk));
        dispatch(askRequestSuccess(deletedAsk, index, 'delete'));
      })
      .catch(error => dispatch(askRequestFailure(error)));
  };
};
