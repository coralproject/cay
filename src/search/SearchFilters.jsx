/* this view is used in both data explorer and user manager */

import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {getFilterRanges} from 'filters/FiltersActions';

import UserFilters from 'filters/UserFilters';

@connect(state => state.filters)
@Radium
export default class SearchFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getFilterRanges('user'));
  }

  render() {
    return (
      <div>
        <UserFilters onChange={this.props.onChange} />
      </div>
    );
  }
}

const styles = {
  previewButton: {
    marginRight: 10
  }
};
