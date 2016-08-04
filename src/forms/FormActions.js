'use strict';

import cloneDeep from 'lodash/lang/cloneDeep';

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
export const FORM_DELETE_WIDGET = 'FORM_DELETE_WIDGET';
export const FORM_DUPLICATE_WIDGET = 'FORM_DUPLICATE_WIDGET';

export const FORM_CREATE_INIT = 'FORM_CREATE_INIT';
export const FORM_CREATED = 'FORM_CREATED';
export const FORM_CREATION_FAILURE = 'FORM_CREATION_FAILURE';
export const FORM_UPDATE = 'FORM_UPDATE';

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

export const FORM_STATUS_UPDATED = 'FORM_STATUS_UPDATED';
export const FORM_STATUS_UPDATE_ERROR = 'FORM_STATUS_UPDATE_ERROR';

export const FORM_ANSWER_SENT_TO_GALLERY = 'FORM_ANSWER_SENT_TO_GALLERY';
export const FORM_ANSWER_REMOVED_FROM_GALLERY = 'FORM_ANSWER_REMOVED_FROM_GALLERY';

export const FORM_ANSWER_REINSERT = 'FORM_ANSWER_REINSERT';

export const FORM_DELETED = 'FORM_DELETED';

export const FORM_CREATE_EMPTY= 'FORM_CREATE_EMPTY';

export const FORM_REPLACE_WIDGETS = 'FORM_REPLACE_WIDGETS';

export const ANSWER_EDIT_BEGIN = 'ANSWER_EDIT_BEGIN';
export const ANSWER_EDIT_UPDATE = 'ANSWER_EDIT_UPDATE';
export const ANSWER_EDIT_CANCEL = 'ANSWER_EDIT_CANCEL';
export const ANSWER_EDIT_REQUEST = 'ANSWER_EDIT_REQUEST';
export const ANSWER_EDIT_SUCCESS = 'ANSWER_EDIT_SUCCESS';
export const ANSWER_EDIT_FAILED = 'ANSWER_EDIT_FAILED';

export const FORM_EDIT_INIT = 'FORM_EDIT_INIT';
export const FORM_EDIT_SUCCESS = 'FORM_EDIT_SUCCESS';
export const FORM_EDIT_FAILURE = 'FORM_EDIT_FAILURE';

export const UPDATE_FORM_INACTIVE_MESSAGE_INIT = 'UPDATE_FORM_INACTIVE_MESSAGE_INIT';
export const UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS = 'UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS';
export const UPDATE_FORM_INACTIVE_MESSAGE_FAILURE = 'UPDATE_FORM_INACTIVE_MESSAGE_FAILURE';

export const FORM_DRAG_ENDED = 'FORM_DRAG_ENDED';

export const PUBLISH_GALLERY_INIT = 'PUBLISH_GALLERY_INIT';
export const PUBLISH_GALLERY_SUCCESS = 'PUBLISH_GALLERY_SUCCESS';
export const PUBLISH_GALLERY_FAILURE = 'PUBLISH_GALLERY_FAILURE';

export const UPDATE_GALLERY_TITLE = 'UPDATE_GALLERY_TITLE';
export const UPDATE_GALLERY_DESCRIPTION = 'UPDATE_GALLERY_DESCRIPTION';
export const UPDATE_READER_INFO_PLACEMENT = 'UPDATE_READER_INFO_PLACEMENT';
export const UPDATE_GALLERY_ORIENTATION = 'UPDATE_GALLERY_ORIENTATION';

export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const CLEAN_SUBMISSION_FILTERS = 'CLEAN_SUBMISSION_FILTERS';

export const GALLERY_ENABLE_IDENTIFIABLE = 'GALLERY_ENABLE_IDENTIFIABLE';

export const UPDATE_EDITABLE_PII = 'UPDATE_EDITABLE_PII';
export const RESET_EDITABLE_TEXT = 'RESET_EDITABLE_TEXT';

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


