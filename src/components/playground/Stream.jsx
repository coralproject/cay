import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Comment from './Comment';

@connect(state => state.playground)
@Radium
class Stream extends React.Component {

  render() {

    return (
      <div style={ styles.stream }>
      { 
        this.props.comments.map((comment, i) => { 
          return (
            <Comment {...comment} key={ i } index={ i } />
          );
        })
      }
      </div>
      );

  }
}

// same as the @connect decorator above
export default Stream;

var styles = {
  stream: {
  }
};