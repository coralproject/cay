
/**
 * Module dependencies
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import Button from 'components/Button';

import { brandColor } from 'settings';
import color from 'color';

import {userManager} from 'store';

/**
 * Expose login component
 */

@connect(({ app }) => ({ app }))
@Radium
export default class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    userManager.signinRedirect();
  }

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.loginModal}>
          <img style={styles.logo} src="/img/logomark_512x512.svg" />
          <p style={styles.welcome}>Welcome to</p>
          <p style={styles.projectName}>The Coral Project</p>
          <p style={{color: 'white'}}>Redirecting...</p>
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
    lineHeight: '1em',
    textShadow: `1px 1px 2px ${color(brandColor).darken(0.3).hexString()}`
  },
  logo: {
    float: 'left',
    width: 128,
    height: 128,
    marginRight: 20
  }
};
