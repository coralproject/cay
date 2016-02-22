import React from 'react';
import Radium from 'radium';

import Searchbar from '../../forms/Searchbar';
import IconButton from '../../IconButton';

@Radium
class Header extends React.Component {

  render() {
    return (
      <nav style={styles.nav}>
        <IconButton onClick={this.props.onHamburgerClick} style={styles.sidebarToggle} name="fa-navicon" />
        {/*<Searchbar style={styles.searchbar}/>*/}
      </nav>
    );
  }
}

const styles = {
  sidebarToggle: {
    float: 'left'
  },
  nav: {
    marginBottom: 0,
    border: 'none',
    minHeight: '50px',
    borderRadius: 0
  },
  searchbar: {
    width: '40%'
  }
};

export default Header;
