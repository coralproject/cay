
/**
 * Module dependencies
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createDebounce from 'redux-debounce';
import rootReducer from 'app/MainReducer';

/**
 * Store middlewares
 */

const debouncer = createDebounce({ userMangerFilters: 500 });
const middleware = [thunk, debouncer];
const devTools = devToolsExtension ? devToolsExtension() : f => f;

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
