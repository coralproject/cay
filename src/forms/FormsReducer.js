import * as types from 'forms/FormActions';
import uuid from 'node-uuid';

const initial = {
  items: [],
  editAccess: {},
  form: null,
  activeForm: null, // might be able to combine this with {form} above in the future
  widgets: [],
  submissions: [],
  activeSubmission: null
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
    return {...state, activeForm: action.form, formLoading: false};

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
    const form = Object.assign({}, emptyForm, { steps: [{ id: uuid.v4(), name: 'first_step'}] })
    return Object.assign({}, state, {form: form, widgets: [] });

  case types.FORM_APPEND_WIDGET:
    return Object.assign({}, state, { widgets: [...state.widgets, action.widget ] });

  case types.FORMS_REQUEST_SUCCESS:
    return {...state, items: action.forms };

  case types.WIDGET_UPDATE:
    return Object.assign({}, state, { widgets: state.widgets.map((widget, id) =>
      id === action.id ? Object.assign({}, widget, action.data) : widget) });

  case types.WIDGET_MOVE:
    const newWidgets = [...state.widgets];
    newWidgets[action.to] = Object.assign({}, state.widgets[action.from]);
    newWidgets[action.from] = Object.assign({}, state.widgets[action.to]);
    return Object.assign({}, state, { widgets: newWidgets });

  case types.SUBMISSIONS_REQUEST_SUCCESS:
    return Object.assign({}, state, { submissions: action.submissions, activeSubmission: 0 });

  case types.SET_ACTIVE_SUBMISSION:
    return Object.assign({}, state, { activeSubmission: action.submission });

  case types.UPDATE_ACTIVE_SUBMISSION:
    const newSubmissions = [...state.submissions];
    newSubmissions[state.activeSubmission] = Object.assign({}, newSubmissions[state.activeSubmission], action.props);
    return Object.assign({}, state, { submissions: newSubmissions });

  default:
    return state;
  }
};

export default forms;
