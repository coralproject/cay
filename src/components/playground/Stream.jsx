import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Comment from './Comment';

@connect(state => state.playground)
@Radium
class Stream extends React.Component {

  getComments(comments, depth = 0, parentIndex = false, parents = []) {
    var parents = parents;
    return comments.map((comment, i) => { 
      return (
        <div style={ depth > 0 ? { marginLeft: '25px' } : null }>
          <Comment {...comment} key={ i } index={ i } depth={ depth } parents={ parents.concat([i]) } />
          {
            this.props.togglerGroups.stream.togglers.replies.status && comment.replies ? 
              this.getComments(comment.replies, depth + 1, i, parents.concat([i]))
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