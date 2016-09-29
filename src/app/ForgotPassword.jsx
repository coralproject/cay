import React, {PropTypes} from 'react';
import Radium from 'radium';

import {Textfield, Button} from 'react-mdl';

@Radium
export default class ForgotPassword extends React.Component {

  static propTypes = {

  }

  render() {
    return (
      <div style={styles}>
        <p className="cta" style={styles.cta}>Forgot Password?</p>
        <Textfield floatingLabel style={{width: '100%'}} className="emailInput" label="Email" />
        <Button
          raised
          colored
          className="requestResetLink"
          onClick={this.requestResetLink}
          style={{width: '100%'}}
          >Send me a reset link</Button>
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
