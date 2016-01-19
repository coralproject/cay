import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import settings from '../settings';

import {loginGit} from '../actions';

import Card from '../components/cards/Card';
import CardHeader from '../components/cards/CardHeader';
import Button from '../components/Button';

@connect(state => {
  return state.auth;
})
@Radium
class Login extends React.Component {

  loginUser() {
    this.props.dispatch(loginGit());
  }

  render() {
    return (
      <div style={styles.base}>
        <Card style={styles.loginModal}>
          <CardHeader title="Sign in with GitHub" />
          <div style={styles.container}>
            <Button
              size="large"
              style={styles.loginButton}
              category="primary"
              onClick={this.loginUser.bind(this)}
            >GitHub</Button>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: settings.lighterGrey,
    display: 'flex',
    height: window.innerHeight
  },
  loginModal: {
    margin: 'auto'
  },
  container: {
    paddingTop: 0,
    paddingRight: 40,
    paddingBottom: 40,
    paddingLeft: 40
  },
  textInput: {
    display: 'block'
  },
  loginButton: {
    marginTop: 32,
    marginBottom: 25
  }
};

export default Login;
