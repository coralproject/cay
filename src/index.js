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

require('../css/reset.css');
require('../css/global.css');

require('../fonts/glyphicons-halflings-regular.woff');

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Dashboard}/>
            <Route path="login" component={Login}/>
            <Route path="user-manager/:filterId/:userId" component={UserManager}/>
            <Route path="user-manager/:filterId" component={UserManager}/>
            <Route path="user-manager" component={UserManager}/>
            <Route path="explore" component={DataExplorer}/>
          </Router>
          <DebugPanel top right bottom>
            <DevTools store={store} visibleOnLoad={false} monitor={LogMonitor} />
          </DebugPanel>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
