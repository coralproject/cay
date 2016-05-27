
import { xenia } from 'app/AppActions';

export const FORM_REQUEST_STARTED = 'FORM_REQUEST_STARTED';
export const FORM_REQUEST_SUCCESS = 'FORM_REQUEST_SUCCESS';
export const FORM_REQUEST_FAILURE = 'FORM_REQUEST_FAILURE';

export const FORMS_REQUEST_STARTED = 'FORMS_REQUEST_STARTED';
export const FORMS_REQUEST_SUCCESS = 'FORMS_REQUEST_SUCCESS';
export const FORMS_REQUEST_FAILURE = 'FORMS_REQUEST_FAILURE';

export const FORM_REQUEST_EDIT_ACCESS = 'FORM_REQUEST_EDIT_ACCESS';
export const FORM_EDIT_ACCEPTED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_DENIED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_LEAVE = 'FORM_EDIT_LEAVE';

export const FORM_DELETED = 'FORM_DELETED';

export const FORM_CREATE_EMPTY= 'FORM_CREATE_EMPTY';

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

export const formRequestStarted = () => {
  return {
    type: FORM_REQUEST_STARTED
  };
};

export const formRequestSuccess = (payload, index, requestType) => {
  return {
    type: FORM_REQUEST_SUCCESS,
    payload,
    index,
    requestType
  };
};

export const formRequestFailure = (err) => {
  return {
    type: FORM_REQUEST_FAILURE,
    err
  };
};

export const formsRequestStarted = () => {
  return {
    type: FORMS_REQUEST_STARTED
  };
};

export const formsRequestSuccess = forms => {
  return {
    type: FORMS_REQUEST_SUCCESS,
    forms
  };
};

export const formsRequestFailure = err => {
  return {
    type: FORMS_REQUEST_FAILURE,
    err
  };
};


export const deleteSuccessful = (form) => {
  return {
    type: FORM_DELETED,
    form
  };
};

export const formRequestEditAccess = formId => {
  return {
    type: FORM_REQUEST_EDIT_ACCESS,
    formId,
    publish: true
  };
};

export const formLeaveEdit = formId => {
  return {
    type: FORM_EDIT_LEAVE,
    formId,
    publish: true
  };
};

export const deleteForm = (name, description, index) => {
  return (dispatch, getState) => {
    dispatch(formRequestStarted());
    fetch(`${getState().app.pillarHost}${API_PREFIX}tag`, getInit({ name, description }, 'DELETE'))
      .then(res => res.json())
      .then(deletedForm => {
        dispatch(deleteSuccessful(deletedForm));
        dispatch(formRequestSuccess(deletedForm, index, 'delete'));
      })
      .catch(error => dispatch(formRequestFailure(error)));
  };
};

export const requestEditAccess = formId => {
  return dispatch => {
    dispatch(formRequestEditAccess(formId));
  };
};

export const leavingEdit = formId => {
  return dispatch => {
    dispatch(formLeaveEdit(formId));
  };
};

export const createEmpty = () => {
  return {
    type: FORM_CREATE_EMPTY
  };
};

export const listForms = () => dispatch => {
  xenia().collection('forms').skip(0)
  .exec()
    .then(res => dispatch(formsRequestSuccess(res.results[0].Docs)))
    .catch(err => dispatch(formsRequestFailure(err)));
};
