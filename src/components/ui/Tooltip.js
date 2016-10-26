import React, { PropTypes } from 'react';

export const Tooltip = ({ text, for }) => (
  <span
    className={`mdl-tooltip`}
    for={for}
  >
    {text}
  </span>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  for: PropTypes.isRequired,
};
