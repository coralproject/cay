
/**
 * Connect socket.io with redux
 * Credits to https://github.com/itaylor/redux-socket.io/
 */

import io from 'socket.io-client';

const ACTION_TYPE = 'action';

export const socket = io();

export const middleware = ({dispatch}) => {
  socket.on(ACTION_TYPE, dispatch);

  return next => action => {
    const { type, publish } = action;

    if (type) {
      if (publish) {
        socket.emit(ACTION_TYPE, action);
      }
    }

    return next(action);
  };
};
