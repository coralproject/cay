import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/list';
import FilterRow from './filter-row';
import Heading from './heading';
import {Link} from 'react-router';

class FilterList extends React.Component {

  render() {
    const {style, ...other} = this.props;

    return (

      <List style={[styles.base, style]}>
        <Heading size="small" style={styles.heading}>
          Filter List
        </Heading>

        {
          this.props.filters.map((filter, i) => {
            return (
              <FilterRow
                filter={filter}
                style={styles.row}
                {...other}
                id={i}
                key={i}
                active={(this.props.active == i)} />
            );
          })
        }
      </List>
    );
  }
}

FilterList.propTypes = {
  onFilterClick: PropTypes.func.isRequired
};

const styles = {
  base: {

  },
  heading: {
    paddingLeft: 10
  },
  row: {

  }
};

export default Radium(FilterList);
