import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import {fetchUserListIfNotFetched, setFilter, selectUser, fetchUsers} from '../actions';

import Page from './page';
import ContentHeader from '../components/content-header';
import FilterList from '../components/filter-list';
import UserList from '../components/user-list';
import UserDetail from '../components/user-detail';

import settings from '../settings';

@connect(state => {
  return state.userList;
})
@Radium
export default class UserManager extends React.Component {

  // only the first time
  componentWillMount() {
    if (this.props.params.filterId) {
      this.props.dispatch(fetchUserListIfNotFetched(this.props.params.filterId));
    }
  }

  // every time the state is updated
  componentDidUpdate() {

    if (this.props.params.filterId) {
      this.props.dispatch(fetchUserListIfNotFetched(this.props.params.filterId));
    }

  }

  render() {
    const {dispatch} = this.props;

    return (

      <Page>
        <div style={styles.wrapper}>
          <ContentHeader 
            title="User Manager" />

          <div style={styles.base}>
            <FilterList
              active={this.props.params.filter_id}
              style={styles.filterTable}
              onFilterClick={this.props.onFilterClick}
              filters={['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']} />

            <UserList
              style={styles.userTable}
              users={this.props.users} />

            <UserDetail
              {...this.props.selectedUser}
              style={styles.userDetail} />

          </div>
        </div>

      </Page>
    );
  }
}
var styles = {
  base: {
    display: 'flex',
    minHeight: '250px',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15 // why do I have to write these all out?
  },
  wrapper:  {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  },
  filterTable: {
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
