import _ from 'lodash';
import React from 'react';
import Radium from 'radium';

import ModuleItem from './module-item';

@Radium
class SidebarMenu extends React.Component {
  render() {
    return (
      <ul>
        <ModuleItem name="Dashboard" icon="fa-area-chart" />
        <ModuleItem name="User Manager" icon="fa-users" />
        <ModuleItem name="Settings" icon="fa-cog" />
      </ul>
    );
  }
}

var styles = {

};

export default SidebarMenu;
