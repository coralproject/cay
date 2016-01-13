import _ from 'lodash';
import React from 'react';
import Radium from 'radium';

import MenuItem from './MenuItem';

@Radium
class Menu extends React.Component {
  render() {
    return (
      <ul>
        <MenuItem name="Dashboard" target="/" icon="fa-area-chart" />
        <MenuItem name="User Manager" target="user-manager" icon="fa-users" />
        <MenuItem name="Settings" target="/settings" icon="fa-cog" />
      </ul>
    );
  }
}

const styles = {

};

export default Menu;
