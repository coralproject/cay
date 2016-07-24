import * as types from 'forms/FormActions';
import uuid from 'node-uuid';

const initial = {
  formList: [],
  galleryList: [],
  submissionList: [],
  formCounts: {
    totalSearch: 0,
    totalSubmissions: 0,
    bookmarked: 0,
    flagged: 0
  },
  answerList: [],
  editAccess: {},
  form: null,
  savingForm: false,
  submissionFilterBy: 'default',
  submissionOrder: 'dsc',
  submissionSearch: '',
  savedForm: null, // this is the Objectid of the created form returned from Elkhorn.
  formCreationError: null,
  activeForm: null, // might be able to combine this with {form} above in the future
  activeGallery: null, // this is an ObjectId string
  galleryTitle: '',
  galleryDescription: '',
  galleryOrientation: 'vertical', // vertical|horizontal
  galleryReaderInfoPlacement: 'above', // above|below
  identifiableIds: [],
  widgets: [],
  loadingAnswerEdit: false,
  loadingGallery: false,
  galleryUrl: '',
  galleryCode: '',
  answerBeingEdited: null, // ObjectId string
  editableAnswer: '',
  activeSubmission: null // ObjectId string
};

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
    saveDestination: 'https://pillar_stg.coralproject.net/api/form_submission/',
    showFieldNumbers: true,
    isActive: false,
    inactiveMessage: 'We are not currently accepting submissions. Thank you.'
  },
  header: {
    title: 'Form name',
    description: 'This is a sample ask!',
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

const forms = (state = initial, action) => {

  switch (action.type) {

  case types.FORM_REQUEST_STARTED:
    return {...state, activeForm: null, formLoading: true};

  case types.FORM_REQUEST_SUCCESS:
    return {  ...state,
              activeForm: action.form.id,
              [action.form.id]: action.form,
              formLoading: false,
              widgets: action.form.steps[0].widgets,
              tempWidgets: action.form.steps[0].widgets
          };

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

  case types.FORM_EDIT_SUCCESS:
    return { ...state, form: action.data };

  case types.FORM_CREATE_EMPTY:
    const form = Object.assign({}, emptyForm, { steps: [{ id: uuid.v4(), name: 'first_step', createdAt: Date.now() }] });
    form.settings.saveDestination = action.saveDestination;
    return Object.assign({}, state, {activeForm: null, form: form, widgets: [], savingForm: false, savedForm: null });

  case types.FORM_DUPLICATE_WIDGET:

    var position = action.position;

    var widgetsCopy = [...state.widgets];
    var widgetCopy = {...widgetsCopy[position], id: uuid.v4()};

    widgetsCopy.splice(position, 0, widgetCopy);

    return Object.assign({}, state, { widgets: widgetsCopy, tempWidgets: widgetsCopy });

  case types.FORM_APPEND_WIDGET:

    var widget = action.widget;

    var targetPosition = action.targetPosition || state.widgets.length;
    var widgetsCopy = [...state.widgets];

    widgetsCopy.splice(targetPosition, 0, widget);

    return {...state, widgets: widgetsCopy, tempWidgets: widgetsCopy };

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
    const formProp = state.activeForm ? state.activeForm : 'form';
    var updatedForm = Object.assign({}, state[formProp], action.data);
    return Object.assign({}, state, { [formProp]: updatedForm });

  case types.WIDGET_MOVE:

    // First we make a copy removing the dragged element
    var newWidgets = [...state.widgets];
    var removed = newWidgets.splice(action.from, 1)[0];
    newWidgets.splice(action.to, 0, removed);

    return {...state, tempWidgets: newWidgets, widgets: newWidgets };

  case types.FORM_DELETE_WIDGET:
    var widgetsCopy = [...state.widgets];
    widgetsCopy.splice(action.widgetPosition, 1);
    return {...state, widgets: widgetsCopy, tempWidgets: widgetsCopy };

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

  case types.FORM_GALLERY_REQUEST:
    return {...state, loadingGallery: true, activeGallery: null};

  case types.FORM_GALLERY_SUCCESS:
    // action gallery might be more than one gallery in the future

    const answers = action.gallery.answers.reduce((accum, ans) => {
      // so basically, an item in the gallery is unique by 2 keys:
      // the submission_id AND the widet_id
      // so I'm keying the answers off a combination of the two
      const answerKey = `${ans.submission_id}|${ans.answer_id}`;
      accum[answerKey] = ans;
      return accum;
    }, {});

    return {
      ...state,
      loadingGallery: false,
      activeGallery: action.gallery.id,
      [action.gallery.id]: action.gallery,
      ...answers,
      answerList: Object.keys(answers)
    };

  case types.FORM_GALLERY_ERROR:
    return {...state, loadingGallery: false, activeGallery: null, galleryError: action.error};

  case types.FORM_STATUS_UPDATED:
    return {...state, activeForm: action.form.id, [action.form.id]: Object.assign({},
      action.form, {status: action.status, settings: Object.assign({},
      action.form.settings, { isActive: action.status === 'open' })})};

  case types.FORM_ANSWER_SENT_TO_GALLERY:
    return {...state, [action.gallery.id]: action.gallery};

  case types.FORM_ANSWER_REMOVED_FROM_GALLERY:
    return {...state, [action.gallery.id]: action.gallery};

  // editing Gallery submissions
  case types.ANSWER_EDIT_BEGIN: // user clicked on button to start editing an answer
    const answerKey = `${action.submissionId}|${action.answerId}`;
    return {
      ...state,
      // if you can think of a better way to store this, I'm all ears
      answerBeingEdited: answerKey,
      editableAnswer: state[answerKey].answer.answer.text
    };

  case types.ANSWER_EDIT_UPDATE: // user is typing into the field
    return {...state, editableAnswer: action.text};

  case types.ANSWER_EDIT_CANCEL: // user closed the edit Answer modal or something
    return {...state, answerBeingEdited: null};

  case types.ANSWER_EDIT_REQUEST: // submit Answer edit to server
    return {...state, loadingAnswerEdit: true};

  case types.ANSWER_EDIT_SUCCESS: // server successfully updated submission
    // don't update the answers in state here.
    // the Answer and Reply objects are different, so instead of doing some horrible
    // update in place, I'm just going to reload the entire gallery from the server
    return {
      ...state,
      loadingAnswerEdit: false,
      [action.submission.id]: action.submission,
      answerBeingEdited: null
    };

  case types.ANSWER_EDIT_FAILED: // server was unable to update the answer
    return {...state, loadingAnswerEdit: false, answerBeingEdited: null};

  case types.UPDATE_GALLERY_TITLE:
    return {...state, galleryTitle: action.title};

  case types.UPDATE_GALLERY_DESCRIPTION:
    return {...state, galleryDescription: action.description};

  case types.UPDATE_READER_INFO_PLACEMENT:
    return {...state, galleryReaderInfoPlacement: action.placement};

  case types.UPDATE_GALLERY_ORIENTATION:
    return {...state, galleryOrientation: action.orientation};

  case types.GALLERY_ENABLE_IDENTIFIABLE:
    return {...state, identifiableIds: action.ids};

  case types.PUBLISH_GALLERY_INIT:
    return {...state, loadingGallery: true, galleryUrl: '', galleryCode: ''};

  case types.PUBLISH_GALLERY_SUCCESS:
    return {
      ...state,
      loadingGallery: false,
      galleryUrl: action.gallery.url,
      galleryCode: action.gallery.build.code
    };

  case types.PUBLISH_GALLERY_FAILURE:
    return {...state, loadingGallery: true, galleryUrl: '', galleryCode: ''};

  case types.UPDATE_FILTER_BY:
    return {...state, submissionFilterBy: action.value};

  case types.UPDATE_ORDER:
    return {...state, submissionOrder: action.value};

  case types.UPDATE_SEARCH:
    return {...state, submissionSearch: action.value};

  case types.CLEAN_SUBMISSION_FILTERS:
    return {...state, submissionFilterBy: 'default', submissionOrder: 'dsc', submissionSearch: '',
            formCounts: {...initial.formCounts} };

  default:
    return state;
  }
};

export default forms;
