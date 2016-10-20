/*global devToolsExtension */

/**
 * Module dependencies
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createOidcMiddleware, {createUserManager} from 'redux-oidc';
import {WebStorageStateStore} from 'oidc-client';
import createDebounce from 'redux-debounce';
import getRootReducer from 'app/MainReducer';

export let userManagerConfig = {
  client_id: null, // populated after config is loaded
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  response_type: 'id_token token',
  scope: 'openid',
  authority: null, // also populated after config is loaded
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.host}/login`,
  loadUserInfo: false,
  userStore: new WebStorageStateStore({store: window.localStorage}),
  monitorSession: false
};

export let userManager = null; // created below

/**
 * Expose final store creator
 */

export default initialState => {

  userManagerConfig.client_id = initialState.app.authClientId;
  userManagerConfig.authority = initialState.app.authAuthority;

  /**
   * Store middlewares
   */
  // https://github.com/maxmantz/redux-oidc/wiki/3.-API
  const debouncer = createDebounce({ userMangerFilters: 500 });
  const middleware = [thunk, debouncer];
  const devTools = typeof devToolsExtension !== 'undefined' ? devToolsExtension() : f => f;

  return new Promise(resolve => {
    if (initialState.app.features.authEnabled) {
      userManager = createUserManager(userManagerConfig);
      const oidcMiddleware = createOidcMiddleware(userManager, null, false, '/callback', null);
      middleware.push(oidcMiddleware);
    }

    /**
     * Store creator based on environment
     */

    const envCreateStore = process.env.NODE_ENV === 'production'
      ? applyMiddleware(...middleware)(createStore)
      : compose(applyMiddleware(...middleware), devTools)(createStore);

    resolve(envCreateStore(getRootReducer(initialState), initialState));
  }).then(store => {
    if (initialState.app.features.authEnabled) {
      // wait to initialize until the user + token is found in localStorage
      return userManager.getUser().then(user => {
        return Promise.all([store, user]);
      });
    } else {
      return Promise.all([store, null]);
    }
  }).catch(error => {
    console.error(error);
  });
};
