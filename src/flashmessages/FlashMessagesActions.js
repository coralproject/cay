
/**
 * Action names
 */

export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';

/**
 * Action creators API
 */

export const showFlashMessage = (message, messageType) => ({
  type: SHOW_FLASH_MESSAGE,
  message,
  messageType
});

export const hideFlashMessage = () => ({ type: HIDE_FLASH_MESSAGE });
