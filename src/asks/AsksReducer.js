import * as types from 'asks/AskActions';

const initial = {
  items: [],
  editAccess: {}
};

for (let i = 0; i < 100; i++) {
  initial.items.push({name: `My ask ${i}`, description: 'This is my first ask, I\'m pretty excited', answers: Math.floor(Math.random() * 100), _id: i});
}

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

  default:
    return state;
  }
};

export default asks;
