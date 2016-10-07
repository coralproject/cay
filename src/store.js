/*global devToolsExtension */

/**
 * Module dependencies
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createOidcMiddleware, {createUserManager} from 'redux-oidc';
import createDebounce from 'redux-debounce';
import rootReducer from 'app/MainReducer';

export let userManagerConfig = {
  client_id: null, // populated after config is loaded
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  response_type: 'id_token token',
  scope: 'openid',
  authority: null, // also populated after config is loaded
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.host}/login`,
  loadUserInfo: false,
  monitorSession: false
};

export let userManager = null; // created below

/**
 * Expose final store creator
 */

export default initialState => {

  userManagerConfig.client_id = initialState.app.authClientId;
  userManagerConfig.authority = initialState.app.authAuthority;

  console.log('setting shit up', initialState);

  console.log('userManagerConfig', userManagerConfig);

  /**
   * Store middlewares
   */
  // https://github.com/maxmantz/redux-oidc/wiki/3.-API
  userManager = createUserManager(userManagerConfig);
  const oidcMiddleware = createOidcMiddleware(userManager, () => true, true, '/callback');
  const debouncer = createDebounce({ userMangerFilters: 500 });
  const middleware = [thunk, debouncer, oidcMiddleware];
  const devTools = typeof devToolsExtension !== 'undefined' ? devToolsExtension() : f => f;

  /**
   * Store creator based on environment
   */

  const envCreateStore = process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)(createStore)
    : compose(applyMiddleware(...middleware), devTools)(createStore);


  return envCreateStore(rootReducer, initialState);
};
