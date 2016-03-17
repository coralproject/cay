import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchQueryset} from 'groups/GroupActions';
import _ from 'lodash';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import UserDetail from 'users/UserDetail';

@connect(state => state.groups)
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

  render() {
    return (
      <Page>
        <ContentHeader title={this.props.params.name} />
        <p>{this.getGroupDescription(this.props.params.name)}</p>
        <div style={styles.base}>
          <UserList
            style={styles.userList}
            users={this.props.users} />

          <UserDetail
            tags={this.props.tags}
            {...this.props.selectedUser}
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
