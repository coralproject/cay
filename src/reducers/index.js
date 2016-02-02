import { combineReducers } from 'redux';
import auth from './auth';
import comments from './comments';
import pipelines from './pipelines';
import dataExplorer from './data-explorer';
import tags from './tags';

const rootReducer = combineReducers({
  pipelines,
  auth,
  comments,
  dataExplorer,
  tags
});

export default rootReducer;
