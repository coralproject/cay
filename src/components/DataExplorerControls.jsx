import React from 'react';
import Radium from 'radium';
import Slider from '../components/Slider';
import Paper from '../components/Paper';
import DateTime from '../components/utils/DateTime';

@Radium
class ExplorerControls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

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

    const pipeline = this.refs.pipelines.value;

    let dateRange;

    if (this.props.dataset) {
      // the range the user selected - send it to the server and store it in state
      dateRange = this.refs.dateRange.getValue();
      this.setState({
        selectedStart: new Date(this.refs.dateRange.getValue()[0]).toString(),
        selectedEnd: new Date(this.refs.dateRange.getValue()[1]).toString()
      });
    } else {
      // init - the default range
      dateRange = [new Date(2013, 0, 1).getTime(), new Date().getTime()];
    }

    this.props.getControlValues({
      pipeline,
      dateRange
    });
  }

  handleNonActionControlChange() {
    const data_object_level_1_key_selection = this.refs.data_object_level_1_key_selection.value;

    this.props.getNonActionFiringControlValues({
      data_object_level_1_key_selection
    });
  }

  mapOptions(pipeline, i) {
    return (<option key={i} value={pipeline.name}>{pipeline.name.replace(/_/g, ' ')}</option>);
  }

  makeKeysOptions(obj) {
    const keyArray = Object.keys(obj);
    const options = keyArray.map((k, i) => {
      return (<option key={i} value={k}> {k.replace(/_/g, ' ')} </option>);
    });
    return options;
  }

  handlePipelineCreationStartClick () {
    this.setState({pipelineCreationMode: true})

  }

  sliderInMotion() {
    // slider should get a tooltip with this information on it, rather than changing date range in controls
    this.setState({
      sliderInMotionMin: new Date(this.refs.dateRange.getValue()[0]).toString(),
      sliderInMotionMax: new Date(this.refs.dateRange.getValue()[1]).toString()
    });
  }

  render() {
    return (
      <Paper>
        <select
          onChange={this.handleControlChange.bind(this)}
          style={styles.select}
          ref="pipelines">
          <option value={"DEFAULT_VALUE"}> Select an existing question... </option>
          {this.props.pipelines.map(this.mapOptions)}
        </select>
        <span
          style={{
            margin: "0px 20px",
          }}
          > or </span>
        <button
        onClick={this.handlePipelineCreationStartClick.bind(this)}
        style={{
          border: 0,
          backgroundColor: "#F87F70",
          fontWeight: 500,
          borderRadius: 3,
          padding: "10px 10px",
          color: "white",
          cursor: "pointer"
        }}> + Ask a new question </button>
        {
          this.props.dataset && !this.state.pipelineCreationMode ?
          <div>
            <p>Date Range</p>
            <Slider
              ref="dateRange"
              min={this.props.rangeStart}
              max={this.props.rangeEnd}
              onChange={this.sliderInMotion.bind(this)}
              onAfterChange={this.handleControlChange.bind(this)}
              defaultValue={[this.props.rangeStart, this.props.rangeEnd]}
              orientation="horizontal"
              withBars />
            <p>
              Start Date:
              {new Date(this.state.selectedStart || this.props.rangeStart).toString()}
            </p>
            <p>
              End Date:
              {new Date(this.state.selectedEnd || this.props.rangeEnd).toString()}
            </p>
            <select
              onChange={this.handleNonActionControlChange.bind(this)}
              style={styles.select}
              ref="data_object_level_1_key_selection">
              <option value={"DEFAULT_VALUE"}> Select a field... </option>
              {this.makeKeysOptions(this.props.dataset[0].data)}
            </select>
          </div> : ''
        }
      </Paper>
    );
  }
}

var styles = {
  select: {
    marginRight: 10,
    cursor: 'pointer',
    fontSize: 16
  }
};

export default ExplorerControls;
