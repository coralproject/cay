import _ from '../../lib/lodash.min';
import React from 'react';
import Radium from 'radium';

@Radium
export default class ListItem extends React.Component {
  render() {

    console.log(this.props.leftAvatar);

    let left;
    if (this.props.leftAvatar) {
      left = React.cloneElement(this.props.leftAvatar, {style: _.extend({}, styles.avatars, styles.leftAvatar)});
    }

    return (
      <div style={[
        styles.base,
        this.props.leftAvatar && styles.baseWithLeft
      ]}>
        {left}
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    padding: 16
  },
  baseWithLeft: {
    paddingLeft: 70
  },
  avatars: {
    position: 'absolute',
    top: 8
  },
  leftAvatar: {
    left: 16
  },
  rightAvatar: {
    right: 16
  }
};
