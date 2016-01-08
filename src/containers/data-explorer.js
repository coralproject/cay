import React from "react";
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";
import settings from '../settings';
import { fetchDataExplorationDataset } from '../actions';
import Page from './page';
import DataExplorerVisualization from "../components/data-explorer-visualization";

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchDataExplorationDataset("top_commenters_by_count", null));
    // this.props.dispatch(fetchDataExplorationDataset("comments_per_day", {
    //   start_date: "2014-01-01",
    //   end_date: "2015-01-01"
    // }))
    // field was top_commenters_by_count w/ no query string
    // http://localhost:4000/comments_per_day/exec?start_date=2014-01-01&end_date=2015-01-01
  }

  parseDataFromXenia() {

    const victoryFormat = this.props.dataset.map((item) => {
      return {
        x: item._id.user_id + "" , // hack - cast to string for now for spacing
        y: item.comments
      };
    });
    return victoryFormat;
  }

  render() {
    return (
      <Page>
        <h1>Data Explorer</h1>
          {
            this.props.dataset ?
              <DataExplorerVisualization dataset={this.parseDataFromXenia.call(this)}/> :
              "Spinner"
          }
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  background: settings.coralPink
};
