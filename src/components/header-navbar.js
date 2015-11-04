import React from 'react';
import Radium from 'radium';

@Radium
class HeaderNavbar extends React.Component {
  render() {
    return (
      <div style={styles}>Navbar</div>
    );
  }
}

var styles = {
  marginBottom: 0,
  marginLeft: '230px',
  border: 'none',
  minHeight: '50px',
  borderRadius: 0
};

export default HeaderNavbar;
