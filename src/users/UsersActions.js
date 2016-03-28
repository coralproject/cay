export const USER_SELECTED = 'USER_SELECTED';
export const RECEIVE_UPSERTED_USER = 'RECEIVE_UPSERTED_USER';
export const REQUEST_USER_UPSERT = 'REQUEST_USER_UPSERT';
export const USER_UPSERT_REQUEST_ERROR = 'USER_UPSERT_REQUEST_ERROR';

export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';

/* config */

export const userSelected = (user) => {
  return {
    type: USER_SELECTED,
    user
  };
};

const receiveUpsertedUser = (user) => {
  return {
    type: RECEIVE_UPSERTED_USER,
    user
  };
};

const requestUserUpsert = () => {
  return {
    type: REQUEST_USER_UPSERT
  };
};

const userUpsertRequestError = (err) => {
  return {
    type: USER_UPSERT_REQUEST_ERROR,
    err
  };
};

export const upsertUser = (preparedObject) => {
  return (dispatch, getState) => {
    if (!getState().upsertingUser) {
      dispatch(requestUserUpsert());

      var headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });

      var init = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(preparedObject)
      };

      fetch(getState().app.pillarHost + '/api/user', init)
        .then(res => res.json())
        .then(json => {
          dispatch(receiveUpsertedUser(json));
        }).catch(err => {
          dispatch(userUpsertRequestError(err));
        });

    } else {
      return {type: 'NOOP'};
    }
  };

};
