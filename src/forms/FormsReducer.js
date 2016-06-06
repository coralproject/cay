import * as types from 'forms/FormActions';

const initial = {
  items: [],
  editAccess: {},
  form: null,
  widgets: []
};

const emptyForm = {
  target: '#ask-form',
  theme: {
    headerBackground: '#448899',
    headerText: '#FFFFFF',
    headerIntroText: '#EEEEEE',
    formBackground: '#EEEEEE',
    footerBackground: '#DDDDDD',
    requiredAsterisk: '#FF44FF',
    inputBackground: '#F0F0F0',
    inputText: '#222222',
    footerText: '#222222',
    fieldTitleText: '#222222',
    progressBar: '#44AA44',
    progressBarBackground: '#CCCCCC',
    submitButtonBackground: '#444499',
    submitButtonText: '#FFFFFF',
    selectedItemBackground: '#111111',
    selectedItemText: '#FAFAFA'
  },
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
    emptyForm.createdAt = Date.now();
    return Object.assign({}, state, {form: emptyForm, widgets: [] });

  case types.FORM_APPEND_WIDGET:

    var widget = action.widget;
    var targetPosition = action.targetPosition;
    var widgetsCopy = state.widgets.slice();

    var fieldsBefore = widgetsCopy.slice(0, targetPosition);
    var fieldsAfter = widgetsCopy.slice(targetPosition);
    widgetsCopy = fieldsBefore.concat(widget).concat(fieldsAfter);

    return Object.assign({}, state, { widgets: widgetsCopy, tempWidgets: widgetsCopy });

  case types.FORMS_REQUEST_SUCCESS:
    return Object.assign({}, state, { items: action.forms });

  case types.FORM_REPLACE_WIDGETS:
    var updatedWidgets = action.widgets.map((field) =>
      console.log("Field", field)
    );
    return Object.assign({}, state);

  case types.WIDGET_UPDATE:
    var updatedWidgets = state.widgets.map((widget, id) =>
      id === action.id ? Object.assign({}, widget, action.data) : widget
    );
    return Object.assign({}, state, { widgets: updatedWidgets });

  case types.WIDGET_MOVE:

    // First we make a copy removing the dragged element
    var widgetsCopy = state.widgets.slice();
    var removed = widgetsCopy.splice(action.from, 1);

    // Then we insert the dragged element into the desired position
    var fieldsBefore = widgetsCopy.slice(0, action.to);
    var fieldsAfter = widgetsCopy.slice(action.to);
    var newWidgets = fieldsBefore.concat(removed).concat(fieldsAfter);

    return Object.assign({}, state, { tempWidgets: newWidgets, widgets: newWidgets });

  default:
    return state;
  }
};

export default forms;
