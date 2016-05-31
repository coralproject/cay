import * as types from 'forms/FormActions';

const initial = {
  items: [],
  editAccess: {},
  form: null,
  widgets: []
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
    id: 1,
    name: 'first_page'
  }]
};

const forms = (state = initial, action) => {

  switch (action.type) {

  case types.FORM_REQUEST_STARTED:
    return state;

  case types.FORM_REQUEST_SUCCESS:
    return state;

  case types.FORM_REQUEST_FAILURE:
    return state;

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
    return Object.assign({}, state, {form: emptyForm, widgets: [] });

  case types.FORM_APPEND_WIDGET:
    return Object.assign({}, state, { widgets: [...state.widgets, action.widget ] });

  case types.FORMS_REQUEST_SUCCESS:
    return Object.assign({}, state, { items: action.forms });

  case types.WIDGET_UPDATE:
    return Object.assign({}, state, { widgets: state.widgets.map((widget, id) =>
      id === action.id ? Object.assign({}, widget, action.data) : widget) });

  case types.WIDGET_MOVE:
    const newWidgets = [...state.widgets];
    newWidgets[action.to] = Object.assign({}, state.widgets[action.from]);
    newWidgets[action.from] = Object.assign({}, state.widgets[action.to]);
    return Object.assign({}, state, { widgets: newWidgets });

  default:
    return state;
  }
};

export default forms;
