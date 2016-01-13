import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/List';
import UserRow from './UserRow';
import Heading from './Heading';

@Radium
export default class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      user_id: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render() {
    return (
      <List style={[styles.base, this.props.style]}>
        <Heading size="small" style={styles.heading}>
          User List
        </Heading>
        {
          this.props.users.map((user, i) => {
            return (
              <UserRow {...this.props}
                user={user}
                style={styles.row}
                key={i} />
            )
          })
        }
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
