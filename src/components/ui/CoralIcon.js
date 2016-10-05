import React, { PropTypes } from 'react';

import { IconButton } from 'react-mdl';

const styles = {
  base: {
    color: '#262626',
    fontSize: '10px'
  },
  disabled: {
    color: '#696969'
  }
};

/**
 * Pass as icon the name of the Icon
 * Find them here: https://design.google.com/icons
 * More about MD Guidelines: https://google.github.io/material-design-icons/
 *
 * For Sizing:
 .material-icons.md-18 { font-size: 18px; }
 .material-icons.md-24 { font-size: 24px; }
 .material-icons.md-36 { font-size: 36px; }
 .material-icons.md-48 { font-size: 48px; }
 */

export const CoralIcon = ({ icon, style, className, onClick, disabled, ...rest}) => (
  <i
    className={`
      material-icons md-dark
      ${disabled ? '.md-inactive' : ''}
      ${className ? className : ''}
    `}
    style={[styles.base, style]}
    size=""
  >
    {icon}
  </i>
);

CoralIcon.propTypes = {
  icon: PropTypes.string.isRequired
};
