import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import MenuItem from './MenuItem';

@Radium
class Menu extends React.Component {
  render() {
    return (
      <div>
        <Link to="/" style={styles.logo}>Coral Project</Link>
        <ul>
          <MenuItem name="Dashboard" target="/" icon="fa-area-chart" />
          <MenuItem name="Explore" target="/explore" icon="fa-bar-chart" />
          <MenuItem name="User Manager" target="/user-manager" icon="fa-users" />
          <MenuItem name="Settings" target="/settings" icon="fa-cog" />
        </ul>
      </div>
    );
  }
}

var styles = {
  logo: {
    backgroundImage: 'url(/img/logo_white.png)',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 10px',
    color: 'white',
    fontSize: '1em',
    padding: '12px 20px 12px 35px',
    textDecoration: 'none',
    display: 'block'
  }
};

export default Menu;
