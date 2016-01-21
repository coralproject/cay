import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { fetchDataExplorationDataset, populateControlsReducer } from '../actions';
import Page from './Page';
import Card from '../components/cards/Card';
import DataExplorerVisualization from '../components/DataExplorerVisualization';
import ExplorerControls from '../components/DataExplorerControls';
import moment from 'moment';

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(populateControlsReducer());

  }

  controlsUpdatedGoGetDataset(pipeline, dateRange) {
    this.props.dispatch(fetchDataExplorationDataset(pipeline, dateRange));
  }

  parseCommentsPerDay() {
    const victoryFormat = this.props.dataset.map((item, i) => {
      return {
        x: new Date(item.start * 1000),
        y: item.data.comments
      };
    });
    return victoryFormat;
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
    } else if (diff / week < 300) {
      return 'week';
    } else if (diff / day < 300) {
      return 'day';
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

  render() {
    return (
      <Page style={styles.base}>
        <h1>Data Explorer</h1>
        <div style={styles.controls}>
          <Card style={styles.pane}>
            <ExplorerControls
              dataset={this.props.dataset ? true : false}
              rangeStart={_.min(_.pluck(this.props.dataset, 'start')) * 1000}
              rangeEnd={_.max(_.pluck(this.props.dataset, 'start')) * 1000}
              getControlValues={this.getControlValues.bind(this)}
              pipelines={this.props.pipelines} />
          </Card>
          <Card style={styles.pane}>
            Spacer
          </Card>
        </div>
          {
            this.props.dataset ?
              <DataExplorerVisualization
                independentVariableName={'indVarName'}
                dependentVariableName={'depVarName'}
                dataset={this.parseCommentsPerDay.call(this)}/> :
              'Spinner'
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
