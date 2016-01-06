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

export const STORE_COMMENTS = 'STORE_COMMENTS';

export const REQUEST_DATA_EXPLORATION_DATASET = "REQUEST_DATA_EXPLORATION_DATASET";
export const RECEIVE_DATA_EXPLORATION_DATASET = "RECEIVE_DATA_EXPLORATION_DATASET";
export const DATA_EXPLORATION_FETCH_ERROR = "DATA_EXPLORATION_FETCH_ERROR";

var getInit = () => {
  var headers = new Headers({'Authorization': 'Basic NmQ3MmU2ZGQtOTNkMC00NDEzLTliNGMtODU0NmQ0ZDM1MTRlOlBDeVgvTFRHWjhOdGZWOGVReXZObkpydm4xc2loQk9uQW5TNFpGZGNFdnc9'});

  var init = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return init;
}

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
    user: user.user_id
  }
};

export const requestUsers = (filterId) => {
  return {
    type: USERS_REQUEST,
    filterId
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

export const fetchUserListIfNotFetched = (filterId) => {

  return (dispatch,getState) => {

    if (! getState().userList.loading && getState().userList.loadedFilterId !== filterId) {
      return dispatch(fetchUsers(filterId));
    }

    return {
      type: 'NOOP'
    };

  };

};


export const fetchUsers = (filterId) => {
  return (dispatch) => {

    dispatch(requestUsers(filterId));

    fetch('http://localhost:4000/1.0/query/test_basic/exec', getInit())
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


export const fetchCommentsByUser = (data) => {
  return (dispatch) => {
    dispatch(requestComments());

    var myRequest = new Request('http://localhost:4000/1.0/query/comments_by_user/exec?user_id=' + data.user_id, getInit());

    fetch(myRequest)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComments(json));
        dispatch(storeComments(json));
      })
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

export const storeComments = (data) => {
  return {
    type: STORE_COMMENTS,
    data
  }
}




/* data exploration */

const requestDataExplorationDataset = () => {
  return {
    type: REQUEST_DATA_EXPLORATION_DATASET,
  }
}

const receiveDataExplorationDataset = (data) => {
  return {
    type: REQUEST_DATA_EXPLORATION_DATASET,
    data
  }
}

const dataExplorationFetchError = (err) => {
  return {
    type: DATA_EXPLORATION_FETCH_ERROR,
    error
  }
}

export const fetchDataExplorationDataset = (params) => {
  return (dispatch) => {
    dispatch(requestDataExplorationDataset());
    fetch('http://localhost:4000/1.0/query/top_commenters_by_count/exec', getInit())
      .then(response => response.json())
      .then(json => {
        dispatch(receiveDataExplorationDataset(json));
      })
      .catch(err => dispatch(dataExplorationFetchError(err)));
  };
};






