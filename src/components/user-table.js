import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import UserRow from './user-row';
import Header from './header';

@Radium
export default class UserTable extends React.Component {
  static propTypes = {
    onUserClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render() {
    return (
      <List style={[styles.base, this.props.style]}>
        <Header size="small" style={styles.header}>User List</Header>
        {this.props.users.map((user, i) => <UserRow {...this.props} user={user} style={styles.row} key={i} /> )}
      </List>
    );
  }
}

var styles = {
  base: {

  },
  header: {
    paddingLeft: 10
  },
  row: {

  }
};
