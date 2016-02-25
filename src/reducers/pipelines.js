import * as types from '../actions';

const initialState = {
  authorized: localStorage.authorized || false,
  loading: false,
  loadingPipeline: false,
  loadingTags: false,
  pipesLoaded: false,
  selectedUser: null,
  pipelines: [],
  users: [],
  comments: [],
  tags: [],
  userDetailComments: null,
  loadingUserComments: false
};

const pipelines = (state = initialState, action) => {

  switch (action.type) {

  case types.PIPELINES_REQUEST:
    return Object.assign({}, state, {loading: true});

  case types.PIPELINES_REQUEST_FAILURE:
    return Object.assign({}, state, {loading: false, showTheError: 'failed to load pipelines from server'});

  case types.PIPELINE_REQUEST_FAILURE:
    return Object.assign({}, state, {loadingPipeline: false, showTheError: 'failed to load ' + action.pipelineName});

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.PIPELINES_RECEIVED:
    return Object.assign({}, state,
      {
        loading: false,
        // this probably isn't the final way to do this.
        // queries will eventually be length > 1
        pipelines: action.pipelines.filter(pipe => pipe.queries[0].collection === 'user')
      }
    );

  case types.PIPELINE_SELECTED:
    return state;

  case types.PIPELINE_REQUEST:
    return Object.assign({}, state, {loadingPipeline: true}); // query one pipeline?

  // query_set executed. receive a list of users.
  case types.PIPELINE_RECEIVED:

    return Object.assign({}, state, { loadingPipeline: false, users: action.data.results[0].Docs});

  case types.USER_SELECTED:
    return Object.assign({}, state, {selectedUser: action.user});

  case types.COMMENTS_REQUEST:
    return Object.assign({}, state, {loadingUserComments: true});

  case types.COMMENTS_SUCCESS:
    return Object.assign({}, state, {loadingUserComments: false, userDetailComments: action.data.results[0].Docs});

  case types.CLEAR_USER_DETAIL_COMMENTS:
    return Object.assign({}, state, {userDetailComments: null});

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default pipelines;
