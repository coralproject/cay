/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React from 'react';
import Radium from 'radium';
import Sidebar from 'app/layout/sidebar/Sidebar';

import Header from 'app/layout/header/Header';
import FlashMessages from 'flashmessages/FlashMessages';

import settings from 'settings';

@Radium
class Page extends React.Component {

  render() {
    return (
      <Sidebar styles={styles.sidebar}>
        <Header />
        <FlashMessages />
        <div style={[styles.wrapper, this.props.style]}>
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
    backgroundColor: settings.bgColorBase,
    padding: 20,
    position: 'relative'
  },
  sidebar: {
    sidebar: {
      backgroundColor: '#f0f0f0'
    }
  }
};
