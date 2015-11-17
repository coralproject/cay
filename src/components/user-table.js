import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import UserRow from './user-row';

@Radium
export default class UserTable extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render() {
    return (
      <List style={[this.props.style, styles.base]}>
        {this.props.users.map((user, i) => <UserRow {...user} style={styles.row} key={i} /> )}
      </List>
    );
  }
}

var styles = {
  base: {

  },
  row: {

  }
};
