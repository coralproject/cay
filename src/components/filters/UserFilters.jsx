import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchAllTags} from '../../actions';

import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';
import ObjectIdPicker from '../forms/ObjectIdPicker';
import TextField from '../forms/TextField';
import Select from 'react-select';
import FilterDate from './FilterDate';

@connect(state => state.pipelines)
@Radium
export default class UserFilters extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchAllTags());
  }

  makeQuery() {

  }

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.description, value: tag.name};
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>UserFilters</CardHeader>

        <p>Id</p>
        <ObjectIdPicker />
        <p>name</p>
        <TextField label="user name" />
        <p>status</p>
        <TextField label="status" />
        <p>last login</p>
        <FilterDate ref="lastLogin" />
        <p>Member since</p>
        <FilterDate ref="memberSince" />
        <p>Tags</p>
        <Select multi={true} options={this.getTags()} />
      </Card>
    );
  }
}
