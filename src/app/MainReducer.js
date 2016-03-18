import { combineReducers } from 'redux';
import auth from 'auth/AuthReducer';
import comments from 'comments/CommentReducer';
import groups from 'groups/GroupReducer';
import dataExplorer from 'explorer/DataExplorerReducer';
import tags from 'tags/TagReducer';
import filters from 'filters/FiltersReducer';
import users from 'users/UsersReducer';

const rootReducer = combineReducers({
  groups,
  auth,
  comments,
  dataExplorer,
  tags,
  filters,
  users
});

export default rootReducer;
