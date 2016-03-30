import _ from 'lodash';
import React from 'react';
import Radium from 'radium';

import settings from 'settings';

@Radium
export default class ListItem extends React.Component {

  handleClick(e) {
    if (_.isFunction(this.props.onClick)) {
      this.props.onClick(e);
    }
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
        right && styles.baseWithRight,
        this.props.active && styles.active,
        this.props.style
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
    backgroundColor: settings.lighterGrey,
    borderBottom: '1px solid ' + settings.lighterGrey,
    borderRight: '1px solid #ddd',
    ':hover': {
      backgroundColor: 'white',
      borderRight: '1px solid #fff',
      borderBottom: '1px solid #ddd'
    }
  },
  active: {
    backgroundColor: 'white',
    borderRight: '1px solid #fff',
    borderBottom: '1px solid #ddd'
  },
  baseWithLeft: {
    paddingLeft: 60
  },
  baseWithRight: {
    paddingRight: 60
  },
  avatars: {
    position: 'absolute',
    display: 'block',
    top: 20
  },
  leftAvatar: {
    left: 16
  },
  rightAvatar: {
    right: 16
  }
};
