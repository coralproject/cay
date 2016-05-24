import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import _ from 'lodash';

import { userSelected } from 'users/UsersActions';
import { makeQueryFromState } from 'search/SearchActions';
import {
  setBreakdown,
  setSpecificBreakdown,
  getFilterRanges} from 'filters/FiltersActions';


import Select from 'react-select';
import FilterNumbers from 'filters/FilterNumbers';
import FilterNumberPercent from 'filters/FilterNumberPercent';
import FilterDate from 'filters/FilterDate';
import FilterDateProximity from 'filters/FilterDateProximity';

import Heading from 'components/Heading';

@connect(state => state.filters)
@Radium
export default class UserFilters extends React.Component {

  constructor(props) {
    super(props);
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
    this.props.dispatch(userSelected(null));
    this.props.dispatch(setSpecificBreakdown(newValue));
    this.props.dispatch(getFilterRanges('user'));
    this.props.dispatch(makeQueryFromState('user', 0, true));
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
      const fmtDesc = f.description.charAt(0).toUpperCase() + f.description.slice(1, f.description.length);
      const inTitleCase = _.map(f.description.split(' '), _.capitalize).join(' ');
      if (f.type === 'percentRange') {
        filterComponent = (
          <FilterNumberPercent
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={Math.max(f.userMin, f.min)}
            userMax={Math.min(f.userMax, f.max)}
            description={fmtDesc}
            fieldName={f.key}
            type={f.type}/>
        );
      } else if (f.type === 'intRange' || f.type === 'floatRange') {
        // capitalize first letter of description
        filterComponent = (
          <FilterNumbers
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={Math.max(f.userMin, f.min)}
            userMax={Math.min(f.userMax, f.max)}
            description={inTitleCase}
            fieldName={f.key}
            type={f.type}/>
        );
      } else if (f.type === 'dateRange') {
        filterComponent = (
          <FilterDate
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={inTitleCase}
            type={f.type}
            fieldName={f.key} />
        );
      } else if (f.type === 'intDateProximity') {
        filterComponent = (
          <FilterDateProximity
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={inTitleCase}
            type={f.type}
            fieldName={f.key}
            />
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
