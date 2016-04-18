import * as types from 'search/SearchActions';

const initialState = {
  authorized: localStorage.authorized || false,
  loading: false,
  loadingQueryset: false,
  activeQuery: null,
  pendingSavedSearch: null, // when the search is being prepared to be saved in pillar
  users: [],
  searches: [],
  savingSearch: false
};

const searches = (state = initialState, action) => {

  switch (action.type) {

  case types.QUERYSET_REQUEST_FAILURE:
    return {
      ...state,
      loadingQueryset: false,
      showTheError: `failed to load ${action.querysetName}`
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
    return {...state, loadingQueryset: false, users};

  case types.PILLAR_SEARCHLIST_REQUEST:
    return {...state, loadingSearches: true};

  // list of all saved searches fetched from Pillar
  case types.PILLAR_SEARCHLIST_SUCCESS:
    return {...state, searches: action.searches, loadingSearches: false};

  case types.PILLAR_SEARCHLIST_FAILED:
    return {...state, loadingSearches: false, searchListError: action.error};

  case types.PILLAR_SEARCH_SAVE_INIT:
    return {...state, savingSearch: true};

  case types.PILLAR_SEARCH_SAVE_SUCCESS:
    // mark the search as recent so the mod can view its details
    // push it onto the array of saved searches
    return {...state, savingSearch: false, recentSavedSearch: action.search, searches: state.searches.concat(action.search)};

  case types.PILLAR_SEARCH_SAVE_FAILED:
    return {...state, savingSearch: false};

  case types.PILLAR_SEARCH_DELETE_INIT:
    return {...state, pendingDeleteSearch: action.search};

  case types.PILLAR_SEARCH_DELETED:
    // slice the deleted search out by id?
    return {...state, pendingDeleteSearch: null, searches: action.newSearches};

  case types.PILLAR_SEARCH_DELETE_FAILURE:
    return {...state, pendingDeleteSearch: null};

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default searches;
