import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {logout} from '../../../actions';

// import Searchbar from '../../forms/Searchbar';
import MdMenu from 'react-icons/lib/md/menu';
import Button from '../../Button';

@connect()
@Radium
class Header extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleClick() {
    this.props.onHamburgerClick();
  }

  logout() {
    this.props.dispatch(logout());
    const {router} = this.context;
    router.push('/login');
  }

  render() {
    return (
      <nav style={styles.nav}>
        <MdMenu style={styles.sidebarToggle} onClick={this.handleClick.bind(this)} />
        {/*<Searchbar style={styles.searchbar}/>*/}
        <Button
          style={styles.logoutButton}
          size="small"
          category="default"
          onClick={this.logout.bind(this)}>Logout</Button>
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
  logoutButton: {
    float: 'right',
    marginRight: 8,
    marginTop: 8
  },
  searchbar: {
    width: '40%'
  }
};

export default Header;
