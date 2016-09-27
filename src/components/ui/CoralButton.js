import React, { PropTypes } from 'react';

import { Button } from 'react-mdl';

const styles = {
  base: {
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
  },
  type: {
    success: {
      backgroundColor: '#00796B'
    },
    primary: {
      color: 'white',
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
      color: 'white',
      backgroundColor: '#262626'
    },
    blue: {
      color: 'white',
      backgroundColor: '#0e62eb'
    },
    coral: {
      color: 'white',
      backgroundColor: 'rgb(246, 125, 111)',
      default: {
        color: 'rgb(246, 125, 111)',
        backgroundColor: 'rgba(158,158,158,.2)',
        boxShadow: 'none'
      }
    }
  },
  default: {
    color: '#262626',
    backgroundColor: 'rgba(158,158,158,.2)',
    boxShadow: 'none'
  },
  icon: {
    marginRight: 5,
    fontSize: '16px'
  },
};

export const CoralButton = ({ type = "primary", onClick, disabled, children, icon, style, active = false, ...rest}) => (
  <Button
    raised
    ripple
    colored={type === 'success'}
    onClick={onClick}
    style={{
      ...styles.base,
      ...styles.type[type],
      ...(!active ? styles.type[type].default : {}),
      ...style
      }}
    disabled={disabled ? 'disabled' : ''}
    { ...rest }
  >
    { icon ? <i className="material-icons" style={styles.icon} > {icon} </i> : null }
    { children }
  </Button>
);