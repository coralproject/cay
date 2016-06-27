import * as types from 'app/AppActions';

/* initialState is defined in index.js
   and loaded from public/config.json and public/data_config.json */
const initialState = {};

const app = (state = initialState, action) => {
  switch (action.type) {

  case types.CONFIG_ERROR:
    return {...state, configErrorMessage: action.message};

  default:
    return state;
  }
};

export default app;
