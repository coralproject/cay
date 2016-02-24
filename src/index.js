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

import configureStore from './store';

import Dashboard from './containers/Dashboard';
import UserManager from './containers/UserManager';
import TagManager from './containers/TagManager';
import Login from './containers/Login';
import DataExplorer from './containers/DataExplorer';

const store = configureStore();

require('../css/reset.css');
require('../css/global.css');

require('../css/react-select.css');

require('../fonts/glyphicons-halflings-regular.woff');

class Root extends React.Component {
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
          <Router history={browserHistory}>
            <Route path="/" component={UserManager}/>
            <Route path="login" component={Login}/>
            <Route path="user-manager" component={UserManager}/>
            <Route path="tag-manager" component={TagManager}/>
            <Route path="explore" component={DataExplorer}/>
          </Router>
        </Provider>
        {debug}
      </div>
    );
  }
}

fetch('./config.json')
  .then(res => res.json())
  .then(config => {

    for (var key in config) {
      window[key] = config[key];
    }

    if (!window.xeniaHost) console.warn('xeniaHost is not set in config.json. Coral will not work correctly.');
    if (!window.pillarHost) console.warn('pillarHost is not set in config.json. Coral will not work correctly.');

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
