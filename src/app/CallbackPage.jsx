import React from 'react';
import {CallbackComponent} from 'redux-oidc';
import {connect} from 'react-redux';

@connect()
export default class CallbackPage extends React.Component {

  constructor(props) {
    super(props);
    this.successCallback = this.successCallback.bind(this);
  }

  componentWillMount() {
    console.log('CallbackComponent.componentWillMount');
  }

  successCallback() {
    console.log('successCallback!');
  }

  render() {
    return (
      <CallbackComponent successCallback={this.successCallback} />
    );
  }
}
