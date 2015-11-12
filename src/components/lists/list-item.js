import _ from '../../lib/lodash.min';
import React from 'react';
import Radium from 'radium';

@Radium
export default class ListItem extends React.Component {
  render() {

    console.log(this.props.leftAvatar);

    let left;
    let right;
    if (this.props.leftAvatar) {
      left = React.cloneElement(this.props.leftAvatar, {style: _.extend({}, styles.avatars, styles.leftAvatar)});
    }
    if (this.props.rightAvatar) {
      right = React.cloneElement(this.props.rightAvatar, {style: _.extend({}, styles.avatars, styles.rightAvatar)});
    }

    return (
      <div style={[
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
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16
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
