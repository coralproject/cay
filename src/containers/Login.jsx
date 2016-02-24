import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import settings from '../settings';
import color from 'color';

import {login} from '../actions';

import Button from '../components/Button';
import TextField from '../components/forms/TextField';

@connect(state => state.auth)
@Radium
class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    // use react-router to push state?
    if (this.props.authorized) {
      let {router} = this.context;
      router.push('/user-manager');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authorized) {
      let {router} = this.context;
      router.push('/user-manager');
    }
  }

  loginUser() {
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  updateEmail(email) {
    this.setState({email});
  }

  updatePass(password) {
    this.setState({password});
  }

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.loginModal}>
          <img style={styles.logo} src="./img/logo_white.png" />
          <p style={styles.welcome}>Welcome to</p>
          <p style={styles.projectName}>The Coral Project</p>
          <div style={styles.container}>
            <TextField
              ref="email"
              style={styles.textInput}
              onChange={this.updateEmail.bind(this)}
              label="email" />
            <TextField
              type="password"
              ref="password"
              style={styles.textInput}
              onChange={this.updatePass.bind(this)}
              label="password" />
            <Button
              size="large"
              style={styles.loginButton}
              category="primary"
              onClick={this.loginUser.bind(this)}
            >Log In</Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    height: window.innerHeight
  },
  loginModal: {
    margin: 'auto',
    width: 700
  },
  welcome: {
    color: 'white',
    fontSize: '2em',
    textShadow: '1px 1px 2px ' + color(settings.brandColor).darken(0.3).hexString()
  },
  projectName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '4em',
    marginTop: -10,
    textShadow: '1px 1px 2px ' + color(settings.brandColor).darken(0.3).hexString()
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
  logo: {
    float: 'left',
    width: 130.5,
    height: 134.5,
    marginRight: 20
  }
};

export default Login;
