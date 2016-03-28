import { combineReducers } from 'redux';
import app from 'app/AppReducer';
import auth from 'auth/AuthReducer';
import comments from 'comments/CommentReducer';
import groups from 'groups/GroupReducer';
import dataExplorer from 'explorer/DataExplorerReducer';
import tags from 'tags/TagReducer';
import filters from 'filters/FiltersReducer';
import users from 'users/UsersReducer';
import playground from 'playground/PlaygroundReducer';

const rootReducer = combineReducers({
  app,
  groups,
  auth,
  comments,
  dataExplorer,
  tags,
  filters,
  users,
  playground
});

export default rootReducer;
