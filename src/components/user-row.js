import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';
import ListItem from './lists/list-item';
import Avatar from './avatar';

@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onUserClick: PropTypes.func.isRequired
  }

  handleClick(e) {
    this.props.onUserClick(this.props.user)
  }

  render() {
    console.log('UserRow', this.props.user.user_id);
    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)}
      >
        {this.props.user.user_id}
        <p style={styles.sub}>Rating | Test Score | Comments</p>
      </ListItem>
    );
  }
}

var styles = {
  base: {
    cursor: 'pointer'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  }
};
