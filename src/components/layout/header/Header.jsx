import React from 'react';
import Radium from 'radium';

// import Searchbar from '../../forms/Searchbar';

import MdMenu from 'react-icons/lib/md/menu';

@Radium
class Header extends React.Component {

  handleClick() {
    this.props.onHamburgerClick();
  }

  render() {
    return (
      <nav style={styles.nav}>
        <MdMenu style={styles.sidebarToggle} onClick={this.handleClick.bind(this)} />
        {/*<Searchbar style={styles.searchbar}/>*/}
      </nav>
    );
  }
}

const styles = {
  sidebarToggle: {
    float: 'left',
    width: 36,
    height: 36,
    fill: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    cursor: 'pointer'
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
