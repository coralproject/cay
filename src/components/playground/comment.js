import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

import ProfileBadge from './profileBadge';
import CommentContent from './commentContent';
import StatsBar from './statsBar';

@connect(state => state.playground)
@Radium
class Comment extends React.Component {

  render() {

    return (
        <div style={ styles.comment }>
            <ProfileBadge />
            <CommentContent />
            <StatsBar />
        </div>
    );

  }
}

// same as the @connect decorator above
export default Comment;

var styles = {
    comment: {
    	borderBottom: "1px solid " + settings.lightGrey,
    	padding: "20px"   
    }
};