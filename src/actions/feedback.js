// Local constants
const EMAIL_HOST = 'https:/something/';

// Exported constants
export const FEEDBACK_REQUEST_STARTED = 'FEEDBACK_REQUEST_STARTED';
export const FEEDBACK_REQUEST_SUCCESS = 'FEEDBACK_REQUEST_SUCCESS';
export const FEEDBACK_REQUEST_FAILURE = 'FEEDBACK_REQUEST_FAILURE';

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
export const sendMessage = (email, message) => {
  return (dispatch) => {
    dispatch(feedbackRequestStarted());

    fetch('[host/sendMessage]', getInit({ email: email, message: message }))
      .then(response => response.text())
      .then(responseText => {
        dispatch(feedbackRequestSuccess(responseText));
      })
      .catch(error => dispatch(feedbackRequestFailure(error)));
    
  };
};

// Actions
export const feedbackRequestStarted = () => {
  return {
    type: FEEDBACK_REQUEST_STARTED
  };
};

export const feedbackRequestSuccess = (response) => {
  return {
    type: FEEDBACK_REQUEST_SUCCESS,
    payload
  };
};

export const feedbackRequestFailure = (err) => {
  return {
    type: FEEDBACK_REQUEST_FAILURE,
    err
  };
};
