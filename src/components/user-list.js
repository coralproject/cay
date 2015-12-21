import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import UserRow from './user-row';
import Heading from './heading';

@Radium
export default class UserList extends React.Component {
  static propTypes = {
    onUserClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      user_id: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render() {
    return (
      <List style={[styles.base, this.props.style]}>
        <Heading size="small" style={styles.heading}>User List</Heading>
        {this.props.users.map((user, i) => <UserRow {...this.props} user={user} style={styles.row} key={i} /> )}
      </List>
    );
  }
}

var styles = {
  base: {

  },
  heading: {
    paddingLeft: 10
  },
  row: {

  }
};
