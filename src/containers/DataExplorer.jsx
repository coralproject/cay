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
    // initialize with some data - we will decide what to set as default later
    // this.controlsUpdatedGoGetDataset('comments_per_day', {
    //   start_date: '2014-01-01',
    //   end_date: '2015-01-01'
    // })
  }

  controlsUpdatedGoGetDataset(pipeline, dateRange) {
    console.log('inside', pipeline, dateRange);
    this.props.dispatch(fetchDataExplorationDataset(pipeline, dateRange));

    // this.props.dispatch(fetchDataExplorationDataset('top_commenters_by_count', null));
  }

  parseCommentsPerDay() {
    const victoryFormat = this.props.dataset.map((item, i) => {
      return {
        x: new Date(2016, 0, i),
        y: item.comments
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

  getControlValues(values) {
    const startDate = moment(values.dateRange[0]);
    const endDate = moment(values.dateRange[1]);

    this.controlsUpdatedGoGetDataset(values.pipeline, {
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD')
    });
  }

  render() {
    return (
      <Page style={styles.base}>
        <h1>Data Explorer</h1>
        <div style={styles.controls}>
          <Card style={styles.pane}>
            <ExplorerControls
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
