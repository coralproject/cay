import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { fetchDataExplorationDataset, populateControlsReducer } from '../actions';
import Page from './Page';
import Card from '../components/cards/Card';
import DataExplorerVisualization from '../components/DataExplorerVisualization';
import ExplorerControls from '../components/DataExplorerControls';
import moment from 'moment';
import _ from "lodash";

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(populateControlsReducer());
  }

  controlsUpdatedGoGetDataset(pipeline, dateRange) {
    this.props.dispatch(fetchDataExplorationDataset(pipeline, dateRange));
  }


  parseTopCommentersByCount() {
    const victoryFormat = this.props.dataset.map((item) => {
      return {
        x: item._id.user_id + '' , // hack - cast to string for now for graph spacing
        y: item.comments
      };
    });
    return victoryFormat;
  }

  contemplate() {

    /*
      at this point we know we have data, but we don't know what's in it.
      expect this function to grow as the possibilities do...
      we'll continually refactor this out to make it more general
      but this is hard at this point (1/26) because we don't know what the possibilities are
      for the 1/28 deadline, it will not be very abstract, checking pipeline names and such
    */

    let visualization;
    let parsedDataset;
    let independentVariableName;
    let dependentVariableName;

    /* detect time series */
    if (this.props.dataset[0].start) {
      parsedDataset = this.props.dataset.map((item, i) => {
        return {
          x: new Date(item.start * 1000),
          y: item.data[this.state.data_object_level_1_key_selection]
        };
      });

      dependentVariableName = this.state.data_object_level_1_key_selection ?
        this.state.data_object_level_1_key_selection.replace(/_/g, ' ') : "";
      independentVariableName = ""; /* time is self labeling */

      visualization = (
        <DataExplorerVisualization
          independentVariableName={independentVariableName}
          dependentVariableName={dependentVariableName}
          dataset={parsedDataset}/>
      )
    } else /*  assume catagorical  */ {
      console.log("assuming categorical data because of lack of timestamp")
    }

    return visualization;

  }

  // we don't want to request 10000 hourly intervals,
  // so compute resonable bin size
  getSensibleInterval(start, end) {
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    let diff = end - start;

    if (diff / hour < 300) {
      return 'hour';
    } else if (diff / day < 300) {
      return 'day';
    } else if (diff / day < 300) {
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
      data_object_level_1_key_selection: values.data_object_level_1_key_selection
    })
  }

  render() {
    return (
      <Page style={styles.base}>
        <h1>Data Explorer</h1>
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
          <Card style={styles.pane}>

          </Card>
        </div>
          {
            this.props.dataset ?
              this.contemplate() :
              "Welcome to data exploration! Let's get started by selecting a pipeline from the dropdown above."
          }
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  base: {
    padding: 10
  },
  controls: {
    display: 'flex'
  },
  pane: {
    flex: 1
  }
};
