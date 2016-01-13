import React, {PropTypes} from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';

import settings from '../settings';
import ListItem from './lists/ListItem';
import Avatar from './Avatar';

import {fetchCommentsByUser} from "../actions";

@connect()
@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onUserClick: PropTypes.func.isRequired
  }

  handleClick() {
    this.props.dispatch(fetchCommentsByUser(this.props.user))
  }

  render() {
    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)} >

          {this.props.user.user_id}

          <p style={styles.sub}>
            Rating | Test Score | Comments
          </p>

      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  }
};
