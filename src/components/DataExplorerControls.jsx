import React from 'react';
import Radium from 'radium';

// import our actions
import Slider from '../components/Slider';
import Select from 'react-select';
import Paper from '../components/Paper';

import DateTime from '../components/utils/DateTime';

@Radium
class ExplorerControls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rangeStart: new Date(2014, 0, 1).getTime(),
      rangeEnd: new Date().getTime(),
      selectedStart: new Date(2014, 0, 1).toString(),
      selectedEnd: new Date().toString()
    };
  }

  formatDate(date) {
    return DateTime.format(new Date(date));
  }

  changeDate(values) {
    console.log('changeDate', ...arguments);
    const start = new Date(values[0]);
    const end = new Date(values[1]);

    this.setState({
      selectedStart: start.toString(),
      selectedEnd: end.toString()
    });
  }

  handleControlChange() {
    this.setState({
      selectedStart: new Date(this.refs.dateRange.getValue()[0]).toString(),
      selectedEnd: new Date(this.refs.dateRange.getValue()[1]).toString()
    })

    const pipeline = this.refs.pipelines.value;
    const dateRange = this.refs.dateRange.getValue()

    this.props.getControlValues({
      pipeline,
      dateRange
    })
  }

  render() {
    return (
      <Paper style={styles.base}>
        <select
          onChange={this.handleControlChange.bind(this)}
          style={{
            marginRight: 10,
            cursor: "pointer",
            fontSize: 16,

          }}
          ref="pipelines">
          {
            this.props.pipelines.map((pipeline, i) => {
              return ( <option key={i} value={pipeline}> {pipeline} </option>)
            })
          }
        </select>
        <p>Date Range</p>
        <Slider
          ref="dateRange"
          min={this.state.rangeStart}
          max={this.state.rangeEnd}
          onChange={this.handleControlChange.bind(this)}
          defaultValue={[this.state.rangeStart, this.state.rangeEnd]}
          orientation="horizontal"
          withBars />
          <p>
            Start Date:
            {this.state.selectedStart}
          </p>
          <p>
            End Date:
            {this.state.selectedEnd}
          </p>
      </Paper>
    );
  }
}

export default ExplorerControls;

var styles = {
  base: {

  }
};
