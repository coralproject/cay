
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { bgColorBase } from 'settings';
import Menu from 'app/layout/Sidebar/Menu';

/**
 * Module scope variables
 */

let initState = null;

/**
 * Sidebar component
 */

@connect(({ app }) => ({ features: app.features }))
@Radium
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: initState
    };
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
    const { children, features } = this.props;

    return (
      <div style={[styles.wrapper, this.props.styles]}>
        <div style={[styles.sidebar(open), this.props.styles.sidebar]}>
          <Menu features={features} open={open} onToggleSidebar={this.toggleSidebar.bind(this)} />
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
