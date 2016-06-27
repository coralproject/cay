import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchDataExplorationDataset, populateControlsReducer} from 'explorer/DataExplorerActions';


import { fetchAuthors, fetchSections } from 'filters/FiltersActions';
import Page from './Page';
import Card from '../components/cards/Card';
import DataExplorerVisualization from 'components/DataExplorerVisualization';
import ExplorerTutorial from 'components/DataExplorerTutorial';
import SearchFilters from 'search/SearchFilters';
import Flex from 'app/layout/Flex';
import _ from 'lodash';

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(populateControlsReducer());
    this.props.dispatch(fetchAuthors());
    this.props.dispatch(fetchSections());
  }

  controlsUpdatedGoGetDataset(queryset, dateRange) {
    this.props.dispatch(fetchDataExplorationDataset(queryset, dateRange));
  }

  // we don't want to request 10000 hourly intervals,
  // so compute resonable bin size
  getSensibleInterval(start, end) {
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const week = day * 7;
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

    this.controlsUpdatedGoGetDataset(values.queryset, {
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

  getVisLabel(targetDoc) {
    if (_.isString(targetDoc)) return targetDoc;

    if (_.isObject(targetDoc) && _.has(targetDoc, 'user_name')) return 'Users';

    return '';
  }

  render() {
    if (_.has(this, 'props.dataset.0')) {
      console.log('DataExplorer.render', this.props.dataset[0].target_doc);
    }

    return (
      <Page style={styles.base}>
        <p style={styles.heading}>Data Explorer</p>
        <div style={styles.controls}>
          <Card style={styles.pane}>
            {/*<ExplorerControls
              dataset={this.props.dataset}
              rangeStart={this.props.querysetRangeStart}
              rangeEnd={this.props.querysetRangeEnd}
              getNonActionFiringControlValues={this.getNonActionFiringControlValues.bind(this)}
              getControlValues={this.getControlValues.bind(this)}
              querysets={this.props.querysets} />*/}
            <SearchFilters
              authors={this.props.authors}
              sections={this.props.sections}
              dispatch={this.props.dispatch} />
          </Card>
        </div>
        <Card>
          <Flex>
            <p> {this.props.loading ? 'Loading...' : ''} </p>
          </Flex>
          <Flex>
            <p style={{fontSize: 24}}>
              {
                /* show author name if data and name and not loading new data */
                _.has(this, 'props.dataset.0.target_doc') && !this.props.loading ?
                  this.getVisLabel(this.props.dataset[0].target_doc) :
                  ''
              }
            </p>
          </Flex>
          {
            /* render visualization if data and not loading new data*/
            !this.props.loading && _.has(this, 'props.dataset.0') ?
              <DataExplorerVisualization
                dataset={this.props.dataset}
                field={'comments'} /> : ''
          }
          {
            /* show tutorial if no data and no loading - condition occurs at outset*/
            !_.has(this, 'props.dataset.0') && !this.props.loading ?
              <ExplorerTutorial
                dataset={this.props.dataset}
                field={this.state.field} /> : ''
          }
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
    fontSize: 36
  }

};
