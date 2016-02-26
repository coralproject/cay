import * as index from '../actions';
import * as tagActions from '../actions/tags';

const types = Object.assign({}, index, tagActions);

const initialState = {
  loading: false,
  loadingTags: false,
  authorized: window.localStorage.authorized || false
};

const tags = (state = initialState, action) => {

  switch (action.type) {

  case types.TAG_REQUEST_STARTED:
    return Object.assign({}, state, {loading: true, hasErrors: false });

  case types.TAG_REQUEST_SUCCESS:
    switch (action.requestType) {
    case 'create':
      if (typeof action.index !== "undefined") {
        var firstSlice = state.tags.slice(0, action.index);
        var lastSlice = state.tags.slice(action.index + 1);
        var tagsCopy = firstSlice.concat(action.payload).concat(lastSlice);
        return Object.assign({}, state, {loading: false, hasErrors: false, tags: tagsCopy });
      } else {
        return Object.assign({}, state, {loading: false, hasErrors: false, tags: [ ...state.tags, action.payload ] });
      }
      break;
    case 'delete':
      var tagsCopy = state.tags.slice();
      tagsCopy.splice(action.index, 1);
      return Object.assign({}, state, {loading: false, hasErrors: false, tags: tagsCopy });
    case 'list':
      return Object.assign({}, state, {loading: false, loadingTags: false, hasErrors: false, tags: action.payload });
    }
    break;

  case types.TAG_REQUEST_FAILURE:
    return Object.assign({}, state, {loadingTags: false, hasErrors: true, errorMsg: 'Tag action failed: ' + action.err });

  // there's probably a better way to do this
  case types.LOGIN_SUCCESS:
    console.log('\n\nTag Reducer LOGIN_SUCCESS\n\n');
    return Object.assign({}, state, {authorized: true});

  case types.LOGGED_OUT:
    return Object.assign({}, state, {authorized: false});

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default tags;
