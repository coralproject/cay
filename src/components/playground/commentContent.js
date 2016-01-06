import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class CommentContent extends React.Component {

  render() {

    return (
        <div style={ styles.commentContent }>
            Lorem ipsum dolor sit amet.
        </div>
    );

  }
}

// same as the @connect decorator above
export default CommentContent;

var styles = {
    commentContent: {
    	padding: "20px",
        fontSize: "12pt"
    }
};