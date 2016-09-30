/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React from 'react';
import Radium from 'radium';
import Sidebar from 'app/layout/Sidebar';
import {Snackbar} from 'react-mdl';

import Header from 'app/layout/header/Header';
import FlashMessages from 'flashmessages/FlashMessages';

import settings from 'settings';

@Radium
export default class Page extends React.Component {

  handleSnackbarTimeout() {

  }

  render() {
    return (
      <Sidebar styles={styles.sidebar}>
        <Header />
        <FlashMessages />
        <div style={[styles.wrapper, this.props.style]}>
          {this.props.children}
        </div>
        <Snackbar
          onTimeout={this.handleSnackbarTimeout}
          active={true}>
          {'Welcome! You have 60 minutes before your session expires and you\'re automatically logged out'}
        </Snackbar>
      </Sidebar>
    );
  }
}

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
