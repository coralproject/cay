import { combineReducers } from 'redux';
import data from './data';
import users from './users';
import auth from './auth';
import comments from './comments';

const rootReducer = combineReducers({
  data, users, auth, comments
});

export default rootReducer;
