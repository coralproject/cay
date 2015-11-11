import _ from '../../lib/lodash.min';
import React from 'react';
import Radium from 'radium';

@Radium
export default class ListItem extends React.Component {
  render() {

    console.log(this.mergeStyles);

    const {
      children,
      leftAvatar,
      rightAvatar,
      ...other
    } = this.props;

    console.log(this.props.leftAvatar);
    return (
      <div style={styles.base}>{leftAvatar || null} {children} {rightAvatar || null}</div>
    );
  }
}

const styles = {
  base: {
    padding: 16
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
