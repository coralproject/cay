/*

Page is not a smart component, but it holds all the other layout elements
and all the other smart components (containers)

*/
import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Snackbar} from 'react-mdl';
import Sidebar from 'app/layout/sidebar';

import Header from 'app/layout/header/Header';
import FlashMessages from 'flashmessages/FlashMessages';

import settings from 'settings';

@Radium
export default class Page extends React.Component {

  static propTypes = {
    authTimeout: PropTypes.instanceOf(Date), // could be Date or null
    displayAuthSnackbar: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {isSnackbarActive: true};

    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this);
  }

  handleSnackbarTimeout() {
    this.setState({ isSnackbarActive: false });
  }

  formatTimeUntilLogout(expiry) {
    const now = new Date();
    const oneHour = 36E5;
    const oneMinute = 6E4;

    if ((expiry - now) / oneMinute < 60) {
      return `${Math.floor((expiry - now) / oneMinute)} minutes`;
    } else if ((expiry - now) / oneHour < 40) {
      return `${Math.floor((expiry - now) / oneHour)} hours`;
    }
  }

  render() {
    console.log('Page', this.props);
    return (
      <Sidebar styles={styles.sidebar}>
        <Header />
        <FlashMessages />
        <div style={[styles.wrapper, this.props.style]}>
          {this.props.children}
        </div>
        {
          this.props.authTimeout && this.props.displayAuthSnackbar
          ? <Snackbar
            timeout={4500}
            onTimeout={this.handleSnackbarTimeout}
            active={this.state.isSnackbarActive}>
            {`Welcome! You have ${this.formatTimeUntilLogout(this.props.authTimeout)} before your session expires and you're automatically logged out`}
          </Snackbar>
          : null
        }

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
