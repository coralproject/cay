import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import settings from 'settings';
import capitalize from 'lodash/string/capitalize';

import { userSelected } from 'users/UsersActions';
import TagsFilter from 'filters/TagsFilter';
import { makeQueryFromState, clearUserList } from 'search/SearchActions';
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

import {logOnce} from 'components/utils/logHelpers';
import { toggleTagVisibility, showAllTags, showSpecificTag } from 'search/SearchActions';

@connect(({ filters, searches, tags }) => ({ ...filters, excludedTags: searches.excluded_tags, tags: tags.items }))
@Radium
export default class UserFilters extends React.Component {

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.description, value: tag.name};
    });
  }

  getSpecific() {

    const breakdown = this.props.editMode ? this.props.breakdownEdit : this.props.breakdown;
    const specificBreakdown = this.props.editMode ? this.props.specificBreakdownEdit : this.props.specificBreakdown;

    switch (breakdown) {
    case 'section':
      return (
        <div>
          <Select
            style={styles.filterDropdown}
            options={this.getSections()}
            value={specificBreakdown}
            onChange={this.setSpecificBreakdown.bind(this)}
          />
        </div>
      );
    case 'author':
      return (
        <div>
          <Select
            style={styles.filterDropdown}
            options={this.getAuthors()}
            value={specificBreakdown}
            onChange={this.setSpecificBreakdown.bind(this)}
          />
        </div>
      );
    }
  }

  setSpecificBreakdown(specificBreakdown) {
    let newValue = specificBreakdown !== null ? specificBreakdown.value : '';
    this.props.dispatch(userSelected(null));
    this.props.dispatch(clearUserList());
    this.props.dispatch(setSpecificBreakdown(newValue, this.props.editMode));
    this.props.dispatch(getFilterRanges(this.props.editMode));
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
    const localBreakdown = this.props.editMode ? this.props.breakdownEdit : this.props.breakdown;
    let newValue;
    if (breakdown === null && localBreakdown !== 'all') {
      newValue = 'all';
    } else if (breakdown === null) { // if we're already on all, just do nothing
      return;
    } else {
      newValue = breakdown.value;
    }

    this.props.dispatch(setBreakdown(newValue, this.props.editMode));
    this.props.dispatch(setSpecificBreakdown('', this.props.editMode));

    if (newValue === 'all') {
      this.props.dispatch(getFilterRanges(this.props.editMode));
    }
  }
  
  onTagClick(tagName) {
    this.props.dispatch(toggleTagVisibility(tagName));
  }

  onShowAllTags() {
    this.props.dispatch(showAllTags());
  }
  
  onShowSpecificTag(tags, tag) {
    this.props.dispatch(showSpecificTag(tags, tag));
  }

  getActiveFiltersFromConfig() {

    const filterList = this.props.editMode ? this.props.editFilterList : this.props.filterList;
    const filters = filterList.map(key => this.props[key]);
    const userFilters = filters.filter(f => f.collection === 'user_statistics');
    return userFilters.map((f,i) => {
      let filterComponent;
      const fmtDesc = f.description.charAt(0).toUpperCase() + f.description.slice(1, f.description.length);
      const inTitleCase = f.description.split(' ').map(capitalize).join(' ');
      const filterStyle = Object.assign({}, styles.filterBase, {backgroundColor: i % 2 ? 'transparent' : '#f5f5f5'});

      if (f.type === 'percentRange') {
        filterComponent = (
          <FilterNumberPercent
            style={filterStyle}
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={fmtDesc}
            fieldName={f.key}
            type={f.type}/>
        );
      } else if (f.type === 'intRange' || f.type === 'floatRange') {
        // capitalize first letter of description
        filterComponent = (
          <FilterNumbers
            style={filterStyle}
            onChange={this.props.onChange}
            key={i}
            min={f.min}
            max={f.max}
            userMin={f.userMin}
            userMax={f.userMax}
            description={inTitleCase}
            fieldName={f.key}
            type={f.type}/>
        );
      } else if (f.type === 'dateRange') {
        filterComponent = (
          <FilterDate
            style={filterStyle}
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
            style={filterStyle}
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

      if (f.min === null) {
        if (this.props.filterRangesLoaded) {
          logOnce(`filterNullData-${i}`, 'Filter:', i, f.description, 'had null data, so we didn\'t show it. Check getActiveFiltersFromConfig() in UserFilters.');
        }
        filterComponent = null;
      }

      return filterComponent;
    });
  }

  render() {
    const breakdown = this.props.editMode ? this.props.breakdownEdit : this.props.breakdown;
    return (
      <div style={[styles.base, this.props.styles]}>
        <Heading size="medium">
          Filters
        </Heading>
        <div style={styles.filters}>

          <Select
            ref="breakdown"
            value={breakdown}
            onChange={this.updateBreakdown.bind(this)}
            style={ styles.filterDropdown }
            options={[
              {label: 'All Sections & Authors', value: 'all'},
              {label: 'Author', value: 'author'},
              {label: 'Section', value: 'section'}
            ]} />

          {this.getSpecific()}
          {this.getActiveFiltersFromConfig()}
          
          <TagsFilter excludedTags={this.props.excludedTags}
            tags={this.props.tags}
            onTagClick={this.onTagClick.bind(this)}
            onShowAll={this.onShowAllTags.bind(this)}
            onShowOnly={this.onShowSpecificTag.bind(this)} />
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    flex: '0 0 380px',
    marginRight: 0
  },
  filters: {
    clear: 'both',
    backgroundColor: 'white',
    borderRadius: 3,
    overflowY: 'scroll',
    height: 'calc(100% - 46px)'
    // does not update on window.resize, but this is the best I could do
    // before running out of patience
  },
  filterBase: {
    padding: 20,
    borderBottom: '1px solid #ddd'
  },
  legend: {
    padding: '0',
    fontSize: '11pt'
  },
  filterDropdown: {
    margin: '10px 0 10px 10px',
    width: '95%'
  },
  comingSoon: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
};
