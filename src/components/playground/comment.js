import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

import ProfileBadge from './profileBadge';
import CommentContent from './commentContent';
import StatsBar from './statsBar';
import CommentTools from './commentTools';

@connect(state => state.playground)
@Radium
class Comment extends React.Component {

  onCommentContentClick() {
    this.setState({ toolsExpanded: !this.state.toolsExpanded });
  }

  render() {

    var commentTools = this.state.toolsExpanded ? <CommentTools /> : null;

    return (
        <div style={ styles.comment }>
            <ProfileBadge />
            <div onClick={ this.onCommentContentClick.bind(this) } style={ styles.commentContent }>
                <CommentContent />
            </div>
            <StatsBar />
            { commentTools }
        </div>
    );

  }
}

// same as the @connect decorator above
export default Comment;

var styles = {
    comment: {
    	borderBottom: "1px solid " + settings.grey,
    	padding: "20px 20px 20px 100px",
        position: "relative",
        minHeight: "100px"
    },
    commentContent: {
        cursor: "pointer"
    }
};