import React, { PropTypes } from 'react';

const styles = {
  base: {
    color: '#262626',
    background: 'white',
    border: 'none',
    borderRadius: '4px'
  },
  disabled: {
    color: '#696969'
  },
  icon: {
    base: {
      fontSize: 18
    }
  }
};

/**
 * Pass as icon the name of the Icon
 * Find them here: https://design.google.com/icons
 */

export const CoralIconButton = ({ onClick, icon, style, disabled, size, ...rest}) => (
  <button
    onClick={onClick}
    disabled={disabled ? 'disabled' : ''}
    style={{
      ...styles.base,
      ...styles[`${ disabled ? 'disabled' : 'base' }`],
      ...style
      }}
    { ...rest }
  >
    <i
      className="material-icons"
      style={styles.icon[`${ size ? size : 'base' }`]}
    >
      {icon}
    </i>
  </button>
);