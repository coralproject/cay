import React, {PropTypes} from 'react';
import Radium from 'radium';

import {Link} from 'react-router';
import {Textfield, Button} from 'react-mdl';
import Facebook from 'react-icons/lib/fa/facebook-official';
import GitHub from 'react-icons/lib/fa/github';
import Twitter from 'react-icons/lib/fa/twitter-square';

@Radium
export default class SignUp extends React.Component {

  static propTypes = {
    signUpFB: PropTypes.func.isRequired,
    signUpGH: PropTypes.func.isRequired,
    signUpTwitter: PropTypes.func.isRequired
  }

  render() {
    return (
      <div style={styles}>
        <p className="cta" style={styles.cta}>Sign up</p>
        <Button
          raised
          colored
          className='facebook signUp'
          onClick={this.signUpFB}
          style={styles.social('fb')}><Facebook /> Sign up with Facebook</Button>
        <Button
          raised
          colored
          onClick={this.signUpGH}
          className='github signUp'
          style={styles.social('gh')}><GitHub /> Sign up with Github</Button>
        <Button
          raised
          colored
          onClick={this.signUpTwitter}
          className='twitter signUp'
          style={styles.social('twitter')}><Twitter /> Sign up with Twitter</Button>
        <p style={styles.cta}>Or</p>
        <Textfield style={{width: '100%'}} className="emailSignUp" floatingLabel label='Email address' />
        <Textfield style={{width: '100%'}} className="emailSignUpPassword" type="password" floatingLabel label='Password' />
        <Textfield style={{width: '100%'}} className="emailSignUpPasswordConfirm" type="password" floatingLabel label='Confirm password' />
        <Button className="signUpTrigger" style={styles.signUp} raised ripple>Sign up</Button>
        <Link style={styles.forgotPassword} className="forgotPassword" to="forgot-password">Forgot your password?</Link>
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

  signUp: {
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
