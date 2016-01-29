import React from 'react';
import Radium from 'radium';

@Radium
class PipelineCreator extends React.Component {
  handleCreatePipeline() {
    console.log(this.refs)
  }
  render() {
    return (
      <div>
        <p style={{marginBottom: 20}}>
          {"Create a new question"}
        </p>
        <select
          style={styles.select}
          ref="pipelines">
          <option value={"what_is"}> What is the </option>
          <option value={"compare"}> Compare </option>
        </select>
        <select
          style={styles.select}
          ref="pipelines">
          <option value={"number"}> number of </option>
          <option value={"ratio"}> ratio of </option>
        </select>
        <select
          style={styles.select}
          ref="pipelines">
          <option value={"accepted_comments"}> accepted comments </option>
          <option value={"compare"}> rejected comments </option>
        </select>
        <select
          style={styles.select}
          ref="pipelines">
          <option value={"author"}> for author </option>
          <option value={"section"}> for section </option>
        </select>
        <select
          style={styles.select}
          ref="pipelines">
          <option value={"krugman"}> Paul Krugman </option>
          <option value={"collins"}> Gail Collins </option>
        </select>
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
