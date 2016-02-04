import React, {PropTypes} from 'react';
import Radium from 'radium';

import List from './lists/List';
import UserRow from './UserRow';
import Heading from './Heading';

@Radium
export default class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      user_name: PropTypes.string.isRequired,
      _id: PropTypes.string.idRequired
    }).isRequired).isRequired
  }

  getUser(user) {
    console.log('getUser', user);
  }

  getUserList(users) {

    console.log('getUserList', users);

    return users.map((user, i) => {
      return (
        <UserRow {...this.props}
          user={user}
          onClick={this.getUser.bind(this)}
          style={styles.row}
          key={i} />
      );
    });
  }

  render() {
    return (
      <List style={[styles.base, this.props.style]}>
        <Heading size="small" style={styles.heading}>
          User List
        </Heading>
        {this.props.users.length ? this.getUserList(this.props.users) : 'Loading...'}
      </List>
    );
  }
}

const styles = {
  base: {

  },
  heading: {
    paddingLeft: 10
  },
  row: {

  }
};
