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

  handleTypeChange(value, initializer) {
    console.log('handleTypeChange', value, initializer);
  }

  handleFieldChange(value, initializer) {
    console.log('handleFieldChange', value, initializer);
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

    console.log('ExplorerControls', this.props);

    return (
      <Paper style={styles.base}>
        <Select
            name="types"
            options={this.props.pipelines.map(pipe => {
              return {label: pipe, value: pipe};
            })}
            onChange={this.handleTypeChange.bind(this)}
        />
        {/*<Select
          name="fields"
          options={fieldOptions.comment}
          onChange={this.handleFieldChange.bind(this)}
          multi={true} />*/}
        <p>Date Range</p>
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
