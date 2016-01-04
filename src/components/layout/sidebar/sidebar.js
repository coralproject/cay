import React from "react";
import Radium from "radium";

import Menu from './menu';

@Radium
class Sidebar extends React.Component {
  render() {
    return (
      <aside style={styles}>
        <Menu />
      </aside>
    );
  }
}

const styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  paddingTop: '50px',
  width: '230px',
  background: '#F77160'
};

export default Sidebar;
