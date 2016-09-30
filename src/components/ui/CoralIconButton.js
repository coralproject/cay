import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';

/**
 * Pass as icon the name of the Icon
 * Find them here: https://design.google.com/icons
 */

  // TODO(bc): Add support for sizes and icon sizes

@Radium
export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    style: PropTypes.object,
    disabled: PropTypes.bool
  };

  render() {
    const { onClick, icon, style, disabled, size, ...rest } = this.props;
    return (
      <button
        className="CoralIconButton"
        onClick={onClick}
        disabled={disabled ? 'disabled' : ''}
        style={[styles.base]}
        { ...rest }
      >
        <i
          className="material-icons"
          style={[styles.icon.base]}
        >
          {icon}
        </i>
      </button>
    )
  }
}

const styles = {
  background: 'white',
  base: {
    color: '#262626',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    border: 0,
    padding: '6px',
    borderRadius: '4em',
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      backgroundColor: '#d8d8d8'
    },
    ':focus': {
      backgroundColor: '#d8d8d8'
    },
    ':active': {
      backgroundColor: 'white',
    }
  },
  icon: {
    base: {
      fontSize: 18
    }
  }
};
