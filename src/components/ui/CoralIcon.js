import React, { PropTypes } from 'react';

import { IconButton } from 'react-mdl';

const styles = {
  base: {

  }
};

/**
 * Pass as icon the name of the Icon i.e mood -> :)
 * Find them here: https://design.google.com/icons
 */

export const CoralIcon = ({ onClick, icon, style, ...rest}) => (
  <IconButton
    onClick={onClick}
    name={icon}
    colored
    style={{
      ...styles.base,
      ...style
      }}
    { ...rest }
  />
);