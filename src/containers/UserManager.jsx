import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import _ from 'lodash';

import {fetchPipelinesIfNotFetched, selectPipeline, fetchPipeline} from '../actions';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import PipelineList from '../components/PipelineList';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

import settings from '../settings';

@connect(state => {
  return state.pipelines;
})
@Radium
export default class UserManager extends React.Component {

  // only the first time
  componentWillMount() {
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

        <ContentHeader title="User Manager" />

        <div style={styles.base}>
          <PipelineList
            active={this.props.params.filter_id}
            style={styles.pipelineList}
            pipelines={this.props.pipelines} />

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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15 // why do I have to write these all out?
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
    marginLeft: 5,
    marginRight: 5
  }
};
