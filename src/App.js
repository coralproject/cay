
/**
 * Module dependencies
 */

import React from 'react';
import { browserHistory, Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import {StyleRoot} from 'radium';
import {UserAuthWrapper} from 'redux-auth-wrapper';

// Routes
import SearchCreator from 'app/SearchCreator';
import Login from 'app/Login';
import SeeAllSearches from 'app/SeeAllSearches';
import SearchDetail from 'app/SearchDetail';
import FormList from 'app/FormList';
import FormEdit from 'app/FormEdit';
import FormCreate from 'app/FormCreate';
import SearchEditor from 'app/SearchEditor';
import NoMatch from 'app/NoMatch';
import About from 'app/About';
import SubmissionList from 'app/SubmissionList';
import GalleryManager from 'app/GalleryManager';
import LoadingAuth from 'app/LoadingAuth';
import CallbackPage from 'app/CallbackPage';


/**
 * Expose App base component. Handle all routes
 */

const buildRoutes = (store, onLogPageView, defaultRoute, features, userManager) => {

  const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.oidc.user,
    authenticatingSelector: state => state.oidc.isLoadingUser,
    LoadingComponent: LoadingAuth,
    redirectAction: () => { userManager.signinRedirect(); },
    wrapperDisplayName: 'UserIsAuthenticated'
    // /login is the default, but putting it here for notes to future self
  });
  const getComponent = component => features.authEnabled ? UserIsAuthenticated(component) : component;

  const router = (
    <Router history={browserHistory} onUpdate={onLogPageView}>
      <Redirect from="/" to={defaultRoute} />
      <Route path="login" component={Login} />
      <Route path="about" component={About} />
      <Route path="/callback" component={CallbackPage} />
      {features.trust !== false ?
        <div>
          <Route path="search-creator" component={SearchCreator} />
          <Route path="saved-searches" component={SeeAllSearches}/>
          <Route path="saved-search/:id" component={SearchDetail} />
          <Route path="edit-search/:id" component={SearchEditor} />
        </div>
      : null}
      {features.ask ?
        <div>
          <Route path="forms" component={getComponent(FormList)} />
          <Route path="forms/create" component={getComponent(FormCreate)}/>
          <Route path="forms/:id" component={getComponent(FormEdit)}/>
          <Route path="forms/:id/submissions" component={getComponent(SubmissionList)}/>
          <Route path="forms/:id/gallery" component={getComponent(GalleryManager)}/>
        </div>
      : null}
      <Route path="*" component={NoMatch} />
    </Router>
  );

  if (features.authEnabled) {
    return <OidcProvider store={store} userManager={userManager}>{router}</OidcProvider>;
  } else {
    return router;
  }

};

export default ({ store, onLogPageView, defaultRoute, features, userManager }) => (
  <StyleRoot>
    <Provider store={store}>
      {buildRoutes(store, onLogPageView, defaultRoute, features, userManager)}
    </Provider>
  </StyleRoot>
);
