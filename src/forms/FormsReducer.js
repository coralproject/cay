import * as types from 'forms/FormActions';
import uuid from 'node-uuid';

const initial = {
  formList: [],
  galleryList: [],
  submissionList: [],
  editAccess: {},
  form: null,
  savingForm: false,
  savedForm: null, // this is the Objectid of the created form returned from Elkhorn.
  formCreationError: null,
  activeForm: null, // might be able to combine this with {form} above in the future
  activeGallery: null, // this is an ObjectId string
  widgets: [],
  activeSubmission: null // ObjectId string
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
    saveDestination: 'https://pillar_stg.coralproject.net/api/form_submission/',
    showFieldNumbers: true,
    isActive: false,
    inactiveMessage: "We are not currently accepting submissions. Thank you."
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
    // FIXME: Pillar is returning 'null' for deleted forms. See: FormActions/deleteForm.
    var newState = Object.assign({}, state);
    delete newState[action.id];
    var formListIndex = newState.formList.indexOf(action.id);
    delete newState.formList[formListIndex];
    return newState;

  case types.FORM_EDIT_ACCEPTED:
    var newState = Object.assign({}, state);
    newState.editAccess[action.formId] = true;
    return newState;

  case types.FORM_EDIT_DENIED:
    var newState = Object.assign({}, state);
    delete newState.editAccess[action.formId];
    return newState;

  case types.FORM_CREATE_EMPTY:
    const form = Object.assign({}, emptyForm, { steps: [{ id: uuid.v4(), name: 'first_step', createdAt: Date.now() }] });
    return Object.assign({}, state, {form: form, widgets: [] });

  case types.FORM_APPEND_WIDGET:

    var widget = action.widget;

    var targetPosition = action.targetPosition || state.widgets.length;
    var widgetsCopy = state.widgets.slice();

    var fieldsBefore = widgetsCopy.slice(0, targetPosition);
    var fieldsAfter = widgetsCopy.slice(targetPosition);
    widgetsCopy = fieldsBefore.concat(widget).concat(fieldsAfter);

    return Object.assign({}, state, { widgets: widgetsCopy, tempWidgets: widgetsCopy });

  case types.FORMS_REQUEST_SUCCESS:

    const formList = action.forms.map(form => form.id);
    const forms = action.forms.reduce((accum, form) => {
      accum[form.id] = form;
      return accum;
    }, {});

    return {...state, formList, ...forms };

  case types.FORM_REPLACE_WIDGETS:
    var updatedWidgets = action.widgets.map((field) =>
      console.log("Field", field)
    );
    return Object.assign({}, state);

  case types.WIDGET_UPDATE:
    var updatedWidgets = state.widgets.map((widget, id) => {
      return widget.id === action.id ? Object.assign({}, widget, action.data) : widget;
    });
    return Object.assign({}, state, { widgets: updatedWidgets });

  case types.FORM_UPDATE:
    var updatedForm = Object.assign({}, state.form, action.data);
    return Object.assign({}, state, { form: updatedForm });

  case types.WIDGET_MOVE:

    // First we make a copy removing the dragged element
    var widgetsCopy = state.widgets.slice();
    var removed = widgetsCopy.splice(action.from, 1);

    // Then we insert the dragged element into the desired position
    var fieldsBefore = widgetsCopy.slice(0, action.to);
    var fieldsAfter = widgetsCopy.slice(action.to);
    var newWidgets = fieldsBefore.concat(removed).concat(fieldsAfter);

    return Object.assign({}, state, { tempWidgets: newWidgets, widgets: newWidgets });

  case types.FORM_DELETE_WIDGET:
    var widgetsCopy = state.widgets.slice();
    widgetsCopy.splice(action.widgetPosition, 1);
    return Object.assign({}, state, { widgets: widgetsCopy, tempWidgets: widgetsCopy });

  case types.FORM_CREATE_INIT:
    return {...state, savingForm: true, formCreationError: null, savedForm: null};

  case types.FORM_CREATED:
    return {
      ...state,
      savingForm: false,
      savedForm: action.form.id,
      formList: [...state.formList, action.form.id],
      [action.form.id]: action.form
    };

  case types.FORM_CREATION_FAILURE:
    return {...state, savingForm: false, formCreationError: action.error, savedForm: null};

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
    return {...state, [action.gallery.id]: action.gallery};

  default:
    return state;
  }
};

export default forms;
