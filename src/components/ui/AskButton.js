import React, { PropTypes } from 'react';

import Radium from 'radium';
import color from 'color';

import { Button } from 'react-mdl';
import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';


const styles = {
  base: {
    backgroundColor: '#00796B',
    fontSize: '0.9em',
    borderRadius: 2,
    textTransform: 'none'
  },
  success: {
    backgroundColor: 'red',
    ':hover': {
      backgroundColor: '#00796B'
    }
  },
  cancel: {
    backgroundColor: 'white',
    marginRight: 10,
    ':hover': {
      background: color('#0074d9').lighten(0.2).hexString()
    }
  }
};

const AskButton = ({ type, onClick, disabled, children }) => (
  <Button
    raised
    ripple
    colored={type === 'success'}
    onClick={onClick}
    style={[
           styles.base,
           styles[type]
        ]}
    disabled={disabled ? 'disabled' : ''}
  >
    { type === 'success' ? <MdDone style={{ marginRight: 5 }}/> : null }
    { type === 'cancel' ? <MdClear style={{ marginRight: 5 }}/> : null }
    { children }
  </Button>
);

export default Radium(AskButton)