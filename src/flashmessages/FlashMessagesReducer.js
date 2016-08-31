
/**
 * Import action names
 */

import * as FlashMessagesActions from 'flashmessages/FlashMessagesActions';
const types = Object.assign({}, FlashMessagesActions);

/**
 * Initial state
 */

const initialState = {
  type: 'warning',
  show: false,
  message: ''
};

/**
 * Reducer
 */

export default (state = initialState, action) => {

  switch (action.type) {

  case types.SHOW_FLASH_MESSAGE:
    return Object.assign({}, state, { show: true, message: action.message, type: action.messageType});

  case types.HIDE_FLASH_MESSAGE:
    return Object.assign({}, state, { show: false, message: '', type: 'warning' });

  default:
    return state;
  }
};
