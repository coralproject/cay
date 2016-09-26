import React, { PropTypes } from 'react';

import Radium from 'radium';
import color from 'color';

import { Button } from 'react-mdl';
import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';


const styles = {
  success: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: '#00796B'
  },
  cancel: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
    marginRight: 10
  },
  white: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
  },
  green: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: '#00796B'
  },
  grey: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: '#d8d8d8'
  },
  black: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: '#262626'
  }
};

const AskButton = ({ type, onClick, disabled, children }) => (
  <Button
    raised
    ripple
    colored={type === 'success'}
    onClick={onClick}
    style={ styles[type] }
    disabled={disabled ? 'disabled' : ''}
  >
    { type === 'success' ? <MdDone style={{ marginRight: 5 }}/> : null }
    { type === 'cancel' ? <MdClear style={{ marginRight: 5 }}/> : null }
    { children }
  </Button>
);

export default Radium(AskButton)