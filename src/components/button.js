import React from 'react';
import Radium from 'radium';

@Radium
class Button extends React.Component {
  render() {
    return (
      <button style={[
          styles.base,
          this.props.size === 'small' && styles.small,
          this.props.size === 'large' && styles.large
      ]}>
        {this.props.children}
      </button>
    );
  }
}

var styles = {
  base: {
    background: 'blue',
    border: 0,
    borderRadius: 4,
    color: 'white',
    padding: '0.625rem 1.25rem',
    fontSize: '1rem'
  },
  small: {
    padding: '0.5rem',
    fontSize: '0.75rem'
  },
  large: {
    padding: '1.25rem 1.875rem',
    fontSize: '1.125rem'
  }
};

export default Button;
