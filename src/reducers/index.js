import { combineReducers } from 'redux';
import data from './data';
import auth from './auth';
import comments from './comments';
import users from './users';
import dataExplorer from './data-explorer';

const rootReducer = combineReducers({
  data,
  users,
  auth,
  comments,
  dataExplorer
});

export default rootReducer;
