import { combineReducers } from 'redux';
import data from './data';
import users from './users';

const rootReducer = combineReducers({
  data, users
});

export default rootReducer;
