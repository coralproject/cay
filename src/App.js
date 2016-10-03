
/**
 * Module dependencies
 */

import React from 'react';
import { browserHistory, Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import {StyleRoot} from 'radium';

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

import SignUp from 'app/SignUp';
import SignIn from 'app/SignIn';
import ForgotPassword from 'app/ForgotPassword';
import ResetPassword from 'app/ResetPassword';
import Permissions from 'app/Permissions';

/**
 * Expose App base component. Handle all routes
 */

export default ({ store, onLogPageView, defaultRoute, features }) => (
  <StyleRoot>
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={onLogPageView}>
        <Redirect from="/" to={defaultRoute} />
        <Route path="login" component={Login} />
        <Route path="sign-up" component={SignUp} />
        <Route path="sign-in" component={SignIn} />
        <Route path="forgot-password" component={ForgotPassword} />
        <Route path="reset-password" component={ResetPassword} />
        <Route path="permissions" component={Permissions} />
        <Route path="about" component={About} />
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
            <Route path="forms" component={FormList}/>
            <Route path="forms/create" component={FormCreate}/>
            <Route path="forms/:id" component={FormEdit}/>
            <Route path="forms/:id/submissions" component={SubmissionList}/>
            <Route path="forms/:id/gallery" component={GalleryManager}/>
          </div>
        : null}
        <Route path="*" component={NoMatch} />
      </Router>
    </Provider>
  </StyleRoot>
);
