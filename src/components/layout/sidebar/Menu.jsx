import React from 'react';
import Radium from 'radium';

import MenuItem from './MenuItem';

@Radium
class Menu extends React.Component {
  render() {
    return (
      <div>
        <p style={styles.logo}>The Coral Project</p>
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
    backgroundImage: 'url(/img/coralLogoMark-1.5.white.png)',
    backgroundRepeat: 'none',
    color: 'white',
    fontSize: '1em'
  }
};

export default Menu;
