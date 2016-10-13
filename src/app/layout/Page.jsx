/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React from 'react';
import Radium from 'radium';
import {Snackbar} from 'react-mdl';
import Sidebar from 'app/layout/sidebar';

import Header from 'app/layout/header/Header';
import FlashMessages from 'flashmessages/FlashMessages';

import settings from 'settings';

@Radium
export default class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isSnackbarActive: true};

    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this);
  }

  handleSnackbarTimeout() {
    this.setState({ isSnackbarActive: false });
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
          timeout={4500}
          onTimeout={this.handleSnackbarTimeout}
          active={this.state.isSnackbarActive}>
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
