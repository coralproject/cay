import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { fetchDataExplorationDataset, populateControlsReducer } from '../actions';
import Page from './Page';
import DataExplorerVisualization from '../components/DataExplorerVisualization';
import ExplorerControls from './ExplorerControls';


@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(populateControlsReducer());

    // this.props.dispatch(fetchDataExplorationDataset('top_commenters_by_count', null));
    this.props.dispatch(fetchDataExplorationDataset('comments_per_day', {
      start_date: '2014-01-01',
      end_date: '2015-01-01'
    }));
  }

  parseCommentsPerDay() {
    const victoryFormat = this.props.dataset.map((item) => {
      const date = item._id;
      return {
        x: new Date(
          date.year,
          date.month,
          date.day
        ),
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

  render() {
    return (
      <Page>
        <h1>Data Explorer</h1>
        <ExplorerControls pipelines={this.props.pipelines} />
          {
            this.props.dataset ?
              <DataExplorerVisualization
                independentVariableName={"indVarName"}
                dependentVariableName={"depVarName"}
                dataset={this.parseCommentsPerDay.call(this)}/> :
              'Spinner'
          }
      </Page>
    );
  }
}

export default DataExplorer;
