import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';
import Spinner from 'components/Spinner';

import { button as buttonSettings } from '../../settings'

const buildCustomStyle = (customColor) => ({
  backgroundColor: '#FFFFFF',
  color: customColor,
  ':hover': {
    backgroundColor: color(customColor).lighten(0.4).hexString()
  },
  active: {
    backgroundColor: customColor,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: color(customColor).lighten(0.2).hexString()
    },
  }
})

/**
 * Button
 *
 * Material Design Reference: https://github.com/google/material-design-lite/tree/mdl-1.x/src/button
 */

@Radium
export default class CoralButton extends Component {
  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    active: PropTypes.bool,
    style: PropTypes.object,
    customColor: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
  };

  render() {
    const {
      type = 'default',
      icon,
      style,
      onClick,
      children,
      className,
      customColor,
      active = false,
      loading = false,
      raised = true,
      ripple,
      ...rest
      } = this.props;

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
      className={`
          mdl-button
          mdl-js-button
          ${raised ? 'mdl-button--raised' : ''}
          ${ripple ? 'mdl-js-ripple-effect' : ''}
          ${className ? className : ''}
          `}
      onClick={onClick}
      style={[
        finalStyles,
        { ':hover': { backgroundColor: color(finalStyles.backgroundColor).lighten(0.2).hexString() }},
        active ? styles[type].active : {}
      ]}
      { ...rest }
    >
      { icon ? <i className="material-icons" style={styles.icon} > {icon} </i> : null }
      { children }
      { loading ? <Spinner style={styles.loading} /> : null }
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
