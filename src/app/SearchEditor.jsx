import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import {fetchSearchForEdit} from 'search/SearchActions';

import Page from 'app/layout/Page';

const mapStateToProps = state => {
  return {
    searches: state.searches,
    filters: state.filters
  };
};

@connect(mapStateToProps)
@Radium
export default class SearchEditor extends React.Component {

  componentWillMount() {
    console.log('params!', this.props.params);
    this.props.dispatch(fetchSearchForEdit(this.props.params.id));
  }

  render() {
    return (
      <Page>
        <div>SearchEditor</div>
        {
          this.props.searches.editableSearchLoading ?
          <p>Loading Saved Search...</p> :
          <p>Search: {this.props.searches.editableSearch.name}</p>
        }
      </Page>
    );
  }
}
