import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

import { button as buttonSettings } from '../../settings'

const buildCustomStyle = (customColor) => ({
  backgroundColor: customColor,
  color: '#FFFFFF',
  ':hover': {
    backgroundColor: color(customColor).lighten(0.2).hexString()
  },
  active: {
    backgroundColor: '#FFFFFF',
    color: customColor,
    ':hover': {
      backgroundColor: '#FFFFFF'
    }
  }
})

@Radium
class Button extends Component {
  render() {
    const { type = 'default', className, onClick, disabled, children, icon, style, active = false, customColor, ...rest } = this.props;

    if (type === 'custom' && customColor) {
      styles.custom = buildCustomStyle(customColor)
    }

    const finalStyles = {
      ...styles.base,
      ...styles[type],
      ...style
    };

    return (
    <button
      className={`mdl-button mdl-js-button mdl-button--raised ${className}`}
      onClick={onClick}
      style={[
        finalStyles,
        { ':hover': { backgroundColor: color(finalStyles.backgroundColor).lighten(0.2).hexString() }},
        active ? styles[type].active : {}
      ]}
      disabled={disabled ? 'disabled' : ''}
      { ...rest }
    >
      { icon ? <i className="material-icons" style={styles.icon} > {icon} </i> : null }
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
};

export const CoralButton = Radium(Button);