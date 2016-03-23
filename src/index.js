'use strict';
// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { browserHistory, Router, Route, Redirect } from 'react-router';
// React Redux
import { Provider } from 'react-redux';
// Redux Devtools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from 'store.js';

import { fetchFilterConfig } from 'filters/FiltersActions';
import { fetchConfig } from 'app/AppActions';
// import Dashboard from './containers/Dashboard';
import GroupCreator from 'app/GroupCreator';
import TagManager from 'app/TagManager';
import Login from 'app/Login';
// import DataExplorer from 'app/DataExplorer';
import SeeAllGroups from 'app/SeeAllGroups';
import GroupDetail from 'app/GroupDetail';
import NoMatch from 'app/NoMatch';
import About from 'app/About';

import ga from 'react-ga';

const store = configureStore();

import messages from 'i18n/messages'; // Lang does not know where did you get your messages from.

import LangSugar from 'i18n/lang';
window.L = new LangSugar();

window.L.addTranslations(messages['en'], 'en');
window.L.addTranslations(messages['de'], 'de');
window.L.addTranslations(messages['es'], 'es');
window.L.setLocale('en');

require('reset.css');
require('global.css');

require('react-select.css');

require('../fonts/glyphicons-halflings-regular.woff');

import { Lang } from 'i18n/lang';
@Lang
class Root extends React.Component {

  constructor(props){
    super(props);
    ga.initialize(window.googleAnalyticsId, { debug: (process && process.env.NODE_ENV !== 'production') });
    window.addEventListener('error', e => ga.event({
      category: 'JS Error',
      action: e.message,
      label: e.stack
    }));
  }

  logPageView() {
    ga.pageview(this.state.location.pathname);
  }

  render() {

    if (process && process.env.NODE_ENV !== 'production') {
      var debug = (
        <DebugPanel top right bottom>
          <DevTools store={store} visibleOnLoad={false} monitor={LogMonitor} />
        </DebugPanel>
      );
    }

    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory} onUpdate={ this.logPageView }>
            <Redirect from="/" to="group-creator" />
            <Route path="login" component={Login} />
            <Route path="about" component={About} />
            <Route path="group-creator" component={GroupCreator} />
            <Route path="tag-manager" component={TagManager} />
            <Route path="groups" component={SeeAllGroups}/>
            <Route path="group/:name" component={GroupDetail} />
            <Route path="*" component={NoMatch} />
            {/*<Route path="explore" component={DataExplorer} />*/}
          </Router>
        </Provider>
        {debug}
      </div>
    );
  }
}

store.dispatch(fetchConfig());
store.dispatch(fetchFilterConfig());

// yikes. if we can think of a more redux-y way to do this, I'm all ears.
const configInterval = setInterval(() => {
  const state = store.getState();
  if (state.app.configLoaded && state.filters.configLoaded) {
    window.clearInterval(configInterval);
    ReactDOM.render(<Root/>, document.getElementById('root'));
  }
}, 1000);

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
