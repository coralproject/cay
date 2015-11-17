import React from 'react';
import Radium from 'radium';

import Button from './button';
import Checkbox from './checkbox';


import settings from '../settings';

import FilterTable from './filter-table';
import UserTable from './user-table';
import UserDetail from './user-detail';

@Radium
export default class Trust extends React.Component {

  handleClick(e) {
    console.log('Trust', e);
  }

  render() {
    return (
      <div style={styles.base}>
        <FilterTable
          style={styles.filterTable}
          onClick={this.handleClick.bind(this)}
          filters={['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']} />
        <UserTable
          style={styles.userTable}
          users={[{name: 'Thorin'}, {name: 'Fili'}, {name: 'Kili'}, {name: 'Balin'}, {name: 'Dwalin'}, {name: 'Oin'}, {name: 'Gloin'}, {name: 'Dori'}, {name: 'Nori'}, {name: 'Ori'}, {name: 'Bifur'}, {name: 'Bofur'}, {name: 'Bombur'}]} />
        <UserDetail
          style={styles.userDetail} />
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
  filterTable: {
    flex: 1,
  },
  userTable: {
    flex: 1,
  },
  userDetail: {
    flex: 2,
  }
};
