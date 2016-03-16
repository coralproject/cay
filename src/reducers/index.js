import { combineReducers } from 'redux';
import auth from './auth';
import comments from './comments';
import groups from './groups';
import dataExplorer from './data-explorer';
import tags from './tags';
import filters from './filters';
import feedback from './feedback';

const rootReducer = combineReducers({
  groups,
  auth,
  comments,
  dataExplorer,
  tags,
  filters,
  feedback
});

export default rootReducer;
