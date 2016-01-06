import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class StatsBar extends React.Component {

  render() {

    return (
        <div style={ styles.statsBar }>
            44 Likes
        </div>
    );

  }
}

// same as the @connect decorator above
export default StatsBar;

var styles = {
    statsBar: {
    	padding: "20px",
        fontSize: "12pt"
    }
};