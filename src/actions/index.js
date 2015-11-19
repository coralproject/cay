export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const SET_FILTER = 'SET_FILTER';
export const UNSET_FILTERS = 'UNSET_FILTERS';

export const SELECT_USER = 'SELECT_USER';

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

export const setFilter = (id) => {
  return {
    type: SET_FILTER,
    id: id
  };
};

export const unsetFilters = () => {
  return {
    type: UNSET_FILTERS
  };
};

export const selectUser = (id) => {
  return {
    type: SELECT_USER,
    id: id
  }
};
