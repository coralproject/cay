import React, { PropTypes } from 'react';

import { Button } from 'react-mdl';
import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';
import MdVisibility from 'react-icons/lib/md/visibility';

const styles = {
  base: {
    fontSize: '0.9em',
    textTransform: 'none'
  },
  success: {
    backgroundColor: '#00796B'
  },
  preview: {
    backgroundColor: '#0e62eb'
  },
  cancel: {
    backgroundColor: 'white',
    marginRight: 10
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
  }
};

export const AskButton = ({ type, onClick, disabled, children, icon, style }) => (
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
  >
    { type === 'success' || icon === 'done' ? <MdDone style={{ marginRight: 5 }}/> : null }
    { type === 'cancel' || icon === 'clear' ? <MdClear style={{ marginRight: 5 }}/> : null }
    { type === 'preview' || icon === 'visibility' ? <MdVisibility style={{ marginRight: 5 }}/> : null }
    { children }
  </Button>
);