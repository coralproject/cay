// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { Router, Route, Link } from 'react-router';
// React Redux
import { Provider, connect } from 'react-redux';
// Redux Devtools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from "./containers/app";
import UserManager from "./containers/user-manager";
import configureStore from "./store";

const store = configureStore();

// require('../css/AdminLTE.min.css');
require('../css/reset.css');
require('../css/global.css');

require('../fonts/glyphicons-halflings-regular.woff');

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Route path="/" component={App}/>
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
