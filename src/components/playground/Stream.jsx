import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Comment from './Comment';

@connect(state => state.playground)
@Radium
class Stream extends React.Component {

  getComments(comments, depth = 0) {
    return comments.map((comment, i) => { 
      return (
        <div style={ { paddingLeft: (depth * 30) + 'px' } }>
          <Comment {...comment} key={ i } index={ i } />
          {
            comment.replies ? 
              this.getComments(comment.replies, depth + 1)
            : 
              null
          }
        </div>
      );
    })
  }

  render() {

    return (
      <div style={ styles.stream }>
      { this.getComments(this.props.comments) }
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