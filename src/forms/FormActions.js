
/**
 * Module dependencies
 */

import cloneDeep from 'lodash/lang/cloneDeep';

/**
 * Action names
 */

export const FETCH_SUBMISSIONS_REQUEST = 'FETCH_SUBMISSIONS_REQUEST';
export const FETCH_SUBMISSIONS_SUCCESS = 'FETCH_SUBMISSIONS_SUCCESS';
export const FETCH_SUBMISSIONS_FAILED = 'FETCH_SUBMISSIONS_FAILED';

export const SET_ACTIVE_SUBMISSION = 'SET_ACTIVE_SUBMISSION';
export const UPDATE_ACTIVE_SUBMISSION = 'UPDATE_ACTIVE_SUBMISSION';

export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const MOVE_WIDGET = 'MOVE_WIDGET';

export const FETCH_FORM_REQUEST = 'FETCH_FORM_REQUEST';
export const FETCH_FORM_SUCCESS = 'FETCH_FORM_SUCCESS';
export const FETCH_FORM_FAILURE = 'FETCH_FORM_FAILURE';
export const APPEND_FORM_WIDGET = 'APPEND_FORM_WIDGET';
export const DELETE_FORM_WIDGET = 'DELETE_FORM_WIDGET';
export const DUPLICATE_FORM_WIDGET = 'DUPLICATE_FORM_WIDGET';

export const CREATE_INIT_FORM = 'CREATE_INIT_FORM';
export const FORM_CREATED = 'FORM_CREATED';
export const FORM_CREATION_FAILURE = 'FORM_CREATION_FAILURE';
export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_FORM_SETTINGS = 'UPDATE_FORM_SETTINGS';
export const UPDATE_FORM_HEADER = 'UPDATE_FORM_HEADER';
export const UPDATE_FORM_FOOTER = 'UPDATE_FORM_FOOTER';
export const UPDATE_FORM_FINISHED_SCREEN = 'UPDATE_FORM_FINISHED_SCREEN';

export const FETCH_FORMS_REQUEST = 'FETCH_FORMS_REQUEST';
export const FETCH_FORMS_SUCCESS = 'FETCH_FORMS_SUCCESS';
export const FETCH_FORMS_FAILURE = 'FETCH_FORMS_FAILURE';

export const REQUEST_EDIT_FORM_ACCESS = 'REQUEST_EDIT_FORM_ACCESS';
export const EDIT_FORM_ACCEPTED = 'FORM_EDIT_FORM_ACCEPTED';
export const EDIT_FORM_DENIED = 'EDIT_FORM_ACCEPTED';
export const EDIT_FORM_LEAVE = 'EDIT_FORM_LEAVE';

export const FETCH_FORM_GALLERY_REQUEST = 'FETCH_FORM_GALLERY_REQUEST';
export const FETCH_FORM_GALLERY_SUCCESS = 'FETCH_FORM_GALLERY_SUCCESS';
export const FETCH_FORM_GALLERY_FAILURE = 'FETCH_FORM_GALLERY_FAILURE';

export const FORM_STATUS_UPDATED = 'FORM_STATUS_UPDATED';
export const FORM_STATUS_UPDATE_ERROR = 'FORM_STATUS_UPDATE_ERROR';

export const FORM_ANSWER_SENT_TO_GALLERY = 'FORM_ANSWER_SENT_TO_GALLERY';
export const FORM_ANSWER_REMOVED_FROM_GALLERY = 'FORM_ANSWER_REMOVED_FROM_GALLERY';

export const FORM_ANSWER_REINSERT = 'FORM_ANSWER_REINSERT';

export const FORM_DELETED = 'FORM_DELETED';

export const CREATE_EMPTY_FORM= 'CREATE_EMPTY_FORM';

export const EDIT_ANSWER_BEGIN = 'EDIT_ANSWER_BEGIN';
export const EDIT_ANSWER_UPDATE = 'EDIT_ANSWER_UPDATE';
export const EDIT_ANSWER_CANCEL = 'EDIT_ANSWER_CANCEL';
export const EDIT_ANSWER_REQUEST = 'EDIT_ANSWER_REQUEST';
export const EDIT_ANSWER_SUCCESS = 'EDIT_ANSWER_SUCCESS';
export const EDIT_ANSWER_FAILED = 'EDIT_ANSWER_FAILED';

export const EDIT_FORM_REQUEST = 'EDIT_FORM_REQUEST';
export const EDIT_FORM_SUCCESS = 'EDIT_FORM_SUCCESS';
export const EDIT_FORM_FAILURE = 'EDIT_FORM_FAILURE';

