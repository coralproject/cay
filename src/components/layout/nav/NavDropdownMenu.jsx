import React from 'react';
import Radium from 'radium';

import Badge from '../../Badge';
import IconButton from '../../IconButton';

@Radium
class NavDropdownMenu extends React.Component {
  render() {
    return (
      <div style={styles}>
        <IconButton name="fa-inbox" /> <Badge count={Math.random().toString().slice(-2)}/>
      </div>
    );
  }
}

const styles = {
  float: 'right'
}

export default NavDropdownMenu;
