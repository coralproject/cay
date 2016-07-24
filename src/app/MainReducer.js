import { combineReducers } from 'redux';
import app from 'app/AppReducer';
import auth from 'auth/AuthReducer';
import comments from 'comments/CommentReducer';
import searches from 'search/SearchReducer';
import dataExplorer from 'explorer/DataExplorerReducer';
import tags from 'tags/TagReducer';
import filters from 'filters/FiltersReducer';
import users from 'users/UsersReducer';
import forms from 'forms/FormsReducer';
import flashMessages from 'flashmessages/FlashMessagesReducer';

const rootReducer = combineReducers({
  app,
  searches,
  auth,
  comments,
  dataExplorer,
  tags,
  filters,
  users,
  forms,
  flashMessages
});

export default rootReducer;
