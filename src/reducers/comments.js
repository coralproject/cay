import * as types from '../actions';

const initialState = {
  loading: false,
  item: []
};

const comments = (state = initialState, action) => {

  switch (action.type) {

    case types.COMMENT_CLICK:
      return state;

    case types.COMMENT_REQUEST:
      return Object.assign({}, state, {loading: true});

    case types.COMMENT_SUCCESS:
      console.log(action);
      return Object.assign({}, state, {items: action.data.results[0].Docs});
    
    case types.COMMENT_FAIL:
      return Object.assign({}, state, {items: []});

  }
}

export default comments;
