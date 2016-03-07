'use strict';
// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { browserHistory, Router, Route } from 'react-router';
// React Redux
import { Provider } from 'react-redux';
// Redux Devtools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import {configLoaded} from './actions';

import configureStore from './store';

// import Dashboard from './containers/Dashboard';
import UserManager from './containers/UserManager';
import TagManager from './containers/TagManager';
import Login from './containers/Login';
// import DataExplorer from './containers/DataExplorer';
import SeeAllGroups from './containers/SeeAllGroups.jsx';
import GroupDetail from './containers/GroupDetail';
import NoMatch from './containers/NoMatch';
import About from './containers/About';
import Feedback from './containers/Feedback';

import ga from 'react-ga';

const store = configureStore();

import messages from './messages'; // Lang does not know where did you get your messages from.

import LangSugar from './lang';
window.L = new LangSugar();

window.L.addTranslations(messages['en'], 'en');
window.L.addTranslations(messages['de'], 'de');
window.L.setLocale('en');

require('../css/reset.css');
require('../css/global.css');

require('../css/react-select.css');

require('../fonts/glyphicons-halflings-regular.woff');

import { Lang } from './lang';
@Lang
class Root extends React.Component {

  constructor(props){
    super(props);
    ga.initialize(window.googleAnalyticsId, { debug: (process && process.env.NODE_ENV !== 'production') });
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
            <Route path="/" component={UserManager} />
            <Route path="login" component={Login} />
            <Route path="about" component={About} />
            <Route path="group-creator" component={UserManager} />
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

fetch('/config.json')
  .then(res => res.json())
  .then(config => {

    for (var key in config) {
      window[key] = config[key];
    }

    if (!window.xeniaHost) throw new Error('xeniaHost is not set in config.json. Coral will not work correctly.');
    if (!window.pillarHost) throw new Error('pillarHost is not set in config.json. Coral will not work correctly.');
    if (!window.basicAuthorization) throw new Error('basicAuthorization is not set in config.json. Coral will not work correctly');
    if (!window.filters) throw new Error('filters is not set in config.json');

    // set state here.
    store.dispatch({type: 'CONFIG_LOADED', config});

    ReactDOM.render(<Root/>, document.getElementById('root'));
  })
  .catch(err => {

    console.error('Error while fetching config.json: ', err);
    document.body.innerHTML = 'you need to create ./config.json, or it is invalid JSON, or something blew up somewhere in react :/';
  });

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
