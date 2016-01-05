/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React from 'react';
import Radium from 'radium';
import Sidebar from 'react-sidebar';

import Header from '../components/layout/header/header';
import Menu from '../components/layout/sidebar/menu';

@Radium
class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: false,
      shadow: false
    };
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  componentWillMount() {
    var mql = window.matchMedia('(min-width: 800px)');
    mql.addEventListener(this.mediaQueryChanged.bind(this));
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  toggleSidebar() {
    this.setState({
      sidebarDocked: !this.state.sidebarDocked
    });
  }

  render() {

    var sidebarContent = <Menu />;

    return (
      <Sidebar
        sidebar={sidebarContent}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen.bind(this)}>
        <Header onHamburgerClick={this.toggleSidebar.bind(this)}/>
        <div style={styles.wrapper}>
          {this.props.children}
        </div>
      </Sidebar>
    );
  }
}

// same as the @connect decorator above
export default Page;

const styles = {
  wrapper:  {
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  }
};
