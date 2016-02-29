import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchPipelinesIfNotFetched} from '../actions';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

import UserFormulaContainer from '../components/UserFormulaContainer';

@connect(state => state.pipelines)
@Radium
export default class UserManager extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // only the first time
  componentWillMount() {
    // redirect user to /login if they're not logged in
    if (!this.props.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    this.props.dispatch(fetchPipelinesIfNotFetched());
  }

  render() {

    return (

      <Page>

        <ContentHeader title={ window.L.t('User Manager') } />

        <div style={styles.base}>
          <UserFormulaContainer/>

          <UserList
            style={styles.userList}
            users={this.props.users} />

          <UserDetail
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
  pipelineList: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userList: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userDetail: {
    flex: 2,
    marginRight: 5
  }
};
