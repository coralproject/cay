import React, {PropTypes} from 'react';
import Radium from 'radium';

import {Textfield, Button} from 'react-mdl';

@Radium
export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword() {
    // call an action here or something
  }

  render() {
    return (
      <div style={styles}>
        <p className="cta" style={styles.cta}>Reset Password</p>
        <Textfield
          style={{width: '100%'}}
          className="passwordInput first"
          floatingLabel
          type="password"
          label="Password" />
        <Textfield
          style={{width: '100%'}}
          className="passwordInput confirm"
          floatingLabel
          type="password"
          label="Confirm Password" />
        <Button
          raised
          colored
          className="resetPassword"
          onClick={this.resetPassword}
          style={{width: '100%'}}>Reset Password</Button>
      </div>
    );
  }
}

const styles = {
  maxWidth: 340,
  margin: '0 auto',
  backgroundColor: 'white',
  padding: 20,

  cta: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: 20
  }
};
