
import React, { Component } from 'react';
import Radium from 'radium';
import settings from 'settings';
import Menu from 'app/layout/sidebar/Menu';


@Radium
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onSetSidebarOpen(open) {
    this.setState({ open });
  }

  componentWillMount() {
    const mql = this.mql = window.matchMedia('(min-width: 800px)');
    this._mqlChanged = this.mediaQueryChanged.bind(this);
    mql.addListener(this._mqlChanged);
    this.setState({ open: mql.matches });
  }

  componentWillUnmount() {
    this.mql.removeListener(this._mqlChanged);
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
        <div style={styles.sidebar(open)}>
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