export const UPDATE_FORM_INACTIVE_MESSAGE_REQUEST = 'UPDATE_FORM_INACTIVE_MESSAGE_REQUEST';
export const UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS = 'UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS';
export const UPDATE_FORM_INACTIVE_MESSAGE_FAILURE = 'UPDATE_FORM_INACTIVE_MESSAGE_FAILURE';

export const FORM_DRAG_ENDED = 'FORM_DRAG_ENDED';
export const FORM_DRAG_STARTED = 'FORM_DRAG_STARTED';

export const PUBLISH_GALLERY_REQUEST = 'PUBLISH_GALLERY_REQUEST';
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

export const COPY_FORM = 'COPY_FORM';

/**
 * Utils
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

const formRequestStarted = id => ({ type: FETCH_FORM_REQUEST, id });
const formRequestSuccess = form => ({ type: FETCH_FORM_SUCCESS, form });
const formRequestFailure = err => ({ type: FETCH_FORM_FAILURE, err });

const formsRequestStarted = () => ({ type: FETCH_FORMS_REQUEST });
const formsRequestSuccess = forms => ({ type: FETCH_FORMS_SUCCESS, forms });
const formsRequestFailure = err => ({ type: FETCH_FORMS_SUCCESS, err });

const deleteSuccessful = id => ({ type: FORM_DELETED, id });

const formRequestEditAccess = formId => ({
  type: REQUEST_EDIT_FORM_ACCESS,
  formId,
  publish: true
});

const formLeaveEdit = formId => ({ type: EDIT_FORM_LEAVE, formId, publish: true });

const createEmptyAction = saveDestination => ({
  type: CREATE_EMPTY_FORM,
  saveDestination
});

const submissionsFetched = (counts, submissions) => ({
  type: FETCH_SUBMISSIONS_SUCCESS,
  submissions,
  counts
});

const submissionsFetchError = error => ({ type: FETCH_SUBMISSIONS_FAILED, error });

const formCreated = form => ({ type: FORM_CREATED, form });
const formCreationFailure = error => ({ type: FORM_CREATION_FAILURE, error });

const requestGallery = () => ({ type: FETCH_FORM_GALLERY_REQUEST });
const receivedGallery = gallery => {
  if (!Array.isArray(gallery.config.identifiableIds)) {
    gallery.config.identifiableIds = [];
  }
  return { type: FETCH_FORM_GALLERY_SUCCESS, gallery };
};
const galleryRequestError = error => ({ type: FETCH_FORM_GALLERY_FAILURE, error });

const answerRemovedFromGallery = gallery => ({
  type: FORM_ANSWER_REMOVED_FROM_GALLERY,
  gallery
});

/**
 * Actions API
 */

export const fetchForms = () => (dispatch, getState) => {
  dispatch(formsRequestStarted());

  return fetch(`${getState().app.askHost}/v1/form`)
    .then(res => res.json())
    .then(forms => dispatch(formsRequestSuccess(forms)))
    .catch(error => dispatch(formsRequestFailure(error)));
};

export const fetchForm = id => (dispatch, getState) => {
  dispatch(formRequestStarted(id));

  return fetch(`${getState().app.askHost}/v1/form/${id}`)
    .then(res => res.json())
    .then(form => dispatch(formRequestSuccess(form)))
    .catch(error => dispatch(formRequestFailure(error)));
};

export const copyForm = (id) => (dispatch, getState) => {
  if (getState().forms[id]) {
    dispatch({type: COPY_FORM, id});
  } else {
    dispatch(fetchForm(id))
      .then(() => dispatch({type: COPY_FORM, id}));
  }
};

export const deleteForm = (name, description, id) => (dispatch, getState) => {
  dispatch(formRequestStarted(id));
  return fetch(`${getState().app.askHost}/v1/form/${id}`, getInit({ name, description }, 'DELETE'))
    .then(res => res.json())
    .then(deletedForm => {
      dispatch(deleteSuccessful(id));
      // FIXME: Ask service returns 'null' for deleted forms.
      //dispatch(formRequestSuccess(deletedForm, 'delete'));
    })
    .catch(error => dispatch(formRequestFailure(error)));
};

export const requestEditAccess = formId => dispatch =>
dispatch(formRequestEditAccess(formId));

export const leavingEdit = formId => dispatch =>
dispatch(formLeaveEdit(formId));

export const createEmpty = () => (dispatch, getState) =>
dispatch(createEmptyAction());

export const appendWidget = (type, targetPosition) => ({
  type: APPEND_FORM_WIDGET,
  widget: type,
  targetPosition: targetPosition
});

export const duplicateWidget = position => ({
  type: DUPLICATE_FORM_WIDGET,
  position
});

