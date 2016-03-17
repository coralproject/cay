import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {filterChanged} from 'filters/FiltersActions';

import TextField from '../forms/TextField';

@connect()
@Radium
export default class ObjectIdPicker extends React.Component {

  static propTypes = {
    fieldName: PropTypes.string.isRequired
  }

  validateInput(input) {
    const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
    if (input.match(checkForHexRegExp)) {
      this.setState({value: input});
    } else {
      this.setState({value: null, errorMessage: 'Invalid ObjectId. Must be 24-digit hex'});
    }
  }

  render() {
    return (
      <TextField
        onChange={this.validateInput.bind(this)}
        label="ObjectId string"
        error={this.state.errorMessage}
      />
    );
  }
}
