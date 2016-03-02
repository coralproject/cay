import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {
  fetchAllTags,
  fetchSections,
  fetchAuthors,
  setBreakdown,
  setSpecificBreakdown
} from '../../actions';

import Select from 'react-select';
import FilterNumbers from './FilterNumbers';

import Heading from '../Heading';

@connect(state => state.filters)
@Radium
export default class UserFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchAllTags());
    this.props.dispatch(fetchSections());
    this.props.dispatch(fetchAuthors());
  }

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.description, value: tag.name};
    });
  }

  getSpecific() {

    switch (this.props.breakdown) {
    case 'section':
      return (
        <div>
          <p>By Section</p>
          <Select
            options={this.getSections()}
            value={this.props.specificBreakdown}
            onChange={this.setSpecificBreakdown.bind(this)}
          />
        </div>
      );
    case 'author':
      return (
        <div>
          <p>By Author</p>
          <Select
            options={this.getAuthors()}
            value={this.props.specificBreakdown}
            onChange={this.setSpecificBreakdown.bind(this)}
          />
        </div>
      );
    }
  }

  setSpecificBreakdown(specificBreakdown) {
    console.log('setSpecificBreakdown', specificBreakdown.value);
    this.props.dispatch(setSpecificBreakdown(specificBreakdown.value));
  }

  getAuthors() {
    return this.props.authors.map(author => {
      return {label: author.name, value: author._id};
    });
  }

  getSections() {
    console.log('getSections', this.props.sections);
    return this.props.sections.map(section => {
      return {label: section.description, value: section.description};
    });
  }

  updateBreakdown(breakdown) {
    console.log('updateBreakdown', breakdown);
    this.props.dispatch(setBreakdown(breakdown.value));
    this.props.dispatch(setSpecificBreakdown(''));
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
          value={this.props.breakdown}
          onChange={this.updateBreakdown.bind(this)}
          style={ styles.filterDropdown }
          options={[
            {label: 'all', value: 'all'},
            {label: 'author', value: 'author'},
            {label: 'section', value: 'section'}
          ]} />

        {this.getSpecific()}

        <p style={styles.legend}>Tags <span style={styles.comingSoon}>Coming Soon!</span></p>
        <Select multi={true} style={ styles.filterDropdown } options={this.getTags()} />

        {/* this will eventually be the meat of the component */}
        {this.getActiveFiltersFromConfig()}

      </div>
    );
  }
}

const styles = {
  base: {
    minWidth: 300,
    maxWidth: 300
  },
  columnHeader: {
    height: 50
  },
  legend: {
    padding: '10px 0',
    fontSize: '12pt'
  },
  filterDropdown: {
    marginBottom: 20
  },
  comingSoon: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
};
