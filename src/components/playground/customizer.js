import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

// Settings
import settings from '../../settings';
import Icon from '../../components/icon';

import CustomizerToggle from "./customizerToggle";
import CustomizerSlider from "./customizerSlider";

import {showCustomizer, hideCustomizer} from "../../actions/playground";

@connect(state => state.playground)
@Radium
class Customizer extends React.Component {

  onCustomizerTogglerClick() {
  	if (this.props.customizerIsVisible) {
  		this.props.dispatch(hideCustomizer())
  	} else {
  		this.props.dispatch(showCustomizer())
  	}
  }

  render() {

    return (
    	<div>
	    	<div style={ styles.customizeToggler } onClick={ this.onCustomizerTogglerClick.bind(this) }>
	    		<h2 style={ styles.customizeTogglerTitle }>
	    			<Icon size="large" name="fa-cog" />
	    			Customize
	    		</h2>
	    		<button style={ styles.customizeTogglerButton }><Icon size="medium" name="fa-caret-down" /></button>
	    	</div>
	    	<div style={ [ styles.customizerContent.base, this.props.customizerIsVisible ? styles.customizerContent.visible : styles.customizerContent.hidden ] }>
	    		<CustomizerToggle />
	    		<CustomizerSlider />
	    	</div>
        </div>
    );

  }
}

// same as the @connect decorator above
export default Customizer;


var styles = {
	customizeToggler: {
		padding: "30px",
		borderBottom: "1px solid " + settings.lightGrey,
		position: "relative",
		fontSize: "16pt",
		cursor: "pointer"
	},
	customizeTogglerButton: {
		position: "absolute",
		top: "30px",
		right: "30px",
		background: "none",
		border: "none",
		padding: "0",
		margin: "0"
	},
	customizeTogglerTitle: {
		fontSize: "24pt"
	},
	customizerContent: {
		hidden: {
			display: "none"
		},
		visible: {
			display: "block"
		}
	}

}