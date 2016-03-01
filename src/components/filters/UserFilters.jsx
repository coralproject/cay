import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchAllTags, fetchSections} from '../../actions';

import FilterObjectId from './FilterObjectId';
import Select from 'react-select';
import FilterNumbers from './FilterNumbers';
import FilterDate from './FilterDate';
import FilterString from './FilterString';
import Sentence from '../Sentence';

import Heading from '../Heading';

@connect(state => state.filters)
@Radium
export default class UserFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBreakdown: 'everything',
      specificBreakdowns: []
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchAllTags());
    this.props.dispatch(fetchSections());
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
          <Select
            multi={true}
            options={this.getSections()}
            value={this.state.specificBreakdowns.join(',')}
            onChange={this.setSpecificBreakdowns.bind(this)}
          />
        </div>
      );
    case 'author':
      return (
        <div>
          <p>By Author</p>
          <Select
            multi={true}
            options={this.getAuthors()}
            value={this.state.specificBreakdowns.join(',')}
            onChange={this.setSpecificBreakdowns.bind(this)}
          />
        </div>
      );
    }
  }

  setSpecificBreakdowns(values) {
    this.setState({specificBreakdowns: values.split(',')});
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

  getActiveFiltersFromConfig() {
    const userFilters = window.filters.filter(f => f.collection === 'user_statistics');
    return userFilters.map(f => {
      let filterComponent;
      if (f.type === 'numberRange') {
        filterComponent = (
          <FilterNumbers
            min={f.min}
            max={f.max}
            userMin={this.props[f.field].userMin}
            userMax={this.props[f.field].userMax}
            description={f.description}
            fieldName={f.field} />
        );
      } else if (f.type === 'dateRange') {
        filterComponent = null;
      }

      return filterComponent;
    });
  }

  render() {

    return (
      <div style={ styles.base }>
        <div style={ styles.columnHeader }>
          <Heading size="medium">
            Filters
          </Heading>
        </div>
        <p style={ styles.legend }>I want to know about:</p>
        <Select
          ref="breakdown"
          value={this.state.selectedBreakdown}
          onChange={this.updateBreakdown.bind(this)}
          style={ styles.filterDropdown }
          options={[
            {label: 'everything', value: 'everything'},
            {label: 'author', value: 'author'},
            {label: 'section', value: 'section'}
          ]} />

        {this.getSpecific()}

        <Select multi={true} style={ styles.filterDropdown } options={this.getTags()} />

        {/* this will eventually be the meat of the component */}
        {this.getActiveFiltersFromConfig()}

        {/*<FilterNumbers
          min={0}
          max={1}
          userMin={this.props['stats.accept_ratio'].userMin}
          userMax={this.props['stats.accept_ratio'].userMax}
          fieldName="stats.accept_ratio" />

        <FilterNumbers
          min={0}
          max={10000}
          userMin={this.props['stats.comments.total'].userMin}
          userMax={this.props['stats.comments.total'].userMax}
          fieldName="stats.comments.total"/>

        <FilterNumbers
          min={0}
          max={1000}
          userMin={this.props['stats.replies'].userMin}
          userMax={this.props['stats.replies'].userMax}
          fieldName="stats.replies"/>

        <FilterNumbers
          min={0}
          max={1}
          userMin={this.props['stats.replies_per_comment'].userMin}
          userMax={this.props['stats.replies_per_comment'].userMax}
          fieldName="stats.replies_per_comment"/>*/}

        {/* some sort operator? */}
      </div>
    );
  }
}

const styles = {
  base: {
    minWidth: 300,
    marginRight: 40
  },
  columnHeader: {
    height: '50px'
  },
  legend: {
    padding: '10px 0',
    fontSize: '12pt'
  },
  filterDropdown: {
    marginBottom: '20px'
  }
};
