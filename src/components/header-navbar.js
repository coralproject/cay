import React from 'react';
import Radium from 'radium';

import Searchbar from './searchbar';
import NavbarMenu from './navbar-menu';

@Radium
class HeaderNavbar extends React.Component {
  render() {
    return (
      <nav style={styles.nav}>
        <a style={styles.sidebarToggle} href="#"></a>
        <Searchbar />
        <NavbarMenu />
      </nav>
    );
  }
}

var styles = {
  sidebarToggle: {
    cursor: 'pointer',
    float: 'left',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    padding: '15px',
    textDecoration: 'none',
    color: 'white',
    font: 'normal normal normal 14px/1 FontAwesome',
    ':hover': {
      backgroundColor: 'green'
    }
  },
  nav: {
    marginBottom: 0,
    marginLeft: '230px',
    border: 'none',
    minHeight: '50px',
    borderRadius: 0
  }
};

export default HeaderNavbar;
