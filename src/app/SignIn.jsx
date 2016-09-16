import React from 'react';
import Radium from 'radium';

import {Link} from 'react-router';
import {Textfield, Button} from 'react-mdl';
import Facebook from 'react-icons/lib/fa/facebook-official';
import GitHub from 'react-icons/lib/fa/github';
import Twitter from 'react-icons/lib/fa/twitter-square';

@Radium
export default class SignIn extends React.Component {
  render() {
    return (
      <div style={styles}>
        <p style={styles.cta}>Sign in</p>
        <Button
          raised
          colored
          className='facebook signIn'
          style={styles.social('fb')}><Facebook /> Sign In with Facebook</Button>
        <Button
          raised
          colored
          className='github signIn'
          style={styles.social('gh')}><GitHub /> Sign In with Github</Button>
        <Button
          raised
          colored
          className='twitter signIn'
          style={styles.social('twitter')}><Twitter /> Sign In with Twitter</Button>
        <p style={styles.cta}>Or</p>
        <Textfield style={{width: '100%'}} floatingLabel label='Email address' />
        <Textfield style={{width: '100%'}} floatingLabel label='Password' />
        <Button className="signInTrigger" style={styles.signIn} raised ripple>Sign in</Button>
        <Link style={styles.forgotPassword} to="forgot-password">Forgot your password?</Link>
        <p style={styles.haveAccount}>Already have an account? <Link className="linkToSignIn" to="sign-in">Sign in.</Link></p>
      </div>
    );
  }
}

const styles = {
  maxWidth: 340,
  margin: '0 auto',
  backgroundColor: 'white',
  padding: 20,

  social: network => {
    let base = {
      width: '100%',
      textAlign: 'left',
      marginBottom: 10
    };

    if (network === 'fb') base.backgroundColor = 'rgb(68, 94, 166)';
    if (network === 'gh') base.backgroundColor = 'black';
    if (network === 'twitter') base.backgroundColor = 'rgb(77, 180, 245)';

    return base;
  },

  cta: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: 20
  },

  signIn: {
    backgroundColor: 'rgb(0, 168, 150)',
    width: '100%',
    color: 'white'
  },

  forgotPassword: {
    textAlign: 'center',
    margin: '10px 0',
    display: 'block',
    fontSize: '12px',
    width: '100%'
  },

  haveAccount: {
    textAlign: 'center'
  }
};
