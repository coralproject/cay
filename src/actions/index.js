export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const SET_FILTER = 'SET_FILTER';
export const UNSET_FILTERS = 'UNSET_FILTERS';

export const SELECT_USER = 'SELECT_USER';
export const USERS_REQUEST = 'USERS_REQUEST';
export const REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE';
export const RECIEVE_USERS = 'RECIEVE_USERS';

export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // login http request started
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAIL = 'LOGIN_FAIL'; // login request failure

export const COMMENT_CLICK = 'COMMENT_CLICK';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';

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
  };
};

export const fetchUsers = (query) => {
  return (dispatch) => {
    dispatch(requestUsers(query));

    fetch('http://localhost:3000/data/users.json')
      .then(response => response.json())
      .then(json => dispatch(recieveUsers(json)))
      .catch(err => dispatch(requestUsersFailure(err)));
  };
};


/* stuff for the login screen */

export const initLogin = (username, password) => {
  return {
    type: LOGIN_INIT,
    username,
    password
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch();
  };
};

export const clickCommentButton = () => {
  return {
    type: 'COMMENT_CLICK'
  };
};

export const fetchComments = () => {
  return (dispatch) => {
    dispatch(requestComments());


    var myHeaders = new Headers({'Authorization': 'Basic NmQ3MmU2ZGQtOTNkMC00NDEzLTliNGMtODU0NmQ0ZDM1MTRlOlBDeVgvTFRHWjhOdGZWOGVReXZObkpydm4xc2loQk9uQW5TNFpGZGNFdnc9'});

    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

               console.log(myHeaders.get('Authorization'));

    var myRequest = new Request('http://localhost:4000/1.0/query/top_commenters_by_count/exec', myInit);

    fetch(myRequest)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
      .catch(err => dispatch(receiveCommentsFailure(err)));


/*      .then(response => {
        dispatch(COMMENTS_SUCCESS, response);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });*/
  };
};

export const requestComments = () => {
  return {
    type: COMMENTS_REQUEST
  };
};

export const receiveComments = (data) => {
  return {
    type: COMMENTS_SUCCESS,
    data
  }
}


