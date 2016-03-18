import { combineReducers } from 'redux';
import auth from './auth';
import comments from './comments';
import playground from './playground';
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
  playground,
  tags,
  filters,
  feedback
});

export default rootReducer;
