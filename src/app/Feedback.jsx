import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';

import { sendMessage } from '../actions/feedback';

@Radium
@connect(state => state.feedback)
export default class Feedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = { message: "", email: "" };
  }

  sendButtonHandler() {
    this.props.dispatch(sendMessage(this.state.email, this.state.message));
  }

  onTextChange(event) {
    this.setState({ message: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('Feedback') } />

        {
          this.props.loading ? 
            "Loading..."
          :
            null
        }

        <div>
          <input onChange={ this.onEmailChange.bind(this) } style={ styles.emailInput } placeholder="e-mail" type="text" />
        </div>
        <div>
          <textarea onChange={ this.onTextChange.bind(this) } value={ this.state.message }></textarea>
        </div>
        <div>
          <button onClick={ this.sendButtonHandler.bind(this) }>Send</button>
        </div>

      </Page>
    );
  }
}

var styles = {
  emailInput: {
    padding: '0 10px',
    backgroundColor: '#fafafa',
    fontSize: '12pt',
    height: '40px',
    lineHeight: '40px',
    marginBottom: '10px',
    border: '1px solid #ccc'
  }
}
