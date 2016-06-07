'use strict';

export const SUBMISSIONS_REQUEST_STARTED = 'SUBMISSIONS_REQUEST_STARTED';
export const SUBMISSIONS_REQUEST_SUCCESS = 'SUBMISSIONS_REQUEST_SUCCESS';
export const SUBMISSIONS_REQUEST_FAILED = 'SUBMISSIONS_REQUEST_FAILED';

export const SET_ACTIVE_SUBMISSION = 'SET_ACTIVE_SUBMISSION';
export const UPDATE_ACTIVE_SUBMISSION = 'UPDATE_ACTIVE_SUBMISSION';

export const WIDGET_UPDATE = 'WIDGET_UPDATE';
export const WIDGET_MOVE = 'WIDGET_MOVE';

export const FORM_REQUEST_STARTED = 'FORM_REQUEST_STARTED';
export const FORM_REQUEST_SUCCESS = 'FORM_REQUEST_SUCCESS';
export const FORM_REQUEST_FAILURE = 'FORM_REQUEST_FAILURE';
export const FORM_APPEND_WIDGET = 'FORM_APPEND_WIDGET';

export const FORMS_REQUEST_STARTED = 'FORMS_REQUEST_STARTED';
export const FORMS_REQUEST_SUCCESS = 'FORMS_REQUEST_SUCCESS';
export const FORMS_REQUEST_FAILURE = 'FORMS_REQUEST_FAILURE';

export const FORM_REQUEST_EDIT_ACCESS = 'FORM_REQUEST_EDIT_ACCESS';
export const FORM_EDIT_ACCEPTED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_DENIED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_LEAVE = 'FORM_EDIT_LEAVE';

export const FORM_GALLERY_REQUEST = 'FORM_GALLERY_REQUEST';
export const FORM_GALLERY_SUCCESS = 'FORM_GALLERY_SUCCESS';
export const FORM_GALLERY_ERROR = 'FORM_GALLERY_ERROR';

export const FORM_SUB_SENT_TO_GALLERY = 'FORM_SUBMISSION_SENT_TO_GALLERY';
export const FORM_SUB_REMOVED_FROM_GALLERY = 'FORM_SUB_REMOVED_FROM_GALLERY';

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

export const formRequestStarted = id => {
  return {
    type: FORM_REQUEST_STARTED,
    id
  };
};

export const formRequestSuccess = form => {
  return {
    type: FORM_REQUEST_SUCCESS,
    form
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

export const fetchForms = () => {
  return (dispatch, getState) => {
    dispatch(formsRequestStarted());

    fetch(`${getState().app.pillarHost}/api/forms`)
      .then(res => res.json())
      .then(forms => dispatch(formsRequestSuccess(forms)))
      .catch(error => dispatch(formsRequestFailure(error)));
  };
};

export const fetchForm = id => {
  return (dispatch, getState) => {
    dispatch(formRequestStarted(id));

    fetch(`${getState().app.pillarHost}/api/form/${id}`)
      .then(res => res.json())
      .then(form => dispatch(formRequestSuccess(form)))
      .catch(error => dispatch(formRequestFailure(error)));
  };
};

export const deleteForm = (name, description, id) => {
  return (dispatch, getState) => {
    dispatch(formRequestStarted(id));
    fetch(`${getState().app.pillarHost}/api/form/${id}`, getInit({ name, description }, 'DELETE'))
      .then(res => res.json())
      .then(deletedForm => {
        dispatch(deleteSuccessful(deletedForm));
        dispatch(formRequestSuccess(deletedForm, 'delete'));
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

export const appendWidget = type => {
  return {
    type: FORM_APPEND_WIDGET,
    widget: type
  };
};

export const updateWidget = (id, data) => {
  return {
    type: WIDGET_UPDATE,
    data,
    id
  };
};

export const moveWidget = (from, to) => {
  return {
    type: WIDGET_MOVE,
    from,
    to
  };
};

export const submissionsFetched = submissions => ({
  type: SUBMISSIONS_REQUEST_SUCCESS,
  submissions
});

export const submissionsFetchError = error => {
  return {
    type: SUBMISSIONS_REQUEST_FAILED,
    error
  };
};

export const setActiveSubmission = submission => ({
  type: SET_ACTIVE_SUBMISSION,
  submission
});

export const updateActiveSubmission = props => ({
  type: UPDATE_ACTIVE_SUBMISSION,
  props
});

export const saveForm = (form, widgets, host) => () => {
  const data = Object.assign({}, form);
  data.steps[0].widgets = widgets;
  fetch(`${host}/create`, {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(json => alert(json.id));
};

export const fetchSubmissions = formId => {
  return (dispatch, getState) => {
    const {app} = getState();
    fetch(`${app.pillarHost}/api/form_submissions/${formId}`)
      .then(res => res.json())
      .then(submissions => dispatch(submissionsFetched(submissions)))
      .catch(error => dispatch(submissionsFetchError(error)));
  };
};

export const updateSubmission = props => dispatch => {
  dispatch(updateActiveSubmission(props));
  // TODO: go to server when API is done
};

const requestGallery = () => {
  return {type: FORM_GALLERY_REQUEST};
};

const receivedGallery = gallery => {
  return {type: FORM_GALLERY_SUCCESS, gallery};
};

const galleryRequestError = error => {
  return {type: FORM_GALLERY_ERROR, error};
};

export const fetchGallery = formId => {
  return (dispatch, getState) => {
    dispatch(requestGallery(formId));

    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_galleries/${formId}`)
      .then(res => res.json())
      .then(galleries => dispatch(receivedGallery(galleries[0])))
      .catch(error => dispatch(galleryRequestError(error)));
  };
};

export const sendToGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_gallery/${galleryId}/add/${subId}/${answerId}`, {
      method: 'PUT',
      model: 'cors'
    })
      .then(res => res.json())
      .then(submission => {
        dispatch({type: FORM_SUB_SENT_TO_GALLERY, submission});
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const removeFromGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const options = {method: 'DELETE', model: 'cors'};

    fetch(`${app.pillarHost}/api/form_gallery/${galleryId}/remove/${subId}/${answerId}`, options)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log('failed to remove from gallery', error);
      });
  };
};
