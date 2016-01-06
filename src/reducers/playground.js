import * as types from '../actions/playground';

const initialState = {
  customizerIsVisible: false
};

const playground = (state = initialState, action) => {

  switch (action.type) {

    case types.SHOW_CUSTOMIZER:
      return Object.assign({}, state, {customizerIsVisible: true });

    case types.HIDE_CUSTOMIZER:
      return Object.assign({}, state, {customizerIsVisible: false });

    default:
      console.log('Not a Playground action:', action.type);
      return state;
  }

  return state;

};

export default playground;
