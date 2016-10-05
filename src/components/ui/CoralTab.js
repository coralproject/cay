import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

@Radium
export default class CoralTab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.function
  };

  render() {
    return (
      <button
        className={`
          ${className ? className : ''}
          `}
        onClick={onClick}
        { ...rest }
      >
        { children }
      </button>
    )
  }
}

const boxShadowDefault = '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)';

let styles = {
  base: {
    color: '#ffffff',
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: '#d8d8d8'
    },
    ':focus': {
      boxShadow: 'none',
      boxShadow: boxShadowDefault
    },
    ...buttonSettings.base
  },
  success: {
    backgroundColor: '#00796B',
    ...buttonSettings.success
  },
  primary: {
    backgroundColor: '#0e62eb',
    ...buttonSettings.primary
  },
  white: {
    color: '#262626',
    backgroundColor: 'white',
    ...buttonSettings.white
  },
  green: {
    backgroundColor: '#00796B',
    ...buttonSettings.green
  },
  grey: {
    backgroundColor: '#d8d8d8',
    ...buttonSettings.grey
  },
  black: {
    color: 'white',
    backgroundColor: '#262626',
    ...buttonSettings.black
  },
  violet: {
    color: '#864F9E',
    backgroundColor: 'white',
    active: {
      color: 'white',
      backgroundColor: '#864F9E',
      ':hover': {
        backgroundColor: color('#864F9E').lighten(0.2).hexString()
      }
    },
    ...buttonSettings.violet
  },
  blue: {
    color: 'white',
    backgroundColor: '#0e62eb',
    ...buttonSettings.blue
  },
  coral: {
    color: 'white',
    backgroundColor: '#F36451',
    ...buttonSettings.coral
  },
  custom: {
    color: '#262626',
    backgroundColor: 'rgba(158,158,158,.2)',
    boxShadow: 'none',
    ':hover': {
      backgroundColor: '#d8d8d8'
    },
    active: {
      color: 'white',
      backgroundColor: '#F36451',
      boxShadow: boxShadowDefault,
      ':hover': {
        backgroundColor: color('#F36451').lighten(0.2).hexString()
      }
    },
  },
  default: {
    color: '#262626',
    backgroundColor: 'rgba(158,158,158,.2)',
    boxShadow: 'none',
    ':hover': {
      backgroundColor: '#d8d8d8'
    },
    active: {
      color: 'white',
      backgroundColor: '#F36451',
      boxShadow: boxShadowDefault,
      ':hover': {
        backgroundColor: color('#F36451').lighten(0.2).hexString()
      }
    },
    ...buttonSettings.default
  },
  icon: {
    marginRight: 5,
    fontSize: '16px'
  },
  loading: {
    marginLeft: 5
  }
};