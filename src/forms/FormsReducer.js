
/**
 * Module dependencies
 */

import uuid from 'node-uuid';

/**
 * Import action names
 */

import * as types from 'forms/FormActions';

import {
  USER_EXPIRED,
  REDIRECT_SUCCESS,
  USER_FOUND,
  SILENT_RENEW_ERROR,
  USER_EXPIRING,
  SESSION_TERMINATED,
  LOADING_USER
} from 'redux-oidc';

/**
 * Initial state
 */

const initial = {
  activeForm: null, // might be able to combine this with {form} above in the future
  activeGallery: null, // this is an ObjectId string
  activeSubmission: null, // ObjectId string
  answerBeingEdited: null, // ObjectId string
  answerList: [],
  editableAnswer: '',
  editablePii: [],
  editAccess: {},
  form: null,
  formCreationError: null,
  formList: [],
  formCounts: {
    totalSearch: 0,
    totalSubmissions: 0,
    bookmarked: 0,
    flagged: 0
  },
  galleryCode: '',
  galleryList: [],
  galleryUrls: [],
  identifiableIds: [],
  loadingAnswerEdit: false,
  loadingGallery: false,
  savedForm: null, // this is the Objectid of the created form returned from Elkhorn.
  savingForm: false,
  submissionFilterBy: 'default',
  submissionList: [],
  submissionOrder: 'dsc',
  submissionSearch: '',
  widgets: [],
  authInvalid: false
};

/**
 * Empty default form
 */

const emptyForm = {
  target: '#ask-form',
  theme: {
    headerBackground: '#FFFFFF',
    headerText: '#222222',
    headerIntroText: '#444444',
    formBackground: '#FFFFFF',
    footerBackground: '#FFFFFF',
    requiredAsterisk: '#939393',
    inputBackground: '#FFFFFF',
    inputText: '#222222',
    footerText: '#222222',
    fieldTitleText: '#222222',
    progressBar: '#44AA44',
    progressBarBackground: '#CCCCCC',
    submitButtonBackground: '#F67D6E',
    submitButtonText: '#FFFFFF',
    selectedItemBackground: '#2E343B',
    selectedItemText: '#FAFAFA'
  },
  settings: {
    saveDestination: '',
    showFieldNumbers: true,
    inactiveMessage: 'We are not currently accepting submissions. Thank you.',
    recaptcha: false
  },
  header: {
    title: '',
    description: '',
    heading: ''
  },
  footer: {
    conditions: ''
  },
  finishedScreen: {
    title: 'Thanks.',
    description: 'Thank you for helping us with our journalism. We read all submissions, and will be in touch if we have any more questions.'
  },
  steps: [{
    id: '1',
    name: 'first_page'
  }],
  status: 'closed'
};

