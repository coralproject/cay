import * as types from 'asks/AskActions';

const initial = {
  items: []
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
    console.log(types.ASK_DELETED, action);
    return state;

  default:
    return state;
  }
};

export default asks;
