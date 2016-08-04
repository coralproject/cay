export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // login request failure
export const LOGGED_OUT = 'LOGGED_OUT';

/* stuff for the login screen */

const loginInit = (email, pass) => {
  return {
    type: LOGIN_INIT,
    email,
    pass
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    err
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {

    if (getState().loading) {
      return;
    }

    dispatch(loginInit(email, password));
    /* xenia_package */
    fetch(`./auth.php?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .then(response => response.json())
      .then(json => {
        if (json.valid === 1) {
          localStorage.authorized = true;
          dispatch(loginSuccess());
        } else {
          dispatch(loginFailure('unauthorized'));
        }
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};

export const logout = () => {
  localStorage.removeItem('authorized');
  return {
    type: LOGGED_OUT
  };
};
