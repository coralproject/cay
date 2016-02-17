import React from 'react';
import Radium from 'radium';

import TextField from './TextField';

@Radium
export default class ObjectIdPicker extends React.Component {

  validateInput(input) {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    console.log('ObjectIdPicker input', input);
    this.setState({value: input});
  }

  render() {
    return (
      <TextField onChange={this.validateInput.bind(this)} label="ObjectId string" />
    );
  }
}
