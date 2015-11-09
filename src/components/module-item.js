import React from 'react';
import Radium from 'radium';

import color from 'color';

import Icon from './icon';

@Radium
class ModuleItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <a style={styles.link} href="#">
          <Icon size="small" name={this.props.icon} />
          <span>{this.props.name}</span>
          <i></i>
        </a>
      </li>
    );
  }
}

var styles = {
  base: {
    backgroundColor: '#F77160',
    ':hover': {
      backgroundColor: color('#F77160').darken(0.1).hexString()
    }
  },
  link: {
    color: 'white',
    padding: '12px 5px 12px 15px',
    display: 'block',
    textDecoration: 'none'
  }
};

export default ModuleItem;
