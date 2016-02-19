import React, {PropTypes} from 'react';
import Radium from 'radium';
// import {connect} from 'react-redux';
import {filterChanged} from '../../actions';
import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';

import TextField from '../forms/TextField';

// @connect(state => state.filters)
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
      <Card>
        <CardHeader>{this.props.fieldName}</CardHeader>
          <TextField
            onChange={this.updateFilters.bind(this)}
            label={this.props.fieldName} />
      </Card>
    );
  }
}
