import React from 'react';
import Radium from 'radium';

import CommentDetail from 'comments/CommentDetail';

@Radium
export default class CommentDetailList extends React.Component {

  showComments(comments) {
    // console.log('showComments', comments);
    if (comments && !comments.length) {
      return 'There are no comments.';
    } else {
      return comments.map((comment, i) => {
        return (<CommentDetail key={i} user={this.props.user} comment={comment} />);
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
