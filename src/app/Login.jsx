
/**
 * Module dependencies
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import Button from 'components/Button';

import { brandColor } from 'settings';
import color from 'color';

import userManager from 'services/userManager';

/**
 * Expose login component
 */

@connect(({ app }) => ({ app }))
@Radium
export default class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  loginUser() {
    // this.props.dispatch(login(this.state.email, this.state.password));
    userManager.signinRedirect();
  }

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.loginModal}>
          <img style={styles.logo} src="/img/logomark_512x512.svg" />
          <p style={styles.welcome}>Welcome to</p>
          <p style={styles.projectName}>The Coral Project</p>
          <div style={styles.container}>
            <Button
              size="large"
              style={styles.loginButton}
              category="primary"
              onClick={this.loginUser}
            > Log In </Button>
            <a style={styles.loginRequest} href="https://coralproject.net/beta-testers/">How can I request a login?</a>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Module styles
 */

const styles = {
  base: {
    display: 'flex',
    height: window.innerHeight,
    backgroundColor: brandColor
  },
  loginModal: {
    margin: 'auto',
    width: 700
  },
  cta: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  welcome: {
    color: 'white',
    fontSize: '2em',
    textShadow: `1px 1px 2px ${color(brandColor).darken(0.3).hexString()}`
  },
  projectName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '4em',
    marginTop: -10,
    textShadow: `1px 1px 2px ${color(brandColor).darken(0.3).hexString()}`
  },
  container: {
    clear: 'both',
    width: 500,
    margin: 'auto',
    paddingTop: 30,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40
  },
  textInput: {
    display: 'block',
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white'
  },
  loginButton: {
    marginTop: 12,
    marginBottom: 25,
    width: '100%',
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: 'transparent'
    }
  },
  loginRequest: {
    color: 'white'
  },
  logo: {
    float: 'left',
    width: 128,
    height: 128,
    marginRight: 20
  },
  unauthorizedMessage: {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    fontSize: '12pt',
    color: 'white'
  }
};
