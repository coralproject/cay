import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class CoralDialog extends Component {
  static propTypes = {
  };

  render() {
    const { ...rest } = this.props;

    return (
      <dialog
        style={[styles.base]}
        {...otherProps}
      >
        {children}
      </dialog>
    )
  }
}

const styles = {
  base: {
    backgroundColor: '#ffffff',
    boxShadow: 'rgb(155, 155, 155) 0px 1px 3px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '2px solid rgb(216, 216, 216)'
  }
}
