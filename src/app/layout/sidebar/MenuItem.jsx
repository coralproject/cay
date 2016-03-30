import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import color from 'color';

@Radium
class MenuItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <Link style={styles.link} to={this.props.target} activeStyle={styles.base[':hover']}>
          <span style={ styles.icon }>{this.props.icon}</span>
          <span>{this.props.name}</span>
        </Link>
      </li>
    );
  }
}

const styles = {
  base: {
    lineHeight: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: color('#F77160').darken(0.1).hexString()
    },
    borderBottom: '1px solid rgba(255,255,255,.5)'
  },
  link: {
    color: 'white',
    padding: '12px 20px 12px 15pkx',
    display: 'block',
    textDecoration: 'none'
  },
  icon: {
    width: '30px',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '14pt'
  }
};

export default MenuItem;
