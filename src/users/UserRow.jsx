import React, {PropTypes} from 'react';
import Radium from 'radium';
import ListItem from 'components/lists/ListItem';
import CharacterIcon from 'components/CharacterIcon';

@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    setAsActive: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    disabled: React.PropTypes.bool
  }
  static defaultProps = {
    active: true,
    breakdown: 'all',
    specificBreakdown: 'all'
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.setAsActive(this.props.activeIndex);
      this.props.onClick(this.props.user);
    }
  }

  render() {
    let {active, disabled, breakdown, specificBreakdown} = this.props;
    specificBreakdown = specificBreakdown || 'all';
    if (specificBreakdown === 'all') breakdown = 'all';
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5', '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a'];

    const {user} = this.props;
    const leftAvatar = (
      <CharacterIcon size="medium" color={colors[0]}>
        { user.name.charAt(0).toUpperCase() }
      </CharacterIcon>
    );

    let dimension = user.statistics.comments[breakdown][specificBreakdown];

    // Dont break the counts while loading
    if (dimension && specificBreakdown !== 'all') {
      dimension = dimension.all;
    } else {
      dimension = user.statistics.comments.all.all;
    }

    const repliedPercent = Math.floor(dimension.replied_ratio * 100) + '%';
    const replyPercent = Math.floor(dimension.reply_ratio * 100) + '%';

    return (
      <ListItem
        active={active}
        style={[styles.base, disabled && styles.disabled, this.props.style]}
        onClick={this.handleClick.bind(this)}
        leftAvatar={leftAvatar}>
        {user.name}
        <img style={styles.avatar} src="/img/user_portrait_placeholder.png" />
        <p style={styles.sub}>
          Comments: {dimension.count}<br />
          Replies received: {repliedPercent}<br />
          Replies written: {replyPercent}
        </p>
      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer',
    overflow: 'hidden',
    height: 100
  },
  disabled: {
    cursor: 'auto'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  },
  avatar: {
    float: 'right',
    height: '100%'
  }
};
