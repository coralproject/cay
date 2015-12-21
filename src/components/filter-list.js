import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import FilterRow from './filter-row';
import Heading from './heading';

@Radium
export default class FilterList extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired
  }

  render() {
    const {style, ...other} = this.props;

    return (
      <List  style={[styles.base, style]}>
        <Heading size="small" style={styles.heading}>Filter List</Heading>
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
  heading: {
    paddingLeft: 10
  },
  row: {

  }
}
