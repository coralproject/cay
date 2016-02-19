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
import Login from './containers/Login';
import DataExplorer from './containers/DataExplorer';

const store = configureStore();

import messages from './messages'; // Lang does not know where did you get your messages from.

import LangSugar from './lang';
window.L = new LangSugar();

L.addTranslations(messages["en-US"], "en-US");
L.addTranslations(messages["de-DE"], "de-DE");
L.setLocale("en-US");

require('../css/reset.css');
require('../css/global.css');

require('../fonts/glyphicons-halflings-regular.woff');

import { Lang } from './lang';
@Lang
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
    document.body.innerHTML = 'you need to create ./config.json, or it is invalid JSON';
  });
