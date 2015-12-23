import React from "react";
import Radium from "radium";

import settings from '../settings';

import Header from '../components/layout/header/header';
import Sidebar from '../components/layout/sidebar/sidebar';

@Radium
class Page extends React.Component {

  render() {

    return (
      <div style={styles.base}>
        <Header />
        <Sidebar />
        <div style={styles.wrapper}>        
          {this.props.children}
        </div>
      </div>
    );
  }
}

// same as the @connect decorator above
export default Page;

const styles = {
  base: {
    background: settings.coralPink,
  },
  wrapper:  {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  },
};

