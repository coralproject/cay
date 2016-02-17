import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchAllTags, fetchAuthorsAndSections} from '../../actions';

import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';
import ObjectIdPicker from '../forms/ObjectIdPicker';
import TextField from '../forms/TextField';
import Select from 'react-select';
import FilterNumber from './FilterNumber';
import FilterNumbersContainer from './FilterNumbersContainer';
import FilterDate from './FilterDate';

@connect(state => state.pipelines)
@Radium
export default class UserFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBreakdown: 'anything',
      specificBreakdowns: []
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchAllTags());
    this.props.dispatch(fetchAuthorsAndSections());
  }

  makeQuery() {

  }

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.description, value: tag.name};
    });
  }

  getSpecific() {
    switch (this.state.selectedBreakdown) {
    case 'section':
      return (
        <div>
          <p>By Section</p>
          <Select multi={true} options={this.getSections()} />
        </div>
      );
    case 'author':
      return (
        <div>
          <p>By Author</p>
          <Select multi={true} options={this.getAuthors()} />
        </div>
      );
    }
  }

  getAuthors() {
    return this.props.authors.map(author => {
      return {label: author, value: author};
    });
  }

  getSections() {
    return this.props.sections.map(section => {
      return {label: section, value: section};
    });
  }

  updateBreakdown(breakdown) {
    this.setState({
      selectedBreakdown: breakdown,
      specificBreakdowns: []
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>UserFilters</CardHeader>

        <p>I want to know about:</p>
        <Select
          ref="breakdown"
          value={this.state.selectedBreakdown}
          onChange={this.updateBreakdown.bind(this)}
          options={[
            {label: 'anything', value: 'anything'},
            {label: 'author', value: 'author'},
            {label: 'section', value: 'section'}
          ]} />

        {this.getSpecific()}

        <ObjectIdPicker />
        <div className="clear" />
        <TextField label="user name" />
        <div className="clear" />
        <TextField label="status" />
        <div className="clear" />
        <FilterDate ref="lastLogin" fieldName="Last Login" />

        <FilterDate ref="memberSince" fieldName="Member Since" />

        <p>Tags</p>
        <Select multi={true} options={this.getTags()} />

        <FilterNumbersContainer fieldName="Comment Accept Ratio" />

        <FilterNumbersContainer fieldName="Total Comments"/>

        <FilterNumbersContainer fieldName="Replied to Ratio"/>

        <FilterNumbersContainer fieldName="Replies per Comment"/>

        {/* some sort operator? */}

      </Card>
    );
  }
}
