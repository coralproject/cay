import React, {PropTypes} from 'react';
import Radium from 'radium';
import color from 'color';
import settings from '../settings';

@Radium
class Button extends React.Component {

  handleClick() {
    if (this.props.disabled) return;

    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }

  render() {

    var attrs = {};
    if (this.props.disabled) {
      attrs['disabled'] = 'disabled';
    }

    return (
      <button
        onClick={this.handleClick.bind(this)}
        type="button"
        {...attrs}
        style={[
          styles.base,
          this.props.size === 'small' && styles.small,
          this.props.size === 'large' && styles.large,
          styles[this.props.category],
          this.props.disabled && styles.disabled,
          this.props.style
        ]}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  size: PropTypes.string,
  category: PropTypes.string
};

const styles = {
  base: {
    transition: 'all 300ms',
    backgroundColor: '#fff',
    borderTopLeftRadius: 4, // I know this could be one property
    borderTopRightRadius: 4, // this is here to supress Radium warnings
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    padding: '0.625rem 1.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#e6e6e6',
      borderColor: '#adadad'
    }
  },
  small: {
    padding: '0.5rem',
    fontSize: '0.75rem'
  },
  large: {
    padding: '1.25rem 1.875rem',
    fontSize: '1.125rem'
  },
  disabled: {
    backgroundColor: settings.lightGrey,
    color: settings.grey,
    cursor: 'default',
    borderColor: settings.mediumGrey,
    ':hover': {
      backgroundColor: settings.lightGrey,
      borderColor: settings.mediumGrey
    }
  },
  'default': {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#333',
    ':hover': {
      backgroundColor: '#e6e6e6',
      borderColor: '#adadad'
    }
  },
  inverse: {
    backgroundColor: '#333',
    borderColor: '#000',
    color: 'white',
    ':hover': {
      backgroundColor: '#111',
      borderColor: '#444'
    }
  },
  primary: {
    backgroundColor: settings.primaryColor,
    borderColor: color(settings.primaryColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.primaryColor).darken(0.1).hexString(),
      borderColor: color(settings.primaryColor).darken(0.2).hexString()
    }
  },
  brand: {
    backgroundColor: settings.brandColor,
    borderColor: color(settings.brandColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.brandColor).darken(0.1).hexString(),
      borderColor: color(settings.brandColor).darken(0.2).hexString()
    }
  },
  success: {
    backgroundColor: settings.successColor,
    borderColor: color(settings.successColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.successColor).darken(0.2).hexString(),
      borderColor: color(settings.successColor).darken(0.3).hexString()
    }
  },
  info: {
    backgroundColor: settings.infoColor,
    borderColor: color(settings.infoColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.infoColor).darken(0.1).hexString(),
      borderColor: color(settings.infoColor).darken(0.2).hexString()
    }
  },
  warning: {
    backgroundColor: settings.warningColor,
    borderColor: color(settings.warningColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.warningColor).darken(0.2).hexString(),
      borderColor: color(settings.warningColor).darken(0.3).hexString()
    }
  },
  danger: {
    backgroundColor: settings.dangerColor,
    borderColor: color(settings.dangerColor).darken(0.1).hexString(),
    color: '#fff',
    ':hover': {
      backgroundColor: color(settings.dangerColor).darken(0.1).hexString(),
      borderColor: color(settings.dangerColor).darken(0.2).hexString()
    }
  },
  link: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#337ab7',
    ':hover': {
      color: '#23527c',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      textDecoration: 'underline'
    }
  }
};

export default Button;
