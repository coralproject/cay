import React from 'react';
import Radium from 'radium';

/*
this component holds the notification dropdowns,
user account menu, and settings dropdown
 */

import NavDropdownMenu from './nav-dropdown-menu';

class NavbarMenu extends React.Component {
  render() {
    return <div>
      {/* inbox dropdown */}
      <NavDropdownMenu />
      {/* notification dropdown */}
      <NavDropdownMenu />
      {/* user account menu */}
      <NavDropdownMenu />
      {/* settings */}
      <NavDropdownMenu />
    </div>;
  }
}

export default NavbarMenu;
