import React, {PropTypes} from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';

import settings from '../settings';

import ListItem from './lists/ListItem';
import CharacterIcon from './CharacterIcon';

@connect(state => state.pipelines)
@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  handleClick() {
    console.log('UserRow.handleClick', this.props.user);
    this.props.onClick(this.props.user);
  }

  render() {
    const colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
    const {user} = this.props;

    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)}
        leftAvatar={<CharacterIcon size="medium" color={colors[Math.floor(Math.random() * colors.length)]}>{user.user_name.charAt(0).toUpperCase()}</CharacterIcon>}
        >
          {user.user_name}
          <p style={styles.sub}>
            Rating | accept ratio {user.stats.accept_ratio} | Comments {user.stats.comments.total}
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
