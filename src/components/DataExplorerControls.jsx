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
      dateRange = [new Date(2014, 0, 1).getTime(), new Date().getTime()];
    }


    this.props.getControlValues({
      pipeline,
      dateRange
    });
  }

  mapOptions(pipeline, i) {
    return (<option key={i} value={pipeline.name}>{pipeline.name}</option>);
  }

  render() {
    return (
      <Paper>
        <select
          onChange={this.handleControlChange.bind(this)}
          style={styles.select}
          ref="pipelines">
          {this.props.pipelines.map(this.mapOptions)}
        </select>
        <p> Dataset loaded: {this.props.dataset.toString()} </p>
        {
          this.props.dataset ?
          <div>
            <p>Date Range</p>
            <Slider
              ref="dateRange"
              min={this.props.rangeStart}
              max={this.props.rangeEnd}
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
