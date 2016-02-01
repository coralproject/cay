import React from 'react';
import Radium from 'radium';
import {createPipelineValueChanged} from '../actions';
import Flex from "./layout/flex";
import FlexItem from "./layout/flex-item";
import Select from 'react-select';

@Radium
class PipelineCreator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBreakdown: 'total', // asset|author|section|user|total
      resultFields: [], // what fields the user is interested in measuring; replies, replies per comment, etc
      specificBreakdowns: [], // this could be particular author(s), or a specific section
      // hard-code the date range of the NYT dataset.
      minDate: '2003-05-13',
      maxDate: '2015-01-01',
      computedQuery: null
    };
  }

  handleCreatePipeline() {
    console.log(this.refs);

    /* this will be moved to actions, construct and pass an object from here */
    var computedQuery = {
      name: 'custom_query',
      desc: 'Returns a time series of comments bounded by iso dates!  Totals or broken down by duration [day|week|month] and target type total|user|asset|author|section]',
      pre_script: '',
      pst_script: '',
      params: [],
      queries: [
        {
          name: 'custom_query',
          type: 'pipeline',
          collection: 'comment_timeseries',
          commands: [
            {
              $match: {
                start_iso: {$gte: '#date:2013-01-01'}
              }
            },
            {
              $match: {
                start_iso: {$lt: '#date:2014-12-31'}
              }
            },
            {
              $match: {duration: 'week'}
            },
            {
              $match: {target: 'author'}
            },
            {$match: {target_doc: 'Paul Krugman'}},
            {
              $sort: {
                start_iso: 1
              }
            }
          ],
          return: true
        }
      ],
      enabled: true
    };

    this.props.dispatch(createPipelineValueChanged(computedQuery));
  }

  getTargets(target) {
    var targets = (target === 'author') ? this.props.authors : this.props.sections;

    return targets.map(t => {
      return {value: t, label: t};
    });
  }

  getSpecific(selectedBreakdown) {
    if (selectedBreakdown === 'asset') {
      // ????
    } else if (selectedBreakdown === 'author') {
      // return a list of authors
      return (
        <div>
          <p style={{marginBottom: 10, marginTop: 10}}>on assets written by</p>
          <Select
            options={this.getTargets('author')}
            name="selected-targets"
            placeholder="Author"
            multi={true} />
          </div>
        );
    } else if (selectedBreakdown === 'section') {
      return (
        <div>
          <p style={{marginBottom: 10, marginTop: 10}}>specifically, these sections</p>
          <Select
            options={this.getTargets('section')}
            name="selected-targets"
            placeholder="Section"
            multi={true} />
          </div>
        );
    } else if (selectedBreakdown === 'user') {
      return (<p>Auto-complete widget yo</p>);
    } else {
      return '';
    }
  }

  // this toggles the UI to load more specific options
  updateOutput(breakdown) {
    this.setState({selectedBreakdown: breakdown});
  }

  getBreakdownOptions() {
    var possible = ['total', 'user', 'asset', 'section', 'author'];

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

  render() {

    return (
      <div>
          <p>I want to know about</p>
          <Select
            options={this.getBreakdownOptions()}
            name="breakdown-type"
            onChange={this.updateOutput.bind(this)} />

          <p style={{marginBottom: 10}}>
            {"Show me:"}
          </p>
          <Select
            style={{width: 100}}
            onChange={this.updateOutput.bind(this)}
            name="selected-field"
            multi={true}
            options={this.getFieldOptions()}
            placeholder="comments / replies / accept ratio"/>

          {this.getSpecific(this.state.selectedBreakdown)}

          <p style={{marginBottom: 10, marginTop: 10}}>between</p>
          <input type="date" ref="date_start" value={this.state.minDate} />
          <p style={{marginBottom: 10, marginTop: 10}}>and</p>
          <input type="date" ref="date_end" value={this.state.maxDate} />
        <p style={{marginTop: 10}}> + Add another question for comparison </p>
        <div style={{marginTop: 20}}>
          <button onClick={this.handleCreatePipeline.bind(this)}> Create </button>
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundColor: 'white',
  padding: '10px'
};

export default PipelineCreator;


// <select
//   onChange={this.updateOutput.bind(this)}
//   style={styles.select}
//   ref="pipelines">
//   <option value={"what_is"}> What is the </option>
// </select>
// <select
//   onChange={this.updateOutput.bind(this)}
//   style={styles.select}
//   ref="pipelines">
//   <option value={"number"}> number of </option>
//   <option value={"ratio"}> ratio of </option>
// </select>
// <select
//   onChange={this.updateOutput.bind(this)}
//   style={styles.select}
//   ref="pipelines">
//   <option value={"rejected comments"}> rejected comments </option>
// </select>
