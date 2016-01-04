// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { browserHistory, Router, Route, Link } from 'react-router';
// React Redux
import { Provider, connect } from 'react-redux';
// Redux Devtools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from "./store";
import Settings from './containers/settings';

import Dashboard from './containers/dashboard';
import UserManager from './containers/user-manager';
import Login from './containers/login';

const store = configureStore();

// require('../css/AdminLTE.min.css');
require('../css/reset.css');
require('../css/global.css');

require('../fonts/glyphicons-halflings-regular.woff');

class Root extends React.Component {
  render() {
    console.log(browserHistory)
    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Dashboard}/>
            <Route path="/settings" component={Settings}/>
            <Route path="login" component={Login}/>
            <Route path="user-manager/:filterId/:userId" component={UserManager}/>
            <Route path="user-manager/:filterId" component={UserManager}/>
            <Route path="user-manager" component={UserManager}/>
          </Router>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
