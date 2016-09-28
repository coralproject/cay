import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

const buildCustomStyle = (customColor) => ({
  backgroundColor: customColor,
  color: 'white',
  ':hover': {
    backgroundColor: color(customColor).lighten(0.2).hexString()
  },
  active: {
    backgroundColor: 'white',
    color: customColor,
    ':hover': {
      backgroundColor: color(customColor).lighten(0.2).hexString()
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
      data-upgraded=",MaterialButton"
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
    color: 'white',
    fontSize: '0.9em',
    textTransform: 'none',
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: '#d8d8d8'
    },
    ':focus': {
      boxShadow: 'none',
      boxShadow: boxShadowDefault
    }
  },
  success: {
    backgroundColor: '#00796B'
  },
  primary: {
    backgroundColor: '#0e62eb'
  },
  white: {
    color: '#262626',
    backgroundColor: 'white'
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
  violet: {
    color: '#864F9E',
    backgroundColor: 'white',
    active: {
      color: 'white',
      backgroundColor: '#864F9E',
      ':hover': {
        backgroundColor: color('#864F9E').lighten(0.2).hexString()
      }
    }
  },
  blue: {
    color: 'white',
    backgroundColor: '#0e62eb'
  },
  coral: {
    color: 'white',
    backgroundColor: '#F36451',
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
  },
  icon: {
    marginRight: 5,
    fontSize: '16px'
  },
};

export const CoralButton = Radium(Button);