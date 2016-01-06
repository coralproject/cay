import { combineReducers } from 'redux';
import data from './data';
import users from './users';
import auth from './auth';
import comments from './comments';
import userList from './user-list';
import playground from './playground';

const rootReducer = combineReducers({
  data, users, auth, comments, userList, playground
});

export default rootReducer;
