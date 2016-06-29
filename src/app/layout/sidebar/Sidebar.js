
import React, { Component } from 'react';
import Radium from 'radium';
import settings from 'settings';
import Menu from 'app/layout/sidebar/Menu';

let initState = null;

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
    const mql = this.mql = window.matchMedia('(min-width: 800px)');
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
    return (
      <div style={[styles.wrapper, this.props.styles]}>
        <div style={[styles.sidebar(open), this.props.styles.sidebar]}>
          <Menu onToggleSidebar={this.toggleSidebar.bind(this)} open={open} />
        </div>
        <div style={styles.main}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

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
    backgroundColor: settings.bgColorBase
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
