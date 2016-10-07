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
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const { onClick, icon, style, className, disabled, ...rest } = this.props;
    return (
      <button
        className={classname || ''}
        onClick={onClick}
        disabled={disabled ? 'disabled' : ''}
        style={[styles.base]}
        { ...rest }
      >
        <i
          className={`material-icons md-dark md-18 ${disabled ? 'md-inactive' : ''} `}
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
      backgroundColor: 'white'
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
