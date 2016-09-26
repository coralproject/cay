import React, { PropTypes } from 'react';

import { Button } from 'react-mdl';
import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';
import MdVisibility from 'react-icons/lib/md/visibility';

const styles = {
  base: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
  },
  success: {
    backgroundColor: '#00796B'
  },
  primary: {
    backgroundColor: '#0e62eb'
  },
  white: {
    backgroundColor: 'white',
  },
  green: {
    backgroundColor: '#00796B'
  },
  grey: {
    backgroundColor: '#d8d8d8'
  },
  black: {
    backgroundColor: '#262626'
  },
  blue: {
    backgroundColor: '#0e62eb'
  },
  icon: {
    marginRight: 5,
    fontSize: '16px'
  }
};

export const CoralButton = ({ type, onClick, disabled, children, icon, style, ...rest }) => (
  <Button
    raised
    ripple
    colored={type === 'success'}
    onClick={onClick}
    style={{
      ...styles.base,
      ...styles[type],
      ...style
      }}
    disabled={disabled ? 'disabled' : ''}
    { ...rest }
  >
    { icon ? <i className="material-icons" style={styles.icon} > {icon} </i> : null }
    { children }
  </Button>
);