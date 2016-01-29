import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { fetchDataExplorationDataset, populateControlsReducer } from '../actions';
import Page from './Page';
import Card from '../components/cards/Card';
import DataExplorerVisualization from '../components/DataExplorerVisualization';
import ExplorerControls from '../components/DataExplorerControls';
<<<<<<< HEAD
// import ExplorerTutorial from '../components/DataExplorerTutorials';
=======
import ExplorerTutorial from '../components/DataExplorerTutorial';
import moment from 'moment';
import _ from 'lodash';
import PipelineCreator from '../components/PipelineCreator';
>>>>>>> stubbing out pipeline creation

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(populateControlsReducer());
  }

  controlsUpdatedGoGetDataset(pipeline, dateRange) {
    this.props.dispatch(fetchDataExplorationDataset(pipeline, dateRange));
  }



  // we don't want to request 10000 hourly intervals,
  // so compute resonable bin size
  getSensibleInterval(start, end) {
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    let diff = end - start;

    if (diff / day < 300) {
      return 'day';
    } else if (diff / week < 300) {
      return 'week';
    } else {
      return 'month';
    }
  }

  getControlValues(values) {
    const startDate = values.dateRange[0];
    const endDate = values.dateRange[1];

    this.controlsUpdatedGoGetDataset(values.pipeline, {
      start: Math.floor(startDate / 1000),
      end: Math.floor(endDate / 1000),
      duration: this.getSensibleInterval(startDate, endDate),
      target: 'total'
    });
  }

  getNonActionFiringControlValues(values) {
    this.setState({
      field: values.data_object_level_1_key_selection
    });
  }

  render() {
    return (
      <Page style={styles.base}>
        <p style={styles.heading}>Data Explorer</p>
        <div style={styles.controls}>
          <Card style={styles.pane}>
            <ExplorerControls
              dataset={this.props.dataset}
              rangeStart={this.props.pipelineRangeStart}
              rangeEnd={this.props.pipelineRangeEnd}
              getNonActionFiringControlValues={this.getNonActionFiringControlValues.bind(this)}
              getControlValues={this.getControlValues.bind(this)}
              pipelines={this.props.pipelines} />
          </Card>
        </div>
        <Card>
          {
            this.props.dataset && this.state.field ?
              <DataExplorerVisualization
                dataset={this.props.dataset}
                field={this.state.field}/> :
              <ExplorerTutorial
                dataset={this.props.dataset}
                field={this.state.field}/>
          }
        </Card>
        <Card>
          <PipelineCreator/>
        </Card>
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  base: {
    padding: 10
  },
  heading: {
    fontSize: 36,
  }

};
