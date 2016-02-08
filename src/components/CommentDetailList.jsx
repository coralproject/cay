import React from 'react';
import Radium from 'radium';

@Radium
export default class CommentDetailList extends React.Component {
  render() {
    console.log('CommentDetailList.render', this.props);
    return (
      <div>CommentDetailList</div>
    );
  }
}
