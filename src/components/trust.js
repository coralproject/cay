import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import ContentHeader from './content-header';
import FilterList from './filter-list';
import UserList from './user-list';
import UserDetail from './user-detail';

@Radium
export default class Trust extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired,
    onUserClick: PropTypes.func.isRequired
  }

  render() {

    return (
      <div style={styles.wrapper}>
        <ContentHeader 
          title="Trust Module Header" />

        <div style={styles.base}>
          <FilterList
            active={this.props.params.filter_id}
            style={styles.filterTable}
            onFilterClick={this.props.onFilterClick}
            filters={['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']} />

          <UserList
            style={styles.userTable}
            users={this.props.users}
            onUserClick={this.props.onUserClick} />

          <UserDetail
            {...this.props.selectedUser}
            style={styles.userDetail} />

        </div>
      </div>
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
