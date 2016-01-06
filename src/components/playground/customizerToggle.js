import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

@connect(state => state.playground)
@Radium
class CustomizerToggle extends React.Component {

  render() {

    return (
    	<div>
    		<label>
                <input type="checkbox" /> Toggler Title
            </label>
    		<p>
                Toggler description
            </p>
    	</div>
    );

  }
}

// same as the @connect decorator above
export default CustomizerToggle;
