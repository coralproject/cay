
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import {userExpired} from 'redux-oidc';
import {userManager} from 'store';

import { bgColorBase } from 'settings';
import Menu from 'app/layout/sidebar/Menu';

/**
 * Module scope variables
 */

let initState = null;

/**
 * Sidebar component
 */

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  /**
   * delete the user_id auth token and signout
   */
  handleLogout: () => {
    // according to the docs, I should be able to dispatch the {userExpired}
    // action from redux-oidc here which sets the user to null
    // as of 10.25.2016 that action does not work as documented, so I'm doing this
    userManager.removeUser().then(() => {
      userManager.signinRedirect();
    });
  }
});

@connect(({ app }) => ({ features: app.features }), mapDispatchToProps)
@Radium
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: initState };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ open });
  }

  componentWillMount() {
    const mql = this.mql = matchMedia('(min-width: 800px)');
    this._mqlChanged = this.mediaQueryChanged.bind(this);
    mql.addListener(this._mqlChanged);

    if (initState == null) {
      initState = mql.matches;
      this.setState({ open: initState });
    }
  }

  componentWillUnmount() {
    this.mql.removeListener(this._mqlChanged);
    initState = this.state.open;
  }

  mediaQueryChanged() {
    this.setState({ open: this.mql.matches });
  }

  toggleSidebar() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.state;
    const { children, features, handleLogout } = this.props;

    return (
      <div style={[styles.wrapper, this.props.styles]}>
        <div style={[styles.sidebar(open), this.props.styles.sidebar]}>
          <Menu
            handleLogout={handleLogout}
            features={features}
            open={open}
            onToggleSidebar={this.toggleSidebar} />
        </div>
        <div style={styles.main}>{children}</div>
      </div>
    );
  }
}

/**
 * Module styles
 */

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  main: {
    flex: 1,
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: bgColorBase
  },
  sidebar(open) {
    return {
      height: '100vh',
      transition: 'width .5s',
      width: open ? 200 : 60,
      marginLeft: -5
    };
  }
};
