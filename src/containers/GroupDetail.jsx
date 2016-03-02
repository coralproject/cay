import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchPipeline} from '../actions';
import _ from 'lodash';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

@connect(state => state.pipelines)
@Radium
export default class GroupDetail extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPipeline(this.props.params.name));
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
    flex: 1,
    padding: 0,
    margin: 0
  },
  userDetail: {
    flex: 2
  }
};
