import * as types from '../actions';
import _ from 'lodash';

const initialState = {
  assets: {},
  users: {},
  comments: {},
  funnels: {}
};

const data = (state = initialState, action) => {
  switch (action.type) {
  case types.STORE_COMMENTS:
    return _.extend(
      {},
      state,
      {
        comments: _.reduce(action.data.results[0].Docs, function (memo, comment) {
          memo[comment.id] = comment;
          return memo;
        }, _.cloneDeep(state.comments))
      }
    );
  case types.RECEIVE_DATA:
    return Object.assign({}, state, {
      loading: false,
      message: action.data
    });
  default:
    return state;
  }
};

export default data;