export const deleteSuccessful = (id) => {
  return {
    type: FORM_DELETED,
    id
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
        dispatch(deleteSuccessful(id));
        // FIXME: Pillar returns 'null' for deleted forms.
        //dispatch(formRequestSuccess(deletedForm, 'delete'));
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

export const createEmpty = () => (dispatch, getState) =>
dispatch(createEmptyAction(`${getState().app.pillarHost}/api/form_submission/`));

const createEmptyAction = saveDestination => ({
  type: FORM_CREATE_EMPTY,
  saveDestination
});

export const replaceWidgets = fields => {
  return {
    type: FORM_REPLACE_WIDGETS,
    widgets: fields
  };
};

export const appendWidget = (type, targetPosition) => {
  return {
    type: FORM_APPEND_WIDGET,
    widget: type,
    targetPosition: targetPosition
  };
};

export const duplicateWidget = (position) => {
  return {
    type: FORM_DUPLICATE_WIDGET,
    position
  };
};

export const deleteWidget = (widgetPosition) => {
  return {
    type: FORM_DELETE_WIDGET,
    widgetPosition
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

export const updateForm = (data) => {
  return {
    type: FORM_UPDATE,
    data
  };
};

export const submissionsFetched = (counts, submissions) => ({
  type: SUBMISSIONS_REQUEST_SUCCESS,
  submissions,
  counts
});

export const submissionsFetchError = error => {
  return {
    type: SUBMISSIONS_REQUEST_FAILED,
    error
  };
};

export const setActiveSubmission = submissionId => ({
  type: SET_ACTIVE_SUBMISSION,
  submissionId
});

export const updateActiveSubmission = props => ({
  type: UPDATE_ACTIVE_SUBMISSION,
  props
});

const formCreated = form => {
  return {type: FORM_CREATED, form};
};

const formCreationFailure = error => {
  return {type: FORM_CREATION_FAILURE, error};
};

export const saveForm = (form, widgets) => {
  const data = Object.assign({}, form);
  data.steps[0].widgets = widgets;

  // FIXME: remove this hotfix
  data.status = form.settings.isActive ? 'open' : 'closed';

  return (dispatch, getState) => {

    const {app} = getState();
    data.settings.saveDestination =  `${app.pillarHost}/api/form_submission/`;

    dispatch({type: FORM_CREATE_INIT, data});
    return fetch(`${app.elkhornHost}/create`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      dispatch(formCreated(json));
      return json;
    })
    .catch(error => {
      dispatch(formCreationFailure(error));
    });

  };

};

export const editForm = (form) => {
  const data = {...form};

  return (dispatch, getState) => {
    const {app} = getState();

    dispatch({type: FORM_EDIT_INIT, data});
    return fetch(`${app.elkhornHost}/create`, getInit(data, 'POST'))
    .then(res => res.json())
    .then(json => {
      dispatch({type: FORM_EDIT_SUCCESS, data: json});
      return json;
    })
    .catch(error => {
      dispatch({type: FORM_EDIT_FAILURE, error});
    });
  };
};

export const updateInactiveMessage = (message, form) => {
  const formData = {...form};
  formData.settings.inactiveMessage = message;

  return (dispatch, getState) => {
    const {app} = getState();

    dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_INIT});
    return fetch(`${app.elkhornHost}/create`, getInit(formData, 'POST'))
    .then(res => res.json())
    .then(json => {
      dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS, data: json});
      return json;
    })
    .catch(error => {
      dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_FAILURE, error});
    });
  };
};

export const fetchSubmissions = (formId, page = 0) => {
  return (dispatch, getState) => {
    const { app, forms } = getState();
    const { submissionOrder, submissionFilterBy, submissionSearch } = forms;
    const filterBy = submissionFilterBy === 'default' ? '' : submissionFilterBy;
    const skip = page * 10;
    return fetch(`${app.pillarHost}/api/form_submissions/${formId}?skip=${skip}&limit=10&orderby=${submissionOrder}&filterby=${filterBy}&search=${submissionSearch}`)
      .then(res => res.json())
      .then(data => dispatch(submissionsFetched(data.counts, data.submissions || [])))
      .catch(error => dispatch(submissionsFetchError(error)));
  };
};

// Receives an object of <string>, <bool> elements like {flagged: true, bookmarked: false}
// and updates the submission flags. The flags attribute on a submission is
// an array of strings. For example `flags: ["flagged", "bookmarked"]`

export const updateSubmissionFlags = props => (dispatch, getState) => {
  const state = getState();
  const { activeSubmission } = state.forms;
  const keys = Object.keys(props);

  // Create an array with the old and new flags
  const allKeys = keys.concat(state.forms[activeSubmission].flags);

  dispatch(updateActiveSubmission({
    // remove the flags that are for removing and prevent duplicates using a Set
    flags: [...new Set(allKeys.filter(k => props[k] !== false))]
  }));

  // Perform an http request for each flag passed in the original object
  // and return the responses as an array (we are not using it but is good
  // to return the promise so the caller know when everything is done)
  return Promise.all(keys.map(prop =>
    fetch(`${state.app.pillarHost}/api/form_submission/${activeSubmission}/flag/${prop}`,
          { method: props[prop] ? 'PUT': 'DELETE', mode: 'cors' })
    .then(res=> res.json())
  ));
};

const requestGallery = () => {
  console.log(FORM_GALLERY_REQUEST);
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
      mode: 'cors'
    })
      .then(res => res.json())
      .then(gallery => {
        dispatch({type: FORM_ANSWER_SENT_TO_GALLERY, gallery});
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const answerRemovedFromGallery = gallery => {
  return {
    type: FORM_ANSWER_REMOVED_FROM_GALLERY,
    gallery
  };
};

export const removeFromGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const options = {method: 'DELETE', mode: 'cors'};

    fetch(`${app.pillarHost}/api/form_gallery/${galleryId}/remove/${subId}/${answerId}`, options)
      .then(res => res.json())
      .then(gallery => dispatch(answerRemovedFromGallery(gallery)))
      .catch(error => {
        console.log('failed to remove from gallery', error);
      });
  };
};

