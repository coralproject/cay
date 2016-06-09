import * as types from 'forms/FormActions';
import uuid from 'node-uuid';

const initial = {
  formList: [],
  galleryList: [],
  submissionList: [],
  editAccess: {},
  form: null,
  activeForm: null, // might be able to combine this with {form} above in the future
  activeGallery: null, // this is an ObjectId string
  widgets: [],
  activeSubmission: null // ObjectId string
};

const emptyForm = {
  target: '#ask-form',
  settings: {
    saveDestination: 'http://10.0.1.195:8080/api/form_submission/',
    showFieldNumbers: true
  },
  header: {
    title: 'Share your story',
    description: 'This is a sample ask!'
  },
  footer: {
    conditions: 'This is a conditions field'
  },
  finishedScreen: {
    title: 'Thanks.',
    description: 'This is a more verbose thank you message'
  },
  steps: [{
    id: '1',
    name: 'first_page'
  }]
};

const forms = (state = initial, action) => {

  switch (action.type) {

  case types.FORM_REQUEST_STARTED:
    return {...state, activeForm: null, formLoading: true};

  case types.FORM_REQUEST_SUCCESS:
    return {...state, activeForm: action.form.id, [action.form.id]: action.form, formLoading: false};

  case types.FORM_REQUEST_FAILURE:
    return {...state, activeForm: null, formLoading: false};

  case types.FORM_DELETED:
    return state;

  case types.FORM_EDIT_ACCEPTED:
    var newState = Object.assign({}, state);
    newState.editAccess[action.formId] = true;
    return newState;

  case types.FORM_EDIT_DENIED:
    var newState = Object.assign({}, state);
    delete newState.editAccess[action.formId];
    return newState;

  case types.FORM_CREATE_EMPTY:
    const form = Object.assign({}, emptyForm, { steps: [{ id: uuid.v4(), name: 'first_step'}] });
    return Object.assign({}, state, {form: form, widgets: [] });

  case types.FORM_APPEND_WIDGET:
    return Object.assign({}, state, { widgets: [...state.widgets, action.widget ] });

  case types.FORMS_REQUEST_SUCCESS:

    const formList = action.forms.map(form => form.id);
    const forms = action.forms.reduce((accum, form) => {
      accum[form.id] = form;
      return accum;
    }, {});

    return {...state, formList, ...forms };

  case types.WIDGET_UPDATE:
    return Object.assign({}, state, { widgets: state.widgets.map((widget, id) =>
      id === action.id ? Object.assign({}, widget, action.data) : widget) });

  case types.WIDGET_MOVE:
    const newWidgets = [...state.widgets];
    newWidgets[action.to] = Object.assign({}, state.widgets[action.from]);
    newWidgets[action.from] = Object.assign({}, state.widgets[action.to]);
    return Object.assign({}, state, { widgets: newWidgets });

  case types.SUBMISSIONS_REQUEST_SUCCESS:

    const submissionList = action.submissions.map(sub => sub.id);
    const submissions = action.submissions.reduce((accum, sub) => {
      accum[sub.id] = sub;
      return accum;
    }, {});
    const activeSubmission = submissionList.length ? submissionList[0] : null;

    // this will add more submission ids and overwrite existing ones.
    // it will not erase old submission ids.
    // current viewable ids are managed in {submissionList}
    return {...state, submissionList, ...submissions, activeSubmission};

  case types.SET_ACTIVE_SUBMISSION:
    return {...state, activeSubmission: action.submissionId };

  case types.UPDATE_ACTIVE_SUBMISSION:
    // const newSubmissions = [...state.submissions];
    // newSubmissions[state.activeSubmission] = Object.assign({}, newSubmissions[state.activeSubmission], action.props);
    // return Object.assign({}, state, { submissions: newSubmissions });
    return state;

  case types.FORM_GALLERY_REQUEST:
    return {...state, loadingGallery: true, activeGallery: null};

  case types.FORM_GALLERY_SUCCESS:
    // action gallery might be more than one gallery in the future
    return {...state, loadingGallery: false, activeGallery: action.gallery.id, [action.gallery.id]: action.gallery};

  case types.FORM_GALLERY_ERROR:
    return {...state, loadingGallery: false, activeGallery: null, galleryError: action.error};

  case types.FORM_STATUS_UPDATED:
    return {...state, activeForm: action.form.id, [action.form.id]: action.form};

  case types.FORM_ANSWER_SENT_TO_GALLERY:
    return {...state, [action.gallery.id]: action.gallery};

  case types.FORM_ANSWER_REMOVED_FROM_GALLERY:
    return state;

  default:
    return state;
  }
};

export default forms;
