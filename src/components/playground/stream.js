import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

import Comment from './comment';

@connect(state => state.playground)
@Radium
class Stream extends React.Component {

  render() {

    return (
        <div style={ styles.stream }>
            <Comment />
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