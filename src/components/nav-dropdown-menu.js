import React from 'react';
import Radium from 'radium';

import Badge from './badge';
import IconButton from './icon-button';

@Radium
class NavDropdownMenu extends React.Component {
  render() {
    return (
      <div style={styles}>
        <IconButton name="fa-inbox" /> <Badge />
      </div>
    );
  }
}

let styles = {
  float: 'right'
}

export default NavDropdownMenu;
