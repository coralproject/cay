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
 */

export const CoralIcon = ({ onClick, icon, style, disabled, ...rest}) => (
  <i
    className="material-icons"
    style={[styles.base, style]}
  >
    {icon}
  </i>
);

CoralIcon.propTypes = {
  icon: PropTypes.string.isRequired
};
