
/**
 * Action names
 */

export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';

/**
 * Action creators API
 */

export const showFlashMessage = (message, messageType, duration=5000) => dispatch => {
  dispatch({ type: SHOW_FLASH_MESSAGE, message, messageType });

  if (duration) {
    setTimeout(() => dispatch(hideFlashMessage()), duration);
  }
};

export const hideFlashMessage = () => ({ type: HIDE_FLASH_MESSAGE });
