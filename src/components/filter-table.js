import React from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import FilterRow from './filter-row';

@Radium
export default class FilterTable extends React.Component {

  render() {
    return (
      <List style={[this.props.style, styles.base]}>
        {this.props.filters.map((filter, i) => <FilterRow filter={filter} style={styles.row} onClick={this.props.onClick} key={i} /> )}
      </List>
    );
  }
}

var styles = {
  base: {

  },
  row: {

  }
}
