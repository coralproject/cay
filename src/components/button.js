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
    padding: '1.5em'
  },
  small: {

  },
  large: {

  }
};

export default Button;
