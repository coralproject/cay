import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchPipelinesIfNotFetched, selectPipeline, fetchPipeline} from '../actions';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import PipelineList from '../components/PipelineList';
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

  // every time the state is updated
  componentDidUpdate() {
    // if (!_.some(_.map(this.props.pipelines, _.isString))) {
    //   this.props.pipelines.map(pipe => {

    //   })
    // }

    // if (_.isString(this.props.pipelines[0])) { // stopgap. sorry
    //   this.props.pipelines.map(pipe => {
    //     this.props.dispatch(fetchPipeline(pipe));
    //   });
    // }
  }

  render() {

    return (

      <Page>

        <ContentHeader title={ L.t("User Manager") } />

        <div style={styles.base}>
          <UserFormulaContainer/>

          <UserList
            style={styles.userTable}
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
    minHeight: '250px',
  },
  pipelineList: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userTable: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userDetail: {
    flex: 2,
    marginRight: 5
  }
};
