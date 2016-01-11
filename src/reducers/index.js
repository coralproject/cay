import { combineReducers } from 'redux';
import data from './data';
import users from './users';
import auth from './auth';
import comments from './comments';
import userList from './user-list';
import playground from './playground';

import dataExplorer from './data-explorer';

const rootReducer = combineReducers({
  data,
  users,
  auth,
  comments,
  userList,
  dataExplorer,
  playground
});

export default rootReducer;
