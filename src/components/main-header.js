import React from "react";
import Radium from "radium";

import HeaderNavbar from './header-navbar';

@Radium
class MainHeader extends React.Component {
  render() {
    return (
      <header style={styles.base}>
        <a href="/" style={styles.logo}>Coral Project</a>
        <HeaderNavbar />
      </header>
    );
  }
}

var styles = {
  base: {
    background: '#F77160',
    position: 'relative',
    maxHeight: '100px',
    zIndex: 1030
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
    height: '50px',
    display: 'block',
    'float': 'left',
    textAlign: 'center',
    lineHeight: '50px',
    width: '230px',
    padding: '0 15px',
    fontWeight: 300,
    overflow: 'hidden',
    fontSize: '20px'
  }

};

export default MainHeader;
