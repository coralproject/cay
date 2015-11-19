import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import FilterRow from './filter-row';
import Header from './header';

@Radium
export default class FilterTable extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired
  }

  render() {
    const {style, ...other} = this.props;

    return (
      <List  style={[styles.base, style]}>
        <Header size="small" style={styles.header}>Filter List</Header>
        {this.props.filters.map((filter, i) => {
          return <FilterRow
            filter={filter}
            style={styles.row}
            {...other}
            id={i}
            key={i} />
        })}
      </List>
    );
  }
}

var styles = {
  base: {

  },
  header: {
    paddingLeft: 10
  },
  row: {

  }
}
