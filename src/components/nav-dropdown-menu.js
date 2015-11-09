import React from 'react';
import Radium from 'radium';

import Badge from './badge';

@Radium
class NavDropdownMenu extends React.Component {
  render() {
    return (
      <div style={styles}>NavDropdownMenu <Badge /></div>
    );
  }
}

let styles = {
  float: 'right'
}

export default NavDropdownMenu;
