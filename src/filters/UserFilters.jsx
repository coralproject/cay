import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import _ from 'lodash';

import { makeQueryFromState } from 'search/SearchActions';
import {
  setBreakdown,
  setSpecificBreakdown,
  getFilterRanges} from 'filters/FiltersActions';


import Select from 'react-select';
import FilterNumbers from 'filters/FilterNumbers';
import FilterDate from 'filters/FilterDate';

import Heading from 'components/Heading';

@connect(state => state.filters)
@Radium
export default class UserFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    /*
      only a filter or breakdown change updates the counter in the reducer.
      if a filter changed, we trigger ajax.
    */
    if (this.props.counter !== nextProps.counter) {
      // a filter changed, fire ajax,
      this.updateUserList();
    }
  }
  updateUserList() {
    this.props.dispatch(makeQueryFromState('user', 0, true));
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
    let newValue = specificBreakdown !== null ? specificBreakdown.value : '';
    this.props.dispatch(setSpecificBreakdown(newValue));
    this.props.dispatch(getFilterRanges('user'));
  }

  getAuthors() {
    return this.props.authors.map(author => {
      return {label: author.name, value: author._id};
    });
  }

  getSections() {
    // console.log('getSections', this.props.sections);
    return this.props.sections.map(section => {
      return {label: section.description, value: section.description};
    });
  }

  updateBreakdown(breakdown) {
    // console.log('updateBreakdown', breakdown);
    let newValue;
    if (breakdown === null && this.props.breakdown !== 'all') {
      newValue = 'all';
    } else if (breakdown === null) { // if we're already on all, just do nothing
      return;
    } else {
      newValue = breakdown.value;
    }

    this.props.dispatch(setBreakdown(newValue));
    this.props.dispatch(setSpecificBreakdown(''));
    if (newValue === 'all') {
      this.props.dispatch(getFilterRanges('user'));
    }
  }

  getActiveFiltersFromConfig() {

    const filters = this.props.filterList.map(key => this.props[key]);
    const userFilters = filters.filter(f => f.collection === 'user_statistics');
    return userFilters.map((f,i) => {
      let filterComponent;

      const inTitleCase = _.map(f.description.split(' '), _.capitalize).join(' ');
      if (f.type === 'intRange' || f.type === 'percentRange' || f.type === 'floatRange') {

        filterComponent = (
          <FilterNumbers
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={inTitleCase}
            fieldName={f.key}
            type={f.type}
            isPercentage={f.type === 'percentRange'} />
        );
      } else if (f.type === 'dateRange') {
        filterComponent = (
          <FilterDate
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={inTitleCase}
            type={f.type}
            fieldName={f.key} />
        );
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
        <p style={ styles.legend }>Limit user activity to:</p>
        <Select
          ref="breakdown"
          value={this.props.breakdown}
          onChange={this.updateBreakdown.bind(this)}
          style={ styles.filterDropdown }
          options={[
            {label: 'All', value: 'all'},
            {label: 'Author', value: 'author'},
            {label: 'Section', value: 'section'}
          ]} />

        {this.getSpecific()}

        <p style={styles.legend}>Show me Users that have:</p>
        {this.getActiveFiltersFromConfig()}

      </div>
    );
  }
}

const styles = {
  base: {
    minWidth: 300
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
