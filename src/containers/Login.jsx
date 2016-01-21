import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';

import settings from '../settings';

import {loginInitGit, loginGitSuccess} from '../actions';

import Card from '../components/cards/Card';
import CardHeader from '../components/cards/CardHeader';
import Button from '../components/Button';

@connect(state => state.auth)
@Radium
class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log('componentWillMount', this.props);
    // user has redirected here from github auth screen
    if (!this.props.token && this.props.location.query.code) {
      // check for github auth token
      // store in localStorage until we figure out how to have a real webserver
      this.props.dispatch(loginGitSuccess(this.props.location.query.code));

      // http://localhost:3000/login?code=f2a01d34e1a686b0db3b&state=foobar
      // use react-router to push state?
      browserHistory.push('/explore');
    } else if (this.props.token) { // user has previously logged in
      browserHistory.push('/explore');
    }
  }

  loginUser() {
    this.props.dispatch(loginInitGit());
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
