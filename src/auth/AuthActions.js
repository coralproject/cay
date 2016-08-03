
/**
 * Action names
 */

export const LOGIN_INIT = 'LOGIN_INIT'; // user has clicked the Sign In button
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // login request success
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // login request failure
export const LOG_OUT = 'LOG_OUT';

/**
 * Login action creators
 */

const loginInit = (email, pass) => ({ type: LOGIN_INIT, email, pass });

const loginSuccess = () => ({ type: LOGIN_SUCCESS });

const loginFailure = err => ({ type: LOGIN_FAILURE, err });

/**
 * Actions API
 */

/**
 * Login
 */

export const login = (email, password) => (dispatch, getState) => {
  // If already logging in user, prevent another attempt
  if (getState().loading) {
    return;
  }

  // try to login the user
  dispatch(loginInit(email, password));
  /* fake login until we have actual users */
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

/**
 * Logout
 */
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
    type: LOG_OUT
  };
};
