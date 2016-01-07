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
class CustomizerSettings extends React.Component {

  render() {

    return (
    	<div>
    		<CustomizerToggle />
    		<CustomizerSlider />
    	</div>
    );

  }
}

// same as the @connect decorator above
export default CustomizerSettings;
