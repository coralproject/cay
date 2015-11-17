import _ from '../../lib/lodash.min';
import React from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class ListItem extends React.Component {

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {

    let left;
    let right;
    if (this.props.leftAvatar) {
      left = React.cloneElement(this.props.leftAvatar, {style: _.extend({}, styles.avatars, styles.leftAvatar)});
    }
    if (this.props.rightAvatar) {
      right = React.cloneElement(this.props.rightAvatar, {style: _.extend({}, styles.avatars, styles.rightAvatar)});
    }

    return (
      <div onClick={this.handleClick.bind(this)} style={[
        styles.base,
        left && styles.baseWithLeft,
        right && styles.baseWithRight
      ]}>
        {left}
        {this.props.children}
        {right}
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 16,
    ':hover': {
      backgroundColor: settings.lighterGray
    }
  },
  baseWithLeft: {
    paddingLeft: 70
  },
  baseWithRight: {
    paddingRight: 70
  },
  avatars: {
    position: 'absolute',
    display: 'block',
    top: 8
  },
  leftAvatar: {
    left: 16
  },
  rightAvatar: {
    right: 16
  }
};
