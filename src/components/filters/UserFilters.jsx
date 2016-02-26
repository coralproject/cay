import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchAllTags, fetchAuthorsAndSections} from '../../actions';

import FilterObjectId from './FilterObjectId';
import Select from 'react-select';
import FilterNumbers from './FilterNumbers';
import FilterDate from './FilterDate';
import FilterString from './FilterString';
import Sentence from '../Sentence';

@connect(state => state.filters)
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

  render() {

    return (
      <div style={styles.base}>
        <p style={{fontSize: 24}}>Filters</p>
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

        <FilterObjectId />
        <div className="clear" />
        <FilterString fieldName="user_name" />
        <div className="clear" />
        <FilterString fieldName="status" />
        <div className="clear" />
        <FilterDate ref="lastLogin" fieldName="last_login" />

        <FilterDate ref="memberSince" fieldName="member_since" />

        <p>Tags</p>
        <Select multi={true} options={this.getTags()} />

        <FilterNumbers
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
          fieldName="stats.replies_per_comment"/>

        {/* some sort operator? */}
      </div>
    );
  }
}

const styles = {
  base: {
    margin: '0px 30px'
  }
};
