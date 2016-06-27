import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createDebounce from 'redux-debounce';

import rootReducer from 'app/MainReducer';

const debounceConfig = {
  userMangerFilters: 500
};

const debouncer = createDebounce(debounceConfig);

const middleware = [thunk, debouncer];

let finalCreateStore;

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
}

const configureStore = function (initialState) {
  return finalCreateStore(rootReducer, initialState);
};

export default configureStore;
