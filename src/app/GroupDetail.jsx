import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {userSelected} from 'users/UsersActions';
import {fetchQueryset} from 'groups/GroupActions';
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
    this.props.dispatch(fetchQueryset(this.props.params.name));
  }

  getGroupDescription(name) {
    if (this.props.groups.length) {
      return _.find(this.props.groups, {name}).desc;
    } else {
      return '';
    }
  }

  componentWillUpdate() {
    console.log('GroupDetail will update');
  }

  updateUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
  }

  render() {
    console.log('GroupDetail.render', this.props);
    return (
      <Page>
        <ContentHeader title={this.props.params.name} />
        <p>{this.getGroupDescription(this.props.params.name)}</p>
        <div style={styles.base}>
          <UserList
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
    minHeight: 250
  },
  userList: {
    flex: 1
  },
  userDetail: {
    flex: 2
  }
};
