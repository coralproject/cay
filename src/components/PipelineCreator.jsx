/* this view is used in both data explorer and user manager */

import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import Button from './Button';
import Spinner from './Spinner';

import FilterFactory from './filters/FilterFactory';

@connect(state => state.filters)
@Radium
export default class PipelineCreator extends React.Component {

  constructor(props) {
    super(props);
  }

  // we don't want to request 10000 hourly intervals,
  // so compute resonable bin size
  getSensibleInterval(start, end) {
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const week = day * 7;
    const diff = end - start;

    if (diff / day < 300) {
      return 'day';
    } else if (diff / week < 300) {
      return 'week';
    } else {
      return 'month';
    }
  }

  render() {
    return (
      <div>
        {FilterFactory.makeFilters('user')}
      </div>
    );
  }
}

const styles = {
  previewButton: {
    marginRight: 10
  }
};
