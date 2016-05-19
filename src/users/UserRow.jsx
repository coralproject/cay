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

    const {user} = this.props;

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
        >
        <div style={styles.flex}>
          <img style={styles.avatar} src="/img/user_portrait_placeholder.png" />
          <div>
            {user.name}
            <p style={styles.sub}>
              Comments: {dimension.count}<br />
              Replies received: {repliedPercent}<br />
              Replies written: {replyPercent}
            </p>
          </div>
        </div>
      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer',
    overflow: 'hidden',
    // height: 100
  },
  flex: {
    display: "flex",
  },
  disabled: {
    cursor: 'auto'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  },
  avatar: {
    height: 50,
    marginRight: 10

  }
};
