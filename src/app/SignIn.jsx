import React, {PropTypes} from 'react';
import Radium from 'radium';

import {Link} from 'react-router';
import {Textfield, Button} from 'react-mdl';
import Facebook from 'react-icons/lib/fa/facebook-official';
import GitHub from 'react-icons/lib/fa/github';
import Twitter from 'react-icons/lib/fa/twitter-square';

@Radium
export default class SignIn extends React.Component {

  static propTypes = {
    signInFB: PropTypes.func.isRequired,
    signInGH: PropTypes.func.isRequired,
    signInTwitter: PropTypes.func.isRequired
  }

  render() {
    return (
      <div style={styles}>
        <p className="cta" style={styles.cta}>Sign in</p>
        <Button
          raised
          colored
          onClick={this.signInFB}
          className='facebook signIn'
          style={styles.social('fb')}><Facebook /> Sign in with Facebook</Button>
        <Button
          raised
          colored
          onClick={this.signInGH}
          className='github signIn'
          style={styles.social('gh')}><GitHub /> Sign in with Github</Button>
        <Button
          raised
          colored
          onClick={this.signInTwitter}
          className='twitter signIn'
          style={styles.social('twitter')}><Twitter /> Sign in with Twitter</Button>
        <p style={styles.cta}>Or</p>
        <Textfield style={{width: '100%'}} className="emailSignIn" floatingLabel label='Email address' />
        <Textfield style={{width: '100%'}} className="emailSignInPassword" type="password" floatingLabel label='Password' />
        <Button className="signInTrigger" style={styles.signIn} raised ripple>Sign in</Button>
        <Link style={styles.forgotPassword} className="forgotPassword" to="forgot-password">Forgot your password?</Link>
        <p style={styles.haveAccount}>Need an account? <Link className="linkToRegister" to="sign-up">Register.</Link></p>
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
