import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import ListItem from './lists/ListItem';
import CharacterIcon from './CharacterIcon';

import settings from '../settings';

@connect(state => state.pipelines)
@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    setAsActive: React.PropTypes.func,
    activeIndex: React.PropTypes.number
  }
  static defaultProps = {
    active: true
  }

  handleClick() {
    this.props.onClick(this.props.user);
    this.props.setAsActive(this.props.activeIndex);
  }

  render() {
    const {user} = this.props;
    const leftAvatar = (
      <CharacterIcon size="medium" color={settings.primaryColor}>
        { user.name.charAt(0).toUpperCase() }
      </CharacterIcon>
    );

    const repliedPercent = Math.floor(user.statistics.comments.all.all.replied_ratio * 100) + '%';
    const replyPercent = Math.floor(user.statistics.comments.all.all.reply_ratio * 100) + '%';

    return (
      <ListItem
        active={this.props.active}
        style={[styles.base, this.props.style]}
        onClick={this.handleClick.bind(this)}
        leftAvatar={leftAvatar}>
        {user.name}
        <p style={styles.sub}>
          Comments: {user.statistics.comments.all.all.count} | Replies received: {repliedPercent} | Replies written: {replyPercent}
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
