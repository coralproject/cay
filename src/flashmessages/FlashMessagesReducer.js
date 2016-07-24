import * as FlashMessagesActions from 'flashmessages/FlashMessagesActions';

const types = Object.assign({}, FlashMessagesActions);

const initialState = {
  type: 'warning',
  show: false,
  message: ''
};

const flashMessages = (state = initialState, action) => {

  switch (action.type) {

  case types.SHOW_FLASH_MESSAGE:
    return Object.assign({}, state, { show: true, message: action.message, type: action.messageType });

  case types.HIDE_FLASH_MESSAGE:
    return Object.assign({}, state, { show: false, message: '', type: 'warning' });

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default flashMessages;
