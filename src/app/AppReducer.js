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

  /* put some app-level actions here. probably error reporting */

  default:
    return state;
  }
};

export default app;
