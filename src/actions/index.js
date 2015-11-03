export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const SHOW_ALL = 'SHOW_ALL';
export const HIDE_ALL = 'HIDE_ALL';

export const requestData = () => {
  return {
    type: REQUEST_DATA
  };
};

export const receiveData = (data) => {
  return {
    type: RECEIVE_DATA,
    data: data
  };
};

export const fetchData = (message) => {
  return (dispatch) => {
    dispatch(requestData());
    setTimeout(() => {
      dispatch(receiveData({message}));
    }, 300)
  };
};

export const showUsers = () => {
  return {
    type: SHOW_ALL,
    text: 'show the users?'
  };
};

export const hideUsers = (message) => {
  return {
    type: HIDE_ALL,
    text: message
  };
};
