/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React from 'react';
import Radium from 'radium';
import Sidebar from 'react-sidebar';

import Header from 'app/layout/header/Header';
import Menu from 'app/layout/sidebar/Menu';

import { bgColorBase } from 'settings';

export default Radium(({ children, style }) => (
  <Sidebar
    sidebar={<Menu />}
    open={true}
    shadow={false}
    docked={true}
    transitions={false}
    styles={sidebarStyles}>
    <Header />
    <div style={[styles.wrapper, style]}>
      {children}
    </div>
  </Sidebar>
));

const styles = {
  wrapper:  {
    backgroundColor: bgColorBase,
    padding: 20,
    position: 'relative'
  }
};

const sidebarStyles = {
  sidebar: {
    backgroundColor: 'rgb(248,160,149)'
  }
};
