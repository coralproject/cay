export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const SET_FILTER = 'SET_FILTER';
export const UNSET_FILTERS = 'UNSET_FILTERS';

export const SELECT_USER = 'SELECT_USER';
export const USERS_REQUEST = 'USERS_REQUEST';
export const REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE';
export const RECIEVE_USERS = 'RECIEVE_USERS';

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
    id
  };
};

export const unsetFilters = () => {
  return {
    type: UNSET_FILTERS
  };
};

export const selectUser = (user) => {
  return {
    type: SELECT_USER,
    user
  }
};

export const requestUsers = (query) => {
  return {
    type: USERS_REQUEST,
    query
  };
};

export const recieveUsers = (message) => {
  return {
    type: RECIEVE_USERS,
    message
  };
};

export const requestUsersFailure = (err) => {
  return {
    type: REQUEST_USERS_FAILURE,
    err
  }
}

export const fetchUsers = (query) => {
  return (dispatch) => {
    dispatch(requestUsers(query));

    fetch('http://localhost:3000/data/users.json')
      .then(response => response.json())
      .then(json => dispatch(recieveUsers(json)))
      .catch(err => dispatch(requestUsersFailure(err)));
  };
};
