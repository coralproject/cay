import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {
  fetchAllTags,
  fetchSections,
  fetchAuthors,
  setBreakdown,
  setSpecificBreakdown,
  getFilterRanges,
  makeQueryFromState
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
    this.props.dispatch(makeQueryFromState('user'));
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
    this.props.dispatch(makeQueryFromState('user'));
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
    // console.log('setSpecificBreakdown', specificBreakdown.value);
    this.props.dispatch(setSpecificBreakdown(specificBreakdown.value));
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
    this.props.dispatch(setBreakdown(breakdown.value));
    this.props.dispatch(setSpecificBreakdown(''));
    if (breakdown.value === 'all') {
      this.props.dispatch(getFilterRanges('user'));
    }
  }

  getActiveFiltersFromConfig() {

    const filters = this.props.filterList.map(key => this.props[key]);
    const userFilters = filters.filter(f => f.collection === 'user_statistics');
    return userFilters.map((f,i) => {
      let filterComponent;
      if (f.type === 'numberRange' || f.type === 'percentRange') {
        filterComponent = (
          <FilterNumbers
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={f.description}
            fieldName={f.key}
            isPercentage={f.type === 'percentRange'} />
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
        <p style={ styles.legend }>Limit User activity to:</p>
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

        <p style={styles.legend}>Show me Users that have:</p>
        {this.getActiveFiltersFromConfig()}

        <p style={styles.legend}>Filter by Tags <span style={styles.comingSoon}>Coming Soon!</span></p>

        <p>Include Users with these Tags:</p>
        <Select multi={true} style={ styles.filterDropdown } options={this.getTags()} />

        <p>Exclude Users with these Tags:</p>
        <Select multi={true} style={ styles.filterDropdown } options={this.getTags()} />
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
