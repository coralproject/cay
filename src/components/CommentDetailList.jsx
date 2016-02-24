import React from 'react';
import Radium from 'radium';

import CommentDetail from './CommentDetail';

@Radium
export default class CommentDetailList extends React.Component {

  showComments(comments) {
    console.log('showComments', comments);
    if (comments && !comments.length) {
      return 'There are no comments.';
    } else {
      return comments.map(comment => {
        return (<CommentDetail user={this.props.user} comment={comment} />);
      });
    }
  }

  render() {
    return (
      <div>
        {this.showComments(this.props.comments)}
      </div>
    );
  }
}
