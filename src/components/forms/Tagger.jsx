import React, {PropTypes} from 'react';
import Radium from 'radium';
import Color from 'color';

@Radium
export default class Tagger extends React.Component {

  static propTypes = {
    type: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.array,
    tagList: PropTypes.array,
    freeform: PropTypes.bool
  }

  getDefaultProps() {
    return {
      tags: [],
      tagList: [],
      freeform: false 
    }
  }

  render() {

    return (
      <div style={ styles.outer }>
        Tagger
      </div>
    );
  }
}

const styles = {
  outer: {
    border: '1px solid red',
    padding: '20px'
  }
}