import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import settings from '../settings';

import Card from '../components/cards/card';
import CardHeader from '../components/cards/card-header';
import TextField from '../components/form/text-field';
import Button from '../components/button';

@connect(state => {
  return state.auth;
})
@Radium
export default class Login extends React.Component {
  render() {
    const {dispatch} = this.props;

    console.log('Login container', this.props);

    return (
      <div style={styles.base}>
        <Card style={styles.loginModal}>
          <CardHeader title="Sign in" />
          <div style={styles.container}>
            <TextField label="Username / Email Address" />
            <TextField label="Password" />
            <Button category="primary">SIGN IN</Button>
            <hr />
            <p>Or connect with</p>
            <Button category="primary">SSO</Button>
          </div>
        </Card>
      </div>
    );
  }
}

var styles = {
  base: {
    backgroundColor: settings.lighterGrey,
    display: 'flex',
    height: window.innerHeight
  },
  loginModal: {
    margin: 'auto'
  },
  container: {
    padding: 15
  }
}
