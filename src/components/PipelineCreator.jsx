/* this view is used in both data explorer and user manager */

import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {makeQueryFromState, getFilterRanges} from '../actions';
import Button from './Button';
import Spinner from './Spinner';

import FilterFactory from './filters/FilterFactory';

@connect(state => state.filters)
@Radium
export default class PipelineCreator extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getFilterRanges('user'));
    // this.props.dispatch(makeQueryFromState('user'));
  }

  handleCreatePipeline() {
    this.props.dispatch(makeQueryFromState('user'));
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

        <div>
          <Button
            style={styles.previewButton}
            category="primary"
            disabled={ this.props.loadingUserList }
            onClick={this.handleCreatePipeline.bind(this)}>
            {
              this.props.loadingUserList ?
                <span>
                  <Spinner /> Loading...
                </span>
              :
                'Preview'
            }
          </Button>
          <Button disabled>Save (Coming Soon)</Button>
        </div>
      </div>
    );
  }
}

const styles = {
  previewButton: {
    marginRight: 10
  }
};