export const updateFormStatus = (formId, status) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const options = {method: 'PUT', mode: 'cors'};

    fetch(`${app.pillarHost}/api/form/${formId}/status/${status}`, options)
      .then(res => res.json())
      .then(form => dispatch({type: FORM_STATUS_UPDATED, form, status}))
      .catch(error => dispatch({type: FORM_STATUS_UPDATE_ERROR, error}));
  };
};

// user opens the Edit Answer modal
export const beginEdit = (galleryId, submissionId, answerId) => {
  return (dispatch, getState) => {

    const {forms} = getState();
    const answerKey = `${submissionId}|${answerId}`;
    const reply = forms[answerKey];
    const editableAnswer = reply.answer.edited ? reply.answer.edited : reply.answer.answer.text;
    // deep clone on the array
    const editablePii = reply.identity_answers ? reply.identity_answers.map(a => cloneDeep(a)) : [];

    dispatch({
      type: ANSWER_EDIT_BEGIN,
      answerId,
      submissionId,
      editableAnswer,
      editablePii,
      answerKey
    });
  };
};

// user starts typing and changing the Answer
export const updateEditableAnswer = text => {
  return {type: ANSWER_EDIT_UPDATE, text};
};

export const cancelEdit = () => {
  return {type: ANSWER_EDIT_CANCEL};
};

// this just resets the editable text to the original
// it does NOT remove the edit on the data object.
export const resetEditableTextToOriginal = (answer) => {
  return {type: RESET_EDITABLE_TEXT, text: answer.answer.answer.text};
};

export const updateEditablePii = (reply, idAnswer, value) => {
  return (dispatch, getState) => {

    const {forms: {editablePii: editablePii}} = getState();

    console.log('updateEditablePii', reply, idAnswer, value, editablePii);

    // set the new value to the edited field in the editablePII array
    const newEditablePii = editablePii.map(entry => {
      if (entry.widget_id === idAnswer.widget_id) {
        return {...entry, edited: value};
      } else {
        return {...entry};
      }
    });

    dispatch({type: UPDATE_EDITABLE_PII, editablePii: newEditablePii});
  };
};

// post updates to the server
// answer_id is the same as widget_id if updating PII
export const editAnswer = (edited, submission_id, answer_id, formId) => {
  return (dispatch, getState) => {
    dispatch({type: ANSWER_EDIT_REQUEST});

    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_submission/${submission_id}/${answer_id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({edited})
    })
      .then(res => res.json())
      .then(submission => {
        dispatch({type: ANSWER_EDIT_SUCCESS, submission});
        // just re-fetch the gallery instead of trying to munge the state
        dispatch(fetchGallery(formId));
      })
      .catch(error => dispatch({type: ANSWER_EDIT_FAILED, error}));
  };
};

export const updateGalleryTitle = title => {
  return {type: UPDATE_GALLERY_TITLE, title};
};

export const updateGalleryDesc = description => {
  return {type: UPDATE_GALLERY_DESCRIPTION, description};
};

export const updateReaderInfoPlacement = placement => {
  return {type: UPDATE_READER_INFO_PLACEMENT, placement};
};

export const updateGalleryOrientation = orientation => {
  return {type: UPDATE_GALLERY_ORIENTATION, orientation};
};

/*

{id} is the id of a widget in a form
{add} is a boolean indicating whether the id should be added or removed

*/
export const toggleIdentifiable = (id, add) => {
  return (dispatch, getState) => {
    const { forms } = getState();
    const oldIds = forms[forms.activeGallery].config.identifiableIds || [];

    let ids;

    if (add) { // add the new id
      ids = [id, ...oldIds];
    } else { // splice out the old one
      ids = [...oldIds];
      ids.splice(ids.indexOf(id), 1);
    }

    dispatch({type: GALLERY_ENABLE_IDENTIFIABLE, ids});
  };
};

export const publishGallery = () => {
  return (dispatch, getState) => {
    const {app, forms} = getState();
    const { activeGallery } = forms;
    const gallery = forms[activeGallery];
    /*const {
      identifiableIds
    } = forms;*/
    dispatch({type: PUBLISH_GALLERY_INIT});


    return fetch(`${app.elkhornHost}/gallery/${gallery.id}/publish`, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(gallery)
    })
    .then(res => res.json())
    .then(gallery => {
      console.log(gallery);
      dispatch({type: PUBLISH_GALLERY_SUCCESS, gallery});
      return gallery;
    })
    .catch(error => dispatch({type: PUBLISH_GALLERY_FAILURE, error}));
  };
};

export const updateFilterBy = filterBy => ({
  type: UPDATE_FILTER_BY,
  value: filterBy
});

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  value: order
});

export const updateSearch = search => ({
  type: UPDATE_SEARCH,
  value: search
});

export const cleanSubmissionFilters = () => ({
  type: CLEAN_SUBMISSION_FILTERS
});

export const hasFlag = (submission, flag) => -1 !== submission.flags.indexOf(flag);

export const formDragEnded = () => ({ type: FORM_DRAG_ENDED });

export const reinsertGalleryAnswer = (galleryId, key, position) => ({
  type: FORM_ANSWER_REINSERT,
  galleryId,
  key,
  position
});
