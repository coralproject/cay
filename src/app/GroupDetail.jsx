import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {userSelected} from 'users/UsersActions';
import {fetchQueryset, fetchSearches} from 'groups/GroupActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';
import _ from 'lodash';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import UserDetail from 'users/UserDetail';

const mapStateToProps = state => {
  return {
    groups: state.groups,
    users: state.users,
    comments: state.comments
  };
};

// @connect(state => state.groups)
@connect(mapStateToProps)
@Radium
export default class GroupDetail extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchQueryset(this.props.params.id, 0, true));
  }

  componentWillUpdate() {
    // console.log('GroupDetail will update');
  }

  updateUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
  }

  onPagination(page = 0) {
    this.props.dispatch(fetchQueryset(this.props.params.name, page));
  }

  render() {

    const search = _.find(this.props.groups.searches, {id: this.props.params.id});

    return (
      <Page>
        <ContentHeader title={search.name} />
        <p style={styles.description}>Description: {search.description}</p>
        <div style={styles.base}>
          <UserList
            onPagination={this.onPagination.bind(this)}
            userSelected={this.updateUser.bind(this)}
            loadingQueryset={this.props.groups.loadingQueryset}
            style={styles.userList}
            users={this.props.groups.users} />

          <UserDetail
            commentsLoading={this.props.comments.loading}
            user={this.props.users.selectedUser}
            comments={this.props.comments.items}
            style={styles.userDetail} />
        </div>
      </Page>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  userList: {
    minWidth: 315
  },
  userDetail: {
    flex: 2
  },
  description: {
    fontSize: 18
  }
};
