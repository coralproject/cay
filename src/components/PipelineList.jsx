import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import List from './lists/List';
import PipelineRow from './PipelineRow';
import Heading from './Heading';
import {Link} from 'react-router';

@Radium
class PipelineList extends React.Component {

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
              <PipelineRow
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

PipelineList.propTypes = {
  onPipelineClick: PropTypes.func.isRequired
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

export default PipelineList;