export const deleteWidget = widgetPosition => ({
  type: DELETE_FORM_WIDGET,
  widgetPosition
});

export const updateWidget = (id, data) => ({ type: UPDATE_WIDGET, data, id });
export const moveWidget = (from, to) => ({ type: MOVE_WIDGET, from, to });

// updateForm should ONLY be used to update top-level properties
// the following actions should be used to update nested properties like header and footer
// hopefully we can update so the form is roughly flat and we won't have to do all this.
export const updateForm = data => ({ type: UPDATE_FORM, data });
export const updateFormSettings = settings => ({type: UPDATE_FORM_SETTINGS, settings});
export const updateFormHeader = header => ({type: UPDATE_FORM_HEADER, header});
export const updateFormFooter = footer => ({type: UPDATE_FORM_FOOTER, footer});
export const updateFormFinishedScreen = finishedScreen => ({type: UPDATE_FORM_FINISHED_SCREEN, finishedScreen});

export const setActiveSubmission = submissionId => ({
  type: SET_ACTIVE_SUBMISSION,
  submissionId
});

export const updateActiveSubmission = props => ({
  type: UPDATE_ACTIVE_SUBMISSION,
  props
});

export const saveForm = (form, widgets) => {
  const data = Object.assign({}, form);
  data.steps[0].widgets = widgets;

  return (dispatch, getState) => {

    const {app} = getState();
    data.settings.saveDestination =  `${app.askHost}/v1/form/${form.id}/submission`;

    dispatch({ type: CREATE_INIT_FORM, data });
    return fetch(`${app.elkhornHost}/create`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(json => {
      dispatch(formCreated(json));
      return json;
    })
    .catch(error => dispatch(formCreationFailure(error)));
  };
};

export const editForm = form => (dispatch, getState) => {
  const data = {...form};
  const {app} = getState();

  // update save destination on edit to capture config changes
  data.settings.saveDestination = `${app.askHost}/v1/form/${form.id}/submission`;

  dispatch({type: EDIT_FORM_REQUEST, data});
  return fetch(`${app.elkhornHost}/create`, getInit(data, 'POST'))
  .then(res => res.json())
  .then(json => {
    dispatch({type: EDIT_FORM_SUCCESS, data: json});
    return json;
  })
  .catch(error => dispatch({type: EDIT_FORM_FAILURE, error}));
};

export const updateInactiveMessage = (message, form) => (dispatch, getState) => {
  const formData = {...form};
  formData.settings.inactiveMessage = message;

  const { app } = getState();

  dispatch({ type: UPDATE_FORM_INACTIVE_MESSAGE_REQUEST });
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

export const fetchSubmissions = (formId, page = 0) => (dispatch, getState) => {
  const { app, forms } = getState();
  const { submissionOrder, submissionFilterBy, submissionSearch } = forms;
  const filterBy = submissionFilterBy === 'default' ? '' : submissionFilterBy;
  const skip = page * 10;
  return fetch(`${app.askHost}/v1/form/${formId}/submission?skip=${skip}&limit=10&orderby=${submissionOrder}&filterby=${filterBy}&search=${submissionSearch}`)
    .then(res => res.json())
    .then(data => dispatch(submissionsFetched(data.counts, data.submissions || [])))
    .catch(error => dispatch(submissionsFetchError(error)));
};

// Receives an object of <string>, <bool> elements like {flagged: true, bookmarked: false}
// and updates the submission flags. The flags attribute on a submission is
// an array of strings. For example `flags: ["flagged", "bookmarked"]`

export const updateSubmissionFlags = props => (dispatch, getState) => {
  const state = getState();
  const { activeSubmission, activeForm } = state.forms;
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
    fetch(`${state.app.askHost}/v1/form/${activeForm}/submission/${activeSubmission}/flag/${prop}`,
          { method: props[prop] ? 'POST': 'DELETE', mode: 'cors' })
    .then(res=> res.json())
  ));
};

export const fetchGallery = formId => (dispatch, getState) => {
  dispatch(requestGallery(formId));

  const {app} = getState();

  fetch(`${app.askHost}/v1/form/${formId}/gallery`)
    .then(res => res.json())
    .then(galleries => dispatch(receivedGallery(galleries[0]))) // we only support 1 gallery
    .catch(error => dispatch(galleryRequestError(error)));
};

export const sendToGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();

    fetch(`${app.askHost}/v1/form_gallery/${galleryId}/submission/${subId}/${answerId}`, {
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(gallery => {
        dispatch({type: FORM_ANSWER_SENT_TO_GALLERY, gallery});
      })
      .catch(error => { console.log(error); });
  };
};

