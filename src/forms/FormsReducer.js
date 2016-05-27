import * as types from 'forms/FormActions';
import _ from 'lodash';

const initial = {
  items: [],
  editAccess: {},
  form: null
};

// for testing purposes only
import form from 'form.json';

for (let i = 0; i < 100; i++) {
  initial.items.push({...form, answers: Math.floor(Math.random() * 100), id: i, status: _.sample(['active', 'draft', 'past'])});
}

const emptyForm = {
  settings: {

  },
  footer: {
    permissions: 'Code of conduct'
  },
  page: {
    children: [{
      type: 'field',
      component: 'MultipleChoice',
      title: 'Select one or several themes for your story',
      required: true,
      pseudoLabel: true,
      props: {
        multipleChoice: true,
        options: [{title: 'Pablo'}, {title: 'Familiy life'}, {title: 'School'}, {title: 'Law Enforcement'}]
      }
    }]
  }
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
    return Object.assign({}, state, {form: emptyForm });

  case types.FORMS_REQUEST_SUCCESS:
    return Object.assign({}, state, { items: action.forms })

  default:
    return state;
  }
};

export default forms;
