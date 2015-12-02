import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import ContentHeader from './content-header';
import FilterTable from './filter-table';
import UserTable from './user-table';
import UserDetail from './user-detail';

@Radium
export default class Trust extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired,
    onUserClick: PropTypes.func.isRequired
  }

  render() {

    console.log('Trust', this.props);

    return (
      <div style={styles.wrapper}>
        <ContentHeader title="Trust Module Header" />
        <div style={styles.base}>
          <FilterTable
            style={styles.filterTable}
            onFilterClick={this.props.onFilterClick}
            filters={['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']} />
          <UserTable
            style={styles.userTable}
            users={this.props.userData.items}
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
