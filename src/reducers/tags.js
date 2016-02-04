import * as types from '../actions/tags';

const initialState = {
  loading: false,
  loadingTags: false
};

const tags = (state = initialState, action) => {

  switch (action.type) {

  // Creation
  case types.TAG_CREATION_STARTED:
    return Object.assign({}, state, {loading: true, hasErrors: false });

  case types.TAG_CREATION_SUCCESS:
    if (action.index) {
      var firstSlice = state.tags.slice(0, action.index);
      var lastSlice = state.tags.slice(action.index + 1);
      var tagsCopy = firstSlice.concat(action.storedTag).concat(lastSlice);
      return Object.assign({}, state, {loading: false, hasErrors: false, tags: tagsCopy });  
    } else {
      return Object.assign({}, state, {loading: false, hasErrors: false, tags: [ ...state.tags, action.storedTag ] });  
    }   

  case types.TAG_CREATION_FAILURE:
    return Object.assign({}, state, {loading: false, hasErrors: true, errorMsg: 'Tag creation failed:' + action.err });

  // Listing
  case types.TAG_REQUEST_STARTED:
    return Object.assign({}, state, {loadingTags: true, hasErrors: false });

  case types.TAG_REQUEST_SUCCESS:
    return Object.assign({}, state, {loadingTags: false, hasErrors: false, tags: action.tags });

  case types.TAG_REQUEST_FAILURE:
    return Object.assign({}, state, {loadingTags: false, hasErrors: true, errorMsg: 'Tag request failed: ' + action.err });

  // Deletion
  case types.TAG_DELETE_STARTED:
    return Object.assign({}, state, {loading: true, hasErrors: false });

  case types.TAG_DELETE_SUCCESS:
    var tagsCopy = state.tags.slice();
    tagsCopy.splice(action.index, 1);
    return Object.assign({}, state, {loading: false, hasErrors: false, tags: tagsCopy });

  case types.TAG_DELETE_FAILURE:
    return Object.assign({}, state, {loading: false, hasErrors: true, errorMsg: 'Tag delete failed: ' + action.err });

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default tags;
