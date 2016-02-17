import * as types from '../actions';

const initialState = {
  loading: false,
  loadingPipeline: false,
  pipesLoaded: false,
  selectedUser: null,
  pipelines: [],
  users: [],
  tags: [],
  authors: [],
  comments: [],
  userDetailComments: null,
  loadingUserComments: false
};

const pipelines = (state = initialState, action) => {

  switch (action.type) {
  case types.PIPELINE_SELECTED:
    return state;

  case types.PIPELINES_REQUEST:
    return Object.assign({}, state, {loading: true});

  case types.PIPELINE_REQUEST:
    return Object.assign({}, state, {loadingPipeline: true}); // query one pipeline?

  case types.PIPELINES_REQUEST_FAILURE:
    return Object.assign({}, state, {loading: false, showTheError: 'failed to load pipelines from server'});

  case types.PIPELINE_REQUEST_FAILURE:
    return Object.assign({}, state, {loadingPipeline: false, showTheError: 'failed to load ' + action.pipelineName});

  case types.PIPELINES_RECEIVED:
    return Object.assign({}, state,
      {
        loading: false,
        // this probably isn't the final way to do this.
        // queries will eventually be length > 1
        pipelines: action.pipelines.filter(pipe => pipe.queries[0].collection === 'user')
      }
    );

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

  case types.REQUEST_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: true});

  case types.RECEIVE_ALL_TAGS:
    return Object.assign({}, state, {loadingTags: false, tags: action.tags});

  case types.ALL_TAGS_REQUEST_ERROR:
    return Object.assign({}, state, {loadingTags: false, tagError: 'Failed to load tags ' + action.err});

  case types.RECEIVE_AUTHORS_AND_SECTIONS:
    return Object.assign({}, state, {
      sections: Object.keys(action.data.results[0].Docs[0].data.sections),
      authors: Object.keys(action.data.reults[0].Docs[0].data.authors)
    });

  default:
    // console.log('no reducer matches:', action.type);
    return state;
  }
};

export default pipelines;
