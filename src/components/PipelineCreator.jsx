import React from 'react';
import Radium from 'radium';
import {createPipelineValueChanged} from '../actions';

import Select from 'react-select';

@Radium
class PipelineCreator extends React.Component {
  handleCreatePipeline() {
    console.log(this.refs);
  }

  getTargets(target) {
    var targets = (target === 'author') ? this.props.authors : this.props.sections;

    return targets.map(t => {
      return {value: t, label: t};
    });
  }

  targetsSelected() {
    console.log('targetsSelected', ...arguments);
  }

  updateOutput() {

    var computedQuery = {
  "name": "custom_query",
  "desc": "Returns a time series of comments bounded by iso dates!  Totals or broken down by duration [day|week|month] and target type total|user|asset|author|section]",
  "pre_script": "",
  "pst_script": "",
  "params": [],
  "queries": [
    {
      "name": "custom_query",
      "type": "pipeline",
      "collection": "comment_timeseries",
      "commands": [
        {
          "$match": {
            "start_iso": {
              "$gte": "#date:2012-01-01"
            }
          }
        },
        {
          "$match": {
            "start_iso": {
              "$lt": "#date:2012-02-01"
            }
          }
        },
        {
          "$match": {
            "duration": "week"
          }
        },
        {
          "$match": {
            "target": "author"
          }
        },
        {"$match": {"target_doc": "Paul Krugman"}},
        {
          "$sort": {
            "start_iso": 1
          }
        }
      ],
      "return": true
    }
  ],
  "enabled": true
};

    this.props.dispatch(createPipelineValueChanged(computedQuery));
  }

  render() {

    console.log('PipelineCreator.render', this.props);

    return (
      <div>
        <p style={{marginBottom: 20}}>
          {"Create a new question"}
        </p>
        <select
          onChange={this.updateOutput.bind(this)}
          style={styles.select}
          ref="pipelines">
          <option value={"what_is"}> What is the </option>
          <option value={"compare"}> Compare </option>
        </select>
        <select
          onChange={this.updateOutput.bind(this)}
          style={styles.select}
          ref="pipelines">
          <option value={"number"}> number of </option>
          <option value={"ratio"}> ratio of </option>
        </select>
        <select
          onChange={this.updateOutput.bind(this)}
          style={styles.select}
          ref="pipelines">
          <option value={"compare"}> rejected comments </option>
        </select>
        <select
          onChange={this.updateOutput.bind(this)}
          style={styles.select}
          ref="pipelines">
          <option value={"author"}> for author </option>
          <option value={"section"}> for section </option>
        </select>

        <Select
          options={this.getTargets('author')}
          name="selected-targets"
          multi={true}
          onChange={this.targetsSelected} />

        <p>between</p>
        <input type="date" />
        <p>and</p>
        <input type="date" />
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
