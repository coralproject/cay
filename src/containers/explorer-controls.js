import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

// import our actions

import Slider from '../components/slider';
import Select from 'react-select';
import Paper from '../components/paper';

import DateTime from '../components/utils/date-time';

@connect(state => state.dataExplorer)
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

  logChange(value, initializer) {
    console.log(value, initializer);
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

  render() {

    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];

    return (
      <Paper style={styles.base}>
        <Select
            name="form-field-name"
            value="one"
            options={options}
            onChange={this.logChange.bind(this)}
        />
        <p>Here is a sweet slider</p>
        <Slider defaultValue={50} orientation="horizontal" withBars={true} />
        <p>another slider with two values</p>
        <Slider
          min={this.state.rangeStart}
          max={this.state.rangeEnd}
          onChange={this.changeDate.bind(this)}
          defaultValue={[this.state.rangeStart, this.state.rangeEnd]}
          orientation="horizontal"
          withBars />
          <p>Start Date: {this.formatDate(this.state.selectedStart)}</p>
          <p>End Date: {this.formatDate(this.state.selectedEnd)}</p>
      </Paper>
    );
  }
}

export default ExplorerControls;

var styles = {
  base: {

  }
};
