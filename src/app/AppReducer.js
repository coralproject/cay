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

  case types.CONFIG_REQUEST:
    return Object.assign({}, state, {loadingConfig: true});

  case types.CONFIG_LOADED:

    // whoa! this is a stopgap until I write the xenia package.
    // if I don't do this, I'd have to implement some insane redux middleware
    // only to unwind it after the xenia package anyway.
    window.basicAuthorization = action.config.basicAuthorization;
    types.configXenia(action.config);

    return Object.assign(
      {},
      state,
      {loadingConfig: false, configLoaded: true},
      action.config
    );

  case types.CONFIG_ERROR:
    return Object.assign({}, state, {
      loadingConfig: false,
      configErrorMessage: action.message
    });

  default:
    return state;
  }
};

export default app;
