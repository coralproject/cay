import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import settings from 'settings';

import color from 'color';

var RadiumLink = Radium(Link);

@Radium
class MenuItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <RadiumLink style={styles.link} to={this.props.target} activeStyle={styles.base[':hover']}>
          <span style={ styles.icon }>{this.props.icon}</span>
        </RadiumLink>
      </li>
    );
  }
}

const styles = {
  base: {
    transition: 'all .4s',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'white',
      color: settings.brandColor
    }
  },
  link: {
    padding: 20,
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: color(settings.brandColor).lighten(0.3).hexString(),
      color: settings.brandColor
    }
  },

  icon: {
    textAlign: 'center',
    display: 'inline-block',
    fontSize: 24
  }
};

export default MenuItem;
