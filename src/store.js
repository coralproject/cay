/*global devToolsExtension */

/**
 * Module dependencies
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createOidcMiddleware from 'redux-oidc';
import createDebounce from 'redux-debounce';
import rootReducer from 'app/MainReducer';
import userManager from 'services/userManager';

/**
 * Store middlewares
 */
// https://github.com/maxmantz/redux-oidc/wiki/3.-API
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

/**
 * Expose final store creator
 */

export default initialState => envCreateStore(rootReducer, initialState);
