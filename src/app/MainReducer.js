
/**
 * Module dependencies
 */

import { combineReducers } from 'redux';
import app from 'app/AppReducer';
import { reducer as oidc } from 'redux-oidc';
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
  oidc,
  app,
  searches,
  comments,
  tags,
  filters,
  users,
  forms,
  flashMessages
});
