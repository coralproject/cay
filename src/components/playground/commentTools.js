import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class CommentTools extends React.Component {

  render() {

    return (
        <div style={ styles.commentTools }>
            <div key="ignore" style={ styles.commentToolsOption }>
                Ignore User
            </div>
            <div key="report" style={ styles.commentToolsOption }>
                Report
            </div>
            <div key="react" style={ styles.commentToolsOption }>
                React...
            </div>
            <div key="reply" style={ styles.commentToolsOption }>
                Reply
            </div>
            <div key="share" style={ styles.commentToolsOption }>
                Share
            </div>
        </div>
    );

  }
}

// same as the @connect decorator above
export default CommentTools;

var styles = {
    commentTools: {
        height: "60px",
        display: "table",
        background: settings.lightGrey,
        lineHeight: "60px",
        width: "100%",
        margin: "0"
    },
    commentToolsOption: {
        display: "table-cell",
        width: "20%",
        margin: "0",
        padding: "0",
        textAlign: "center",
        cursor: "pointer",
        fontWeight: "bold",
        ":hover": {
            background: settings.coralPink,
            color: "white"
        }
    }
};