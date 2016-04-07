import * as types from 'app/AppActions';

const initialState = {
  configLoaded: false,
  loadingConfig: false,
  xeniaHost: null,
  pillarHost: null,
  environment: null
};

const app = (state = initialState, action) => {
  switch (action.type) {

  case types.CONFIG_ERROR:
    return {...state, configErrorMessage: action.message};

  default:
    return state;
  }
};

export default app;
