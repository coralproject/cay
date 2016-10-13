import React, {PropTypes} from 'react';
import {CallbackComponent} from 'redux-oidc';
import {connect} from 'react-redux';

@connect()
export default class CallbackPage extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.successCallback = this.successCallback.bind(this);
  }

  successCallback() {
    this.context.router.push('/forms');
  }

  errorCallback(error) {
    console.error('there was an error handling the token callback', error.message);
  }

  render() {
    return (
      <CallbackComponent successCallback={this.successCallback} />
    );
  }
}