export default (state = initial, action) => {

  switch (action.type) {

  case USER_EXPIRED:
    console.error('user is expired');
    return state;

  case USER_EXPIRING:
    console.error('user expiring');
    return state;

  case SESSION_TERMINATED:
    console.error('session terminated');
    return {...state, authInvalid: 'your session has been terminated. please log in again'};

  case USER_FOUND:
    console.log('USER_FOUND');
    return state;

  case types.FETCH_FORM_REQUEST:
    return {...state, activeForm: null, formLoading: true};

  case types.FETCH_FORM_SUCCESS:
    return {  ...state,
              activeForm: action.form.id,
              [action.form.id]: action.form,
              formLoading: false,
              widgets: action.form.steps[0].widgets,
              currentFields: action.form.steps[0].widgets
          };

  case types.FETCH_FORM_FAILURE:
    return {...state, activeForm: null, formLoading: false};

  case types.FORM_DELETED:
    // FIXME: the Ask service is returning 'null' for deleted forms. See: FormActions/deleteForm.
    var newState = Object.assign({}, state);
    delete newState[action.id];
    var formListIndex = newState.formList.indexOf(action.id);
    newState.formList.splice(formListIndex,1);
    return newState;

  case types.EDIT_FORM_ACCEPTED:
    var newState = Object.assign({}, state);
    newState.editAccess[action.formId] = true;
    return newState;

  case types.EDIT_FORM_DENIED:
    var newState = Object.assign({}, state);
    delete newState.editAccess[action.formId];
    return newState;

  case types.EDIT_FORM_SUCCESS:
    return { ...state, form: action.data };

  case types.CREATE_EMPTY_FORM:
    const form = Object.assign({}, emptyForm, { steps: [{ id: uuid.v4(), name: 'first_step', createdAt: Date.now() }] });
    form.settings.saveDestination = action.saveDestination;
    return Object.assign({}, state, {activeForm: null, form: form, widgets: [], savingForm: false, savedForm: null });

  case types.COPY_FORM:
    let formToCopy = Object.assign({}, state[action.id]);
    let headerCopy = Object.assign({}, formToCopy.header, {title: formToCopy.header.title + ' (Copy)'});
    let settingsCopy = Object.assign({}, formToCopy.settings);
    let copiedForm = Object.assign({}, formToCopy,
      {
        header: headerCopy,
        settings: settingsCopy,
        date_created: new Date().toISOString(),
        id: null
      });
    return Object.assign({}, state, {form:copiedForm, widgets:copiedForm.steps[0].widgets});

  case types.DUPLICATE_FORM_WIDGET:

    var position = action.position;

    var widgetsCopy = [...state.widgets];
    var widgetCopy = {...widgetsCopy[position], id: uuid.v4()};

    widgetsCopy.splice(position, 0, widgetCopy);

    return Object.assign({}, state, { widgets: widgetsCopy, currentFields: widgetsCopy });

  case types.APPEND_FORM_WIDGET:

    var widget = action.widget;

    var targetPosition = action.targetPosition || state.widgets.length;
    var widgetsCopy = [...state.widgets];

    widgetsCopy.splice(targetPosition, 0, widget);

    return {...state, widgets: widgetsCopy, currentFields: widgetsCopy, isDragging: false };

  case types.FETCH_FORMS_SUCCESS:

    const formList = action.forms.reverse().map(form => form.id);
    const forms = action.forms.reduce((accum, form) => {
      accum[form.id] = form;
      return accum;
    }, {});

    return {...state, formList, ...forms };

  case types.UPDATE_WIDGET:
    var updatedWidgets = state.widgets.map((widget, id) => {
      return widget.id === action.id ? Object.assign({}, widget, action.data) : widget;
    });
    return Object.assign({}, state, { widgets: updatedWidgets });

  case types.UPDATE_FORM:
    const formProp = state.activeForm ? state.activeForm : 'form';
    const updatedForm = Object.assign({}, state[formProp], action.data);
    return Object.assign({}, state, { [formProp]: updatedForm });

  case types.UPDATE_FORM_SETTINGS:
    const activeForm = state.activeForm ? state.activeForm : 'form';
    const formWithNewSettings = {...state[activeForm], settings: {...state[activeForm].settings, ...action.settings}};
    return {...state, [activeForm]: formWithNewSettings};

  case types.UPDATE_FORM_HEADER:
    const currentForm = state.activeForm ? state.activeForm : 'form';
    // this is gross. we need to do a refactor to make the forms flat. (at least in the state)
    const formWithNewHeader = {...state[currentForm], header: {...state[currentForm].header, ...action.header}};
    return {...state, [currentForm]: formWithNewHeader};

  case types.UPDATE_FORM_FOOTER:
    const theForm = state.activeForm ? state.activeForm : 'form';
    const formWithNewFooter = {...state[theForm], footer: {...state[theForm].footer, ...action.footer}};
    return {...state, [theForm]: formWithNewFooter};

  case types.UPDATE_FORM_FINISHED_SCREEN:
    const ourForm = state.activeForm ? state.activeForm : 'form';
    const formWithNewFinishedScreen = {
      ...state[ourForm],
      finishedScreen: {
        ...state[ourForm].finishedScreen,
        ...action.finishedScreen
      }
    };
    return {...state, [ourForm]: formWithNewFinishedScreen};

  case types.MOVE_WIDGET:

    // First we make a copy removing the dragged element
    var newWidgets = [...state.widgets];
    var removed = newWidgets.splice(action.from, 1)[0];
    newWidgets.splice(action.to, 0, removed);

    return {...state, currentFields: newWidgets, widgets: newWidgets, isDragging: false };

  case types.DELETE_FORM_WIDGET:
    var widgetsCopy = [...state.widgets];
    widgetsCopy.splice(action.widgetPosition, 1);
    return {...state, widgets: widgetsCopy, currentFields: widgetsCopy };

  case types.CREATE_INIT_FORM:
    return {...state, savingForm: true, formCreationError: null, savedForm: null};

  case types.FORM_CREATED:
    return {
      ...state,
      savingForm: false,
      savedForm: action.form.data.id,
      formList: [...state.formList, action.form.data.id],
      [action.form.data.id]: action.form.data
    };

  case types.FORM_CREATION_FAILURE:
    return {...state, savingForm: false, formCreationError: action.error, savedForm: null};

  case types.FETCH_SUBMISSIONS_SUCCESS:

    const submissionList = action.submissions.map(sub => sub.id);
    const submissions = action.submissions.reduce((accum, sub) => {
      accum[sub.id] = sub;
      return accum;
    }, {});
    const activeSubmission = submissionList.length ? submissionList[0] : null;
    const formCounts = Object.assign({}, state.formCounts, {
      totalSearch: action.counts.total_search,
      totalSubmissions: action.counts.total_submissions,
      ...action.counts.search_by_flag
    });

    // this will add more submission ids and overwrite existing ones.
    // it will not erase old submission ids.
    // current viewable ids are managed in {submissionList}
    return {...state, submissionList, ...submissions, formCounts, activeSubmission};

  case types.SET_ACTIVE_SUBMISSION:
    return {...state, activeSubmission: action.submissionId };

  case types.UPDATE_ACTIVE_SUBMISSION:
    return Object.assign({}, state, { [state.activeSubmission]: { ...state[state.activeSubmission], ...action.props } });

  case types.FETCH_FORM_GALLERY_REQUEST:
    return {...state, loadingGallery: true, activeGallery: null};

  case types.FETCH_FORM_GALLERY_SUCCESS:
    // action gallery might be more than one gallery in the future

    const answers = action.gallery.answers.reduce((accum, ans) => {
      // so basically, an item in the gallery is unique by 2 keys:
      // the submission_id AND the widet_id
      // so I'm keying the answers off a combination of the two
      const answerKey = `${ans.submission_id}|${ans.answer_id}`;
      accum[answerKey] = ans;
      return accum;
    }, {});

    action.gallery.config = action.gallery.config || {};

    if (!action.gallery.config.placement) {
      // default for sending to Elkhorn
      action.gallery.config.placement = 'below';
    }

    return {
      ...state,
      loadingGallery: false,
      activeGallery: action.gallery.id,
      [action.gallery.id]: action.gallery,
      ...answers,
      answerList: Object.keys(answers)
    };

  case types.FETCH_FORM_GALLERY_FAILURE:
    return {...state, loadingGallery: false, activeGallery: null, galleryError: action.error};

  case types.FORM_STATUS_UPDATED:
    return {
      ...state,
      activeForm: action.form.id,
      [action.form.id]: {
        ...action.form,
        status: action.status,
        settings: {
          ...action.form.settings
        }
      }
    };

  case types.FORM_ANSWER_SENT_TO_GALLERY:
    return {...state, [action.gallery.id]: action.gallery};

  case types.FORM_ANSWER_REMOVED_FROM_GALLERY:
    return {...state, [action.gallery.id]: action.gallery};

  // editing Gallery submissions
  case types.EDIT_ANSWER_BEGIN: // user clicked on button to start editing an answer
    return {
      ...state,
      // if you can think of a better way to store this, I'm all ears
      answerBeingEdited: action.answerKey,
      editableAnswer: action.editableAnswer,
      editablePii: action.editablePii
    };

  case types.EDIT_ANSWER_UPDATE: // user is typing into the field
    return {...state, editableAnswer: action.text};

  case types.EDIT_ANSWER_CANCEL: // user closed the edit Answer modal or something
    return {...state, answerBeingEdited: null};

  case types.EDIT_ANSWER_REQUEST: // submit Answer edit to server
    return {...state, loadingAnswerEdit: true};

  case types.RESET_EDITABLE_TEXT:
    return {...state, editableAnswer: action.text};

  case types.UPDATE_EDITABLE_PII:
    return {...state, editablePii: action.editablePii};

  case types.EDIT_ANSWER_SUCCESS: // server successfully updated submission
    // don't update the answers in state here.
    // the Answer and Reply objects are different, so instead of doing some horrible
    // update in place, I'm just going to reload the entire gallery from the server
    return {
      ...state,
      loadingAnswerEdit: false,
      [action.submission.id]: action.submission,
      answerBeingEdited: null
    };

  case types.EDIT_ANSWER_FAILED: // server was unable to update the answer
    return {...state, loadingAnswerEdit: false, answerBeingEdited: null};

  case types.FORM_DRAG_STARTED:
    return {...state, autoExpand: -1, isDragging: true };

  case types.FORM_DRAG_ENDED:
    return {...state, dragStarted: false, isDragging: false };

  case types.UPDATE_GALLERY_TITLE:
    return {...state, [state.activeGallery]: {...state[state.activeGallery], headline: action.title}};

  case types.UPDATE_GALLERY_DESCRIPTION:
    return {...state, [state.activeGallery]: {...state[state.activeGallery], description: action.description}};

  case types.UPDATE_READER_INFO_PLACEMENT:
    const gal = state[state.activeGallery];
    return {...state, [state.activeGallery]: {...gal, config: {...gal.config, placement: action.placement}}};

  case types.UPDATE_GALLERY_ORIENTATION:
    return {...state, galleryOrientation: action.orientation};

  case types.GALLERY_ENABLE_IDENTIFIABLE:
    const gallery = state[state.activeGallery];
    return {...state, [state.activeGallery]: {...gallery, config: {...gallery.config, identifiableIds: action.ids}}};

  case types.PUBLISH_GALLERY_REQUEST:
    return {...state, loadingGallery: true, galleryCode: '', publishGalleryError: null};

  case types.PUBLISH_GALLERY_SUCCESS:
    return {
      ...state,
      loadingGallery: false,
      galleryCode: action.gallery.build.code,
      publishGalleryError: null
    };

  case types.PUBLISH_GALLERY_FAILURE:
    return {
      ...state,
      loadingGallery: false,
      galleryUrls: [],
      galleryCode: '',
      publishGalleryError: action.error
    };

  case types.UPDATE_FILTER_BY:
    return {...state, submissionFilterBy: action.value};

  case types.UPDATE_ORDER:
    return {...state, submissionOrder: action.value};

  case types.UPDATE_SEARCH:
    return {...state, submissionSearch: action.value};

  case types.CLEAN_SUBMISSION_FILTERS:
    return {...state, submissionFilterBy: 'default', submissionOrder: 'dsc', submissionSearch: '',
            formCounts: {...initial.formCounts} };

  // TODO implement!
  case types.FORM_ANSWER_REINSERT:
    const newAnswers = [...state[action.galleryId].answers];
    const aux = newAnswers[action.key];
    let newPos = (action.key + action.position) % newAnswers.length;
    newPos = newPos === -1 ? newAnswers.length - 1 : newPos;
    newAnswers[action.key] = newAnswers[newPos];
    newAnswers[newPos] = aux;
    return { ...state, [action.galleryId]: {...state[action.galleryId], answers: newAnswers}};

  default:
    return state;
  }
};
