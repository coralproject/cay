import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import settings from '../settings';

import {fetchPipeline} from '../actions';

import List from './lists/List';
import PipelineRow from './PipelineRow';
import Heading from './Heading';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
class PipelineList extends React.Component {

  loadUsers(pipeline) {
    console.log('loadUsers');
    this.props.dispatch(fetchPipeline(pipeline.name));
  }

  render() {
    const {style, ...other} = this.props;

    return (

      <List style={[styles.base, style]}>
        <Heading size="small" style={styles.heading}>
           { window.L.t("Pipeline List") }
        </Heading>

        {
          this.props.pipelines.map((pipeline, i) => {
            return (
              <PipelineRow
                onClick={this.loadUsers.bind(this, pipeline)}
                pipeline={pipeline}
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
