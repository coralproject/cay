import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class CommentBox extends React.Component {

  render() {

    return (
        <div style={ styles.commentBox }>
            <h3>Posting as <b>coolcat</b></h3>
            <div style={ styles.toolBar }>
                <button>B</button>
                <button>I</button>
                <button>Link</button>
                <button>Quote</button>
            </div>
            <div>
                <div style={ styles.commentBoxContent } contentEditable="true"></div>
            </div>
        </div>
    );

  }
}

// same as the @connect decorator above
export default CommentBox;

var styles = {
    toolBar: {
        backgroundColor: settings.lightGrey
    },
    commentBox: {
        backgroundColor: settings.coralPink,
        padding: "20px"
    },
    commentBoxContent: {
        backgroundColor: "white",
        padding: "20px"
    }
};