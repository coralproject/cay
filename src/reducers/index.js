import { combineReducers } from 'redux';
import auth from './auth';
import comments from './comments';
import playground from './playground';
import pipelines from './pipelines';
import dataExplorer from './data-explorer';
import tags from './tags';
import filters from './filters';

const rootReducer = combineReducers({
  pipelines,
  auth,
  comments,
  dataExplorer,
  playground,
  tags,
  filters
});

export default rootReducer;
