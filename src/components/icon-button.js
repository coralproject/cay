import React from 'react';
import Radium from 'radium';

import Icon from './icon';

class IconButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} style={[styles, this.props.style]}>
        <Icon name={this.props.name} />
      </button>
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

export default Radium(IconButton);
