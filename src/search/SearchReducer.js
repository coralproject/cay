import * as types from 'search/SearchActions';

const initialState = {
  loading: false,
  loadingQueryset: true,
  activeQuery: null,
  loadingSavedSearch: false,
  activeSavedSearch: null,
  savedSearchError: '',
  recentSavedSearch: null,
  updatingSearch: false,
  editableSearch: null, // this search controls the SearchEditor component
  editableSearchLoading: false,
  editMeta_name: '',
  editMeta_description: '',
  editMeta_tag: '',
  pendingSavedSearch: null, // when the search is being prepared to be saved in pillar
  searchUpdatedSuccessfully: false, // when the search has been updated on the Edit screen
  users: [],
  searches: [],
  savingSearch: false,
  userCount: 0
};

const searches = (state = initialState, action) => {

  switch (action.type) {

  case types.QUERYSET_REQUEST_FAILURE:
    return {
      ...state,
      loadingQueryset: false,
      showTheError: `failed to load query_set ${JSON.stringify(action.error)}`
    };

  case types.SEARCH_REQUEST:
    return {
      ...state,
      loadingSavedSearch: true,
      activeSavedSearch: null,
      savedSearchError: ''
    };

  case types.SEARCH_SUCCESS:
    return {...state, loadingSavedSearch: false, activeSavedSearch: action.search};

  case types.SEARCH_FAILED:
    return {
      ...state,
      loadingSavedSearch: false,
      activeSavedSearch: null,
      savedSearchError: action.error
    };

  case types.CREATE_QUERY: // store the query so it can be easily saved to pillar
    return {...state, activeQuery: action.query};

  case types.QUERYSET_SELECTED:
    return state;

  case types.QUERYSET_REQUEST:
    return {...state, loadingQueryset: true}; // query one query_set?

  // query_set executed. receive a list of users.
  case types.QUERYSET_RECEIVED:
    const users =  action.replace ? [...action.data.results[0].Docs] : [...state.users, ...action.data.results[0].Docs];
    return {...state, loadingQueryset: false, users, userCount: action.userCount};

  case types.SEARCHLIST_REQUEST:
    return {...state, loadingSearches: true};

  // list of all saved searches fetched from Pillar
  case types.SEARCHLIST_SUCCESS:
    return {...state, searches: action.searches, loadingSearches: false};

  case types.SEARCHLIST_FAILED:
    return {...state, loadingSearches: false, searchListError: action.error};

  case types.SEARCH_SAVE_INIT:
    return {...state, savingSearch: true};

  case types.SEARCH_SAVE_SUCCESS:
    // mark the search as recent so the mod can view its details
    // push it onto the array of saved searches
    return {
      ...state,
      savingSearch: false,
      recentSavedSearch: action.search,
      searches: state.searches.concat(action.search)
    };

  case types.SEARCH_SAVE_FAILED:
    return {...state, savingSearch: false};

  case types.SEARCH_DELETE_INIT:
    return {...state, pendingDeleteSearch: action.search};

  case types.SEARCH_DELETED:
    // slice the deleted search out by id?
    return {...state, pendingDeleteSearch: null, searches: action.newSearches};

  case types.SEARCH_DELETE_FAILURE:
    return {...state, pendingDeleteSearch: null};

  case types.UPDATE_EDITABLE_SEARCH_META:
    return {...state, [`editMeta_${action.field}`]: action.value};

  case types.SAVED_SEARCH_EDIT_REQUEST:
    return {...state, editableSearchLoading: true};

  // saved search loaded from pillar to be edited
  case types.EDIT_SEARCH_SUCCESS:

    return {
      ...state,
      editableSearch: action.search,
      editableSearchLoading: false,
      editMeta_name: action.search.name,
      editMeta_description: action.search.description,
      editMeta_tag: action.search.tag
    };

  case types.EDIT_SEARCH_FAILED:
    return {...state, editableSearch: null, editableSearchLoading: false};

  case types.SAVED_SEARCH_UPDATE: // begin search update
    return {...state, updatingSearch: true, searchUpdatedSuccessfully: false};

  case types.SEARCH_UPDATE_SUCCESS: // search has been successfully updated
    return {...state, editableSearch: action.search, updatingSearch: false, searchUpdatedSuccessfully: true};

  case types.SEARCH_UPDATE_FAILED:
    return {...state, updatingSearch: false, error: action.error, searchUpdatedSuccessfully: false};

  case types.SEARCH_UPDATE_STALE: // just clearing out some UI elements after updating a serach
    return {...state, searchUpdatedSuccessfully: false};

  case types.CLEAR_USER_LIST:
    return {...state, users: []};

  case types.CLEAR_RECENT_SAVED_SEARCH:
    return {...state, recentSavedSearch: null};

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default searches;
