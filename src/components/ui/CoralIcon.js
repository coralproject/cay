import React, { PropTypes } from 'react';

import { IconButton } from 'react-mdl';

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

 * For more reference: https://github.com/google/material-design-lite/tree/mdl-1.x/src
 */

export const CoralIcon = ({ icon, style, className, onClick, disabled, ...rest}) => (
  <i
    className={`material-icons md-dark md-18 ${disabled ? '.md-inactive' : ''} ${className ? className : ''} `}
    style={style}
  >
    {icon}
  </i>
);

CoralIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
