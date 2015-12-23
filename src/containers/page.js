import React from "react";
import Radium from "radium";

import settings from '../settings';

import Header from '../components/layout/header/header';
import Sidebar from '../components/layout/sidebar/sidebar';
import Dashboard from '../components/dashboard';




@Radium
class Page extends React.Component {

  render() {

    return (
      <div style={styles}>
        <Header />
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}

// same as the @connect decorator above
export default Page;

const styles = {
  background: settings.coralPink
};