export const removeFromGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const { app } = getState();
    const options = {method: 'DELETE', mode: 'cors'};

    fetch(`${app.askHost}/v1/form_gallery/${galleryId}/submission/${subId}/${answerId}`, options)
      .then(res => res.json())
      .then(gallery => dispatch(answerRemovedFromGallery(gallery)))
      .catch(error => {
        console.log('failed to remove from gallery', error);
      });
  };
};

export const updateFormStatus = (formId, status) => (dispatch, getState) => {
  const {app} = getState();
  const options = {method: 'PUT', mode: 'cors'};

  fetch(`${app.askHost}/v1/form/${formId}/status/${status}`, options)
    .then(res => res.json())
    .then(form => dispatch({type: FORM_STATUS_UPDATED, form, status}))
    .catch(error => dispatch({type: FORM_STATUS_UPDATE_ERROR, error}));
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
      type: EDIT_ANSWER_BEGIN,
      answerId,
      submissionId,
      editableAnswer,
      editablePii,
      answerKey
    });
  };
};


// user starts typing and changing the Answer
export const updateEditableAnswer = text => ({type: EDIT_ANSWER_UPDATE, text });
export const cancelEdit = () => ({ type: EDIT_ANSWER_CANCEL });

// this just resets the editable text to the original
// it does NOT remove the edit on the data object.
export const resetEditableTextToOriginal = answer => ({
  type: RESET_EDITABLE_TEXT,
  text: answer.answer.answer.text
});

export const updateEditablePii = (reply, idAnswer, value) => {
  return (dispatch, getState) => {

    const {forms: {editablePii: editablePii}} = getState();

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
    dispatch({type: EDIT_ANSWER_REQUEST});

    const {app} = getState();

    fetch(`${app.askHost}/v1/form/${formId}/submission/${submission_id}/answer/${answer_id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({edited})
    })
      .then(res => res.json())
      .then(submission => {
        dispatch({type: EDIT_ANSWER_SUCCESS, submission});
        // just re-fetch the gallery instead of trying to munge the state
        dispatch(fetchGallery(formId));
      })
      .catch(error => dispatch({type: EDIT_ANSWER_FAILED, error}));
  };
};

export const updateGalleryTitle = title => ({ type: UPDATE_GALLERY_TITLE, title });

export const updateGalleryDesc = description => ({
  type: UPDATE_GALLERY_DESCRIPTION,
  description
});

export const updateReaderInfoPlacement = placement => ({
  type: UPDATE_READER_INFO_PLACEMENT,
  placement
});

export const updateGalleryOrientation = orientation => ({
  type: UPDATE_GALLERY_ORIENTATION,
  orientation
});

/**
 * {id} is the id of a widget in a form
 * {add} is a boolean indicating whether the id should be added or removed
 */
export const toggleIdentifiable = (id, add) => (dispatch, getState) => {
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

export const publishGallery = () => (dispatch, getState) => {
  const {app, forms} = getState();
  const { activeGallery } = forms;
  const gallery = forms[activeGallery];
  /*const {
    identifiableIds
  } = forms;*/
  dispatch({type: PUBLISH_GALLERY_REQUEST});


  return fetch(`${app.elkhornHost}/gallery/${gallery.id}/publish`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(gallery)
  })
  .then(res => res.json())
  .then(gallery => {
    dispatch({type: PUBLISH_GALLERY_SUCCESS, gallery});
    return gallery;
  })
  .then(gallery => dispatch(fetchGallery(forms.activeForm)))
  .catch(error => dispatch({type: PUBLISH_GALLERY_FAILURE, error}));
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

export const cleanSubmissionFilters = () => ({ type: CLEAN_SUBMISSION_FILTERS });

export const formDragStarted = () => ({ type: FORM_DRAG_STARTED });
export const formDragEnded = () => ({ type: FORM_DRAG_ENDED });

export const reinsertGalleryAnswer = (galleryId, key, position) => ({
  type: FORM_ANSWER_REINSERT,
  galleryId,
  key,
  position
});

export const downloadCSV = formId => (dispatch, getState) => {
  const { app, forms } = getState();
  const { submissionFilterBy, submissionSearch } = forms;
  const filterBy = submissionFilterBy === 'default' ? '' : submissionFilterBy;

  fetch(`${app.askHost}/v1/form/${formId}/submission?filterby=${filterBy}&search=${submissionSearch}&csv=true`)
  .then(res => res.json())
  .then(({ csv_url }) => window.open(csv_url)); // download by opening a new tab
}

export const hasFlag = (submission, flag) => -1 !== submission.flags.indexOf(flag);
