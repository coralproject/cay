import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {filterChanged} from '../../actions';

import TextField from '../forms/TextField';

@connect(state => state.filters)
@Radium
export default class FilterString extends React.Component {

  static propTypes = {
    fieldName: PropTypes.string.isRequired
  }

  updateFilters(value) {
    console.log('FilterString', value);
    this.props.dispatch(filterChanged(this.props.fieldName, value));
  }

  render() {
    return (
      <TextField
        onChange={this.updateFilters.bind(this)}
        label={this.props.fieldName} />
    );
  }
}
