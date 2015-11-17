import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';
import ListItem from './lists/list-item';
import Avatar from './avatar';

@Radium
export default class UserRow extends React.Component {
  render() {
    return (
      <ListItem
        style={[this.props.style, styles.base]}
        leftAvatar={<Avatar src="/img/avatar04.png" />}
      >
        {this.props.name}
        <p style={styles.sub}>Rating | Test Score | Comments</p>
      </ListItem>
    );
  }
}

var styles = {
  base: {

  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  }
};
