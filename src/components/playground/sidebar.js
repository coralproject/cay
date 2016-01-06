import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class Sidebar extends React.Component {

  render() {

    return (
    	<div style={ styles.sideBar }>
        	<h2>The Sidebar</h2>
        </div>
    );

  }
}

// same as the @connect decorator above
export default Sidebar;

var styles = {
	sideBar: {
		position: "fixed",
		right: "300px",
		top: "0px",
		height: "100%",
		width: "300px",
		backgroundColor: settings.darkerGrey,
		zIndex: "15000"
	}
}
