// Exported constants
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';

export const showFlashMessage = (message, messageType) => {
  return {
    type: SHOW_FLASH_MESSAGE,
    message,
    messageType
  };
};

export const hideFlashMessage = () => {
  return {
    type: HIDE_FLASH_MESSAGE
  };
};
