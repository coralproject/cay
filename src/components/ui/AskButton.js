import React, { PropTypes } from 'react';

import { Button } from 'react-mdl';
import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';

const style = {
  success: {
    backgroundColor: '#358D66'
  },
  cancel: {
    backgroundColor: 'white',
    marginRight: 10
  }
}

export const AskButton = ({ type, onClick, disabled, children }) => (
  <Button
    raised
    ripple
    colored={type === 'success'}
    onClick={onClick}
    style={style[type]}
    disabled={disabled ? 'disabled' : ''}
  >
    { type === 'success' ? <MdDone style={{ marginRight: 5 }}/> : null }
    { type === 'cancel' ? <MdClear style={{ marginRight: 5 }}/> : null }
    { children }
  </Button>
);