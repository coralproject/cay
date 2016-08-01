
/**
 * Module dependencies
 */

import { combineReducers } from 'redux';
import app from 'app/AppReducer';
import auth from 'auth/AuthReducer';
import comments from 'comments/CommentReducer';
import searches from 'search/SearchReducer';
import tags from 'tags/TagReducer';
import filters from 'filters/FiltersReducer';
import users from 'users/UsersReducer';
import forms from 'forms/FormsReducer';
import flashMessages from 'flashmessages/FlashMessagesReducer';

/**
 * Export combined reducer
 */

export default combineReducers({
  app,
  searches,
  auth,
  comments,
  tags,
  filters,
  users,
  forms,
  flashMessages
});
