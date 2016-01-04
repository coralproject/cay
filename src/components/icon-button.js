import React from 'react';
import Radium from 'radium';

import Icon from './icon';

@Radium
class IconButton extends React.Component {
  render() {
    return (
      <button style={[styles, this.props.style]}>
      <Icon name={this.props.name} /></button>
    );
  }
}

const styles = {
  width: '50px',
  height: '50px',
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  color: 'white',
  ':focus': {
    outline: 'none'
  }
};

export default IconButton;