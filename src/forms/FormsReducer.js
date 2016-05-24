import * as types from 'forms/FormActions';

const initial = {
  items: [],
  editAccess: {},
  ask: null
};

for (let i = 0; i < 100; i++) {
  initial.items.push({name: `My ask ${i}`, description: 'This is my first ask, I\'m pretty excited', answers: Math.floor(Math.random() * 100), _id: i});
}

const emptyAsk = {
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

const asks = (state = initial, action) => {

  switch (action.type) {

  case types.ASK_REQUEST_STARTED:
    return state;

  case types.ASK_REQUEST_SUCCESS:
    return state;

  case types.ASK_REQUEST_FAILURE:
    return state;

  case types.ASK_DELETED:
    return state;

  case types.ASK_EDIT_ACCEPTED:
    var newState = Object.assign({}, state);
    newState.editAccess[action.askId] = true;
    return newState;

  case types.ASK_EDIT_DENIED:
    var newState = Object.assign({}, state);
    delete newState.editAccess[action.askId];
    return newState;

  case types.ASK_CREATE_EMPTY:
    return Object.assign({}, state, {ask: emptyAsk });

  default:
    return state;
  }
};

export default asks;
