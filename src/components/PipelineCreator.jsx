/* this view is used in both data explorer and user manager */

import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {createFormula, makeQueryFromState} from '../actions';
import Select from 'react-select';
import TextField from './forms/TextField';
import Button from './Button';
import Spinner from './Spinner';

import FilterDate from './filters/FilterDate';

import FilterFactory from './filters/FilterFactory';

@connect(state => state.filters)
@Radium
export default class PipelineCreator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBreakdown: 'total', // asset|author|section|user|total
      resultFields: [], // what fields the user is interested in measuring; replies, replies per comment, etc
      specificBreakdowns: [], // this could be particular author(s), or a specific section
      // hard-code the date range of the NYT dataset.
      computedQuery: null
    };
  }
  static propTypes = {

  }
  static defaultProps = {

  }

  // componentDidMount() {
  //   this.props.dispatch(makeQueryFromState('user'));
  // }

  handleCreatePipeline() {
    this.props.dispatch(makeQueryFromState('user'));
  }

  getTargets(target) {
    var targets = (target === 'author') ? this.props.authors : this.props.sections;

    return targets.map(t => {
      return {value: t, label: t};
    });
  }

  setSpecificBreakdowns(values) {
    this.setState({specificBreakdowns: values.split(',')});
  }

  getSpecific(selectedBreakdown) {
    if (selectedBreakdown === 'asset') {
      // ????
    } else if (selectedBreakdown === 'author') {
      // return a list of authors
      return (
        <div>
          <p style={styles.label}>on assets written by</p>
          <Select
            options={this.getTargets('author')}
            name="selected-targets"
            placeholder="Author"
            value={this.state.specificBreakdowns.join(',')}
            onChange={this.setSpecificBreakdowns.bind(this)}
            multi={true} />
          </div>
        );
    } else if (selectedBreakdown === 'section') {
      return (
        <div>
          <p style={styles.label}>specifically, these sections</p>
          <Select
            options={this.getTargets('section')}
            name="selected-targets"
            placeholder="Section"
            value={this.state.specificBreakdowns.join(',')}
            onChange={this.setSpecificBreakdowns.bind(this)}
            multi={true} />
          </div>
        );
    } else if (selectedBreakdown === 'user') {
      return (<TextField label="auto-complete user search" />);
    } else {
      return '';
    }
  }

  // this toggles the UI to load more specific options
  updateOutput(breakdown) {
    this.setState({selectedBreakdown: breakdown, specificBreakdowns: []});
  }

  updateFields(values) {
    this.setState({resultFields: values.split(',')});
  }

  getBreakdownOptions() {
    // apparently the asset target returns invalid JSON, hide for now
    var possible = ['total', 'user', /*'asset',*/ 'section', 'author'];

    return possible.map(p => {
      return {value: p, label: p};
    });
  }

  getFieldOptions() {

    return [
      {
        value: 'comments',
        label: 'comments (total, accepted, rejected & escalated)'
      },
      {
        value: 'replies',
        label: 'replies (total)'
      },
      {
        value: 'replies_per_comment',
        label: 'replies (per comment)'
      },
      {
        value: 'accept_ratio',
        label: 'accept ratio'
      }
    ];
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
            category="primary"
            disabled={ this.props.loadingUserList }
            onClick={this.handleCreatePipeline.bind(this)}>
            {
              this.props.loadingUserList ?
                <span>
                  <Spinner /> Loading...
                </span>
              : 
                <span>Create</span>
            }
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundColor: 'white',
  padding: '10px',
  label: {
    marginTop: 10
  }
};
