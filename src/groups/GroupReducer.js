import * as types from 'groups/GroupActions';

const initialState = {
  authorized: localStorage.authorized || false,
  loading: false,
  loadingQueryset: false,
  activeQuery: null,
  pendingSavedSearch: null, // when the search is being prepared to be saved in pillar
  querysets: [],
  users: [],
  groups: [],
  searches: [],
  savingSearch: false
};

const searches = (state = initialState, action) => {

  switch (action.type) {

  case types.QUERYSETS_REQUEST:
    return {...state, loading: true};

  case types.QUERYSETS_REQUEST_FAILURE:
    return {
      ...state,
      loading: false,
      showTheError: 'failed to load querysets from server'
    };

  case types.QUERYSET_REQUEST_FAILURE:
    return {
      ...state,
      loadingQueryset: false,
      showTheError: `failed to load ${action.querysetName}`
    };

  case types.QUERYSETS_RECEIVED:
    return Object.assign({}, state,
      {
        loading: false,
        // this probably isn't the final way to do this.
        // queries will eventually be length > 1
        groups: action.querysets,
        querysets: action.querysets.filter(qs => {
          return qs.queries[0].collection === 'user_statistics' && qs.name !== 'user_search';
        })
      }
    );

  case types.CREATE_QUERY: // store the query so it can be easily saved to pillar
    return {...state, activeQuery: action.query};

  case types.QUERYSET_SELECTED:
    return state;

  case types.QUERYSET_REQUEST:
    return {...state, loadingQueryset: true}; // query one query_set?

  // query_set executed. receive a list of users.
  case types.QUERYSET_RECEIVED:

    return {...state, loadingQueryset: false, users: action.data.results[0].Docs};

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
    return {...state, savingSearch: false};

  case types.PILLAR_SEARCH_SAVE_FAILED:
    return {...state, savingSearch: false};

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default searches;
