import * as tagsActions from 'tags/TagActions';
import * as authActions from 'auth/AuthActions';
import L from 'i18n';

const types = Object.assign({}, tagsActions, authActions);

const initialState = {
  loading: false,
  loadingTags: false,
  authorized: localStorage.authorized || false,
  items: [],
  showNoTags: true
};

const tags = (state = initialState, action) => {

  switch (action.type) {

  case types.TAG_REQUEST_STARTED:
    return Object.assign({}, state, {loading: true, hasErrors: false });

  case types.TAG_REQUEST_SUCCESS:
    let tagsCopy;
    switch (action.requestType) {
    case 'create':
      if (typeof action.index !== 'undefined') {
        var firstSlice = state.tags.slice(0, action.index);
        var lastSlice = state.tags.slice(action.index + 1);
        tagsCopy = firstSlice.concat(action.payload).concat(lastSlice);
        return {...state, loading: false, hasErrors: false, tags: tagsCopy };
      } else {
        return {...state, loading: false, hasErrors: false, tags: [ ...state.tags, action.payload ] };
      }
      break;
    case 'delete':
      tagsCopy = state.tags.slice();
      tagsCopy.splice(action.index, 1);
      return {...state, loading: false, hasErrors: false, tags: tagsCopy };
    case 'list':
      return {...state, loading: false, loadingTags: false, hasErrors: false, tags: action.payload };
    }
    break;

  case types.TAG_REQUEST_FAILURE:
    return {
      ...state,
      loadingTags: false,
      hasErrors: true,
      errorMsg: `${L.t('Tag action failed')}: ${action.err}`
    };

  // there's probably a better way to do this
  case types.LOGIN_SUCCESS:
    return {...state, authorized: true};

  case types.LOGGED_OUT:
    return {...state, authorized: false};

  case types.REQUEST_ALL_TAGS:
    return {...state, loadingTags: true};

  case types.RECEIVE_ALL_TAGS:
    return {...state, loadingTags: false, items: action.tags};
    
  case types.TOGGLE_TAG_VISIBILITY:
    if (action.index !== state.items.length) {
      const newItems = [...state.items];
      newItems[action.index].excluded = !action.visible;
      return {...state, items: newItems};
    } else {
      
      return {...state, showNoTags: action.visible};
    }
    
  case types.SHOW_SPECIFIC_TAG:
    const newItems = state.items.map((item, key) => ({...item, excluded: key !== action.index}));
    return {...state, showNoTags: action.index === state.items.length, items: newItems};
  
  case types.SHOW_ALL_TAGS:
    return{...state, items: state.items.map(item => ({...item, excluded: false})), showNoTags: true};


  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default tags;
