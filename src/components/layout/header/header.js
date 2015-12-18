import React from 'react';
import Radium from 'radium';

import Searchbar from './searchbar';
import NavbarMenu from '../nav/navbar-menu';
import IconButton from '../../icon-button';

@Radium
class Header extends React.Component {
  render() {
    return (
      <nav style={styles.nav}>
        <IconButton style={styles.sidebarToggle} name="fa-navicon" />
        <Searchbar style={styles.searchbar}/>
        <NavbarMenu />
      </nav>
    );
  }
}

var styles = {
  sidebarToggle: {
    float: 'left'
  },
  nav: {
    marginBottom: 0,
    marginLeft: '230px',
    border: 'none',
    minHeight: '50px',
    borderRadius: 0
  },
  searchbar: {
    width: '40%'
  }
};

export default Header;