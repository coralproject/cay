import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {logout} from 'auth/AuthActions';
// import {Link} from 'react-router';

import MdMenu from 'react-icons/lib/md/menu';
import Button from 'components/Button';
// import LanguageSwitcher from 'app/layout/LanguageSwitcher';
import settings from 'settings';

// var RadiumLink = Radium(Link);


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
          {/*<RadiumLink
            style={[
              styles.link,
              this.context.router.isActive("/search-creator") && styles.activeLink
            ]}
            to={"/search-creator"}>
            <span>Search</span>
          </RadiumLink>
          <RadiumLink
            style={[
              styles.link,
              this.context.router.isActive("/saved-searches") && styles.activeLink
            ]}
            to={"/saved-searches"}>
            <span>Saved Searches</span>
          </RadiumLink>*/}

        {/*<Searchbar style={styles.searchbar}/>*/}
        <Button
          style={[
            styles.logoutButton,
            !window.requireLogin && styles.logoutDisabled
          ]}
          size="small"
          category="default"
          onClick={this.logout.bind(this)}>Logout</Button>
      </nav>
    );
  }
}

const styles = {
  sidebarToggle: {
    width: 40,
    height: 40,
    fill: settings.darkGrey,
    position: 'relative',
    top: 5,
    paddingLeft: 10,
    paddingTop: 10,
    cursor: 'pointer'
  },
  logoutDisabled: {
    display: 'none'
  },
  link: {
    marginLeft: 30,
    textDecoration: 'none',
    color: 'rgb(130,130,130)',
    position: 'relative',
    top: 12,
    fontSize: 18,
  },
  activeLink: {
    color: 'white',
    backgroundColor: settings.darkGrey,
    padding: '4px 20px',
    borderRadius: 100,

  },
  nav: {
    marginBottom: 0,
    border: 'none',
    minHeight: '60px',
    borderRadius: 0,
    backgroundColor: settings.mediumGrey
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
