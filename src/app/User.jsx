/**
 * Module dependencies
 */
 import settings from 'settings';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link } from 'react-router';

import Page from 'app/layout/Page';
import UserDetail from 'users/UserDetail';
import ContentHeader from 'components/ContentHeader';

/**
 * Search creator page
 * Contains the UI for creating user searches
 */
@connect(state => ({
  searches: state.searches,
  comments: state.comments,
  users: state.users,
  filters: state.filters,
  app: state.app
}))
@Radium
export default class SearchCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // only the first time
  componentWillMount() {
    const { dispatch } = this.props;

    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
    if (this.props.app.requireLogin && !this.props.searches.authorized) {
      return this.context.router.push('/login');
    }

  }

  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('User Details') } />
        <UserDetail
          breakdown={this.props.filters.breakdown}
          specificBreakdown={this.props.filters.specificBreakdown}
          commentsLoading={this.props.comments.loading}
          user={this.props.users.selectedUser}
          comments={this.props.comments.items}
          style={styles.userDetail} />
      </Page>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    width: '100%'
  },

};
