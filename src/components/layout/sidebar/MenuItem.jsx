import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import color from 'color';

@Radium
class MenuItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <Link style={styles.link} to={this.props.target}>
          {this.props.icon}
          <span>{this.props.name}</span>
          <i></i>
        </Link>
      </li>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: color('#F77160').darken(0.1).hexString()
    }
  },
  link: {
    color: 'white',
    padding: '12px 20px 12px 15pkx',
    display: 'block',
    textDecoration: 'none'
  }
};

export default MenuItem;
