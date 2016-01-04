import _ from 'lodash';
import React from 'react';
import Radium from 'radium';

import ModuleItem from './menu-item';

@Radium
class Menu extends React.Component {
  render() {
    return (
      <ul>
        <ModuleItem name="Dashboard" target="#" icon="fa-area-chart" />
        <ModuleItem name="User Manager" target="#user-manager" icon="fa-users" />
        <ModuleItem name="Settings" target="#settings" icon="fa-cog" />
      </ul>
    );
  }
}

const styles = {

};

export default Menu;