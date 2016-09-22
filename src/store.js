/*global devToolsExtension */

/**
 * Module dependencies
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createOidcMiddleware, { createUserManager } from 'redux-oidc';
import createHistory from 'history/lib/createBrowserHistory';
import createDebounce from 'redux-debounce';
import rootReducer from 'app/MainReducer';

/**
 * Store middlewares
 */

const configODIC = {
  client_id: 'coral',
  redirect_uri: `${window.location.protocol}//${window.location.host}/forms`,
  response_type: 'id_token',
  scope: 'openid profile',
  authority: 'http://localhost/connect',
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.host}/login`,
  silent_redirect_uri: `${window.location.protocol}//${window.location.host}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};
export const userManager = createUserManager(configODIC);
const oidcMiddleware = createOidcMiddleware(userManager);
const debouncer = createDebounce({ userMangerFilters: 500 });
const middleware = [thunk, debouncer, oidcMiddleware];
const devTools = typeof devToolsExtension !== 'undefined' ? devToolsExtension() : f => f;

/**
 * Store creator based on environment
 */

const envCreateStore = process.env.NODE_ENV === 'production'
  ? applyMiddleware(...middleware)(createStore)
  : compose(applyMiddleware(...middleware), devTools)(createStore);

/**
 * Expose final store creator
 */

export default initialState => envCreateStore(rootReducer, initialState);
