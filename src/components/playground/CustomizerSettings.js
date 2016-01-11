import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

// Settings
import settings from '../../settings';

import CustomizerToggle from "./customizerToggle";
import CustomizerSlider from "./customizerSlider";

@connect(state => state.playground)
@Radium
class CustomizerSettings extends React.Component {

  render() {

    return (
    	<div>
    		{
    		  this.props.togglerGroups.map((togglerGroup, g) => {
	            return (
	            	<div style={ styles.toggleGroup } key={ g }>
		            	<h2 style={ styles.toggleGroupHeader }>{ togglerGroup.name }</h2>
		            	{ 
		            		togglerGroup.togglers.map((toggler, t) => { 
			            		return (
		            				<CustomizerToggle 
		            					groupIndex={ g } 
		            					togglerIndex={ t } 
		            					toggler={ toggler }
		            					key={ t } />
			            		)
		            		})
		            	}
		            	<div style={ styles.clearBoth }></div>
	            	</div>
	            )
	          })
    		}
    		<div style={ styles.clearBoth }></div>
    	</div>
    );

  }
}

// same as the @connect decorator above
export default CustomizerSettings;

var styles = {
	toggleGroup: {
		padding: "30px"
	},
	toggleGroupHeader: {
		fontSize: "11pt",
		color: settings.grey,
		textTransform: "uppercase",
		marginBottom: "30px",
	},
	clearBoth: {
		"clear": "both"
	}
}
