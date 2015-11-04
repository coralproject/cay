import React from "react";
import Radium from "radium";

import ModuleItem from './module-item';

@Radium
class SidebarMenu extends React.Component {
  render() {
    return (
      <ul>
        <ModuleItem />
        <ModuleItem />
        <ModuleItem />
      </ul>
    );
  }
}

var styles = {

};

export default SidebarMenu;
