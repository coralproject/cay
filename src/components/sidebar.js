import React from "react";
import Radium from "radium";

import SidebarMenu from './sidebar-menu';

@Radium
class Sidebar extends React.Component {
  render() {
    return (
      <aside style={styles}>
        <p>SidebarMenu heading</p>
        <SidebarMenu />
      </aside>
    );
  }
}

var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  paddingTop: '50px',
  width: '230px',
  background: 'rgba(0, 255, 0, .6)',
  height: '100%'
};

export default Sidebar;
