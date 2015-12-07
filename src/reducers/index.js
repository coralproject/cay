import { combineReducers } from 'redux';
import data from './data';
import users from './users';
import auth from './auth';

const rootReducer = combineReducers({
  data, users, auth
});

export default rootReducer;
