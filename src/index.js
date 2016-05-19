'use strict';
// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { browserHistory, Router, Route, Redirect } from 'react-router';
// React Redux
import { Provider } from 'react-redux';
// Redux Devtools

import configureStore from 'store.js';
import { configXenia } from 'app/AppActions';
import {StyleRoot} from 'radium';

// Routes
import SearchCreator from 'app/SearchCreator';
import TagManager from 'app/TagManager';
import Login from 'app/Login';
import SeeAllSearches from 'app/SeeAllSearches';
import SearchDetail from 'app/SearchDetail';
import NoMatch from 'app/NoMatch';
import About from 'app/About';

// Utils
import registerServiceWorker from 'serviceworker!./sw.js';
import ga from 'react-ga';
import { Lang } from 'i18n/lang';

// Configuration
import config from '../public/config.json';
import dataConfig from '../public/data_config.json';

import messages from 'i18n/messages'; // Lang does not know where did you get your messages from.

import LangSugar from 'i18n/lang';
window.L = new LangSugar();

window.L.addTranslations(messages['en'], 'en');
window.L.addTranslations(messages['de'], 'de');
window.L.addTranslations(messages['es'], 'es');
window.L.setLocale(window.L.locale);

require('reset.css');
require('global.css');

require('react-select.css');
require('react-datepicker.min.css');

require('../fonts/glyphicons-halflings-regular.woff');

if ('serviceWorker' in navigator && process && process.env.NODE_ENV === 'production') {
  registerServiceWorker({ scope: '/' }).then(() => {}, () => {});
}

@Lang
class Root extends React.Component {

  constructor(props){
    super(props);
    ga.initialize(window.googleAnalyticsId, { debug: (process && process.env.NODE_ENV !== 'production') });
    window.addEventListener('error', e => ga.exception({
      description: e.error.stack
    }), false);
  }

  logPageView() {
    ga.pageview(this.state.location.pathname);
  }

  render() {

    return (
      <StyleRoot>
        <Provider store={store}>
          <Router history={browserHistory} onUpdate={ this.logPageView }>
            <Redirect from="/" to="search-creator" />
            <Route path="login" component={Login} />
            <Route path="about" component={About} />
            <Route path="search-creator" component={SearchCreator} />
            <Route path="tag-manager" component={TagManager} />
            <Route path="saved-searches" component={SeeAllSearches}/>
            <Route path="saved-search/:id" component={SearchDetail} />
            <Route path="*" component={NoMatch} />
            {/*<Route path="explore" component={DataExplorer} />*/}
          </Router>
        </Provider>
      </StyleRoot>
    );
  }
}

// entry point for the app

const requiredKeys = [ 'xeniaHost', 'pillarHost', 'basicAuthorization', 'environment', 'googleAnalyticsId', 'requireLogin' ];
const allKeysDefined = requiredKeys.every(key => 'undefined' !== typeof config[key]);

if (!allKeysDefined) {
  const message = `missing required keys on config.json. Must define ${requiredKeys.join('|')}`;
  throw new Error(message);
}

// load config into initialState so it's ALWAYS available
const store = configureStore({app: config});

store.dispatch(configXenia());
store.dispatch({type: 'DATA_CONFIG_LOADED', config: dataConfig});

ReactDOM.render(<Root/>, document.getElementById('root'));

// prevent browser from navigating backwards if you hit the backspace key
document.addEventListener('keydown', function (e) {
  var doPrevent = false;
  if (e.keyCode === 8) {
    var d = e.srcElement || e.target;
    if ((d.tagName.toUpperCase() === 'INPUT' &&
      (
        d.type.toUpperCase() === 'TEXT' ||
        d.type.toUpperCase() === 'PASSWORD' ||
        d.type.toUpperCase() === 'FILE' ||
        d.type.toUpperCase() === 'EMAIL' ||
        d.type.toUpperCase() === 'SEARCH' ||
        d.type.toUpperCase() === 'NUMBER' ||
        d.type.toUpperCase() === 'DATE' )
      ) || d.tagName.toUpperCase() === 'TEXTAREA') {
      doPrevent = d.readOnly || d.disabled;

    } else {
      doPrevent = true;
    }
  }

  if (doPrevent) {
    e.preventDefault();
  }
});
