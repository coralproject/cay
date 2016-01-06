import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

import CommentBox from './commentBox';
import Stream from './stream';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  render() {

    return (
    	<div>
	    	<div>
	    		<h2>Preview</h2>
	    		<button>Toggle</button>
	    	</div>
    		<p style={ styles.sandBoxIntro }>This is a sandbox only, this preview will be reset every time you reload the page.</p>
    		<CommentBox />
    		<Stream />
	    </div>
    );

  }
}

// same as the @connect decorator above
export default Preview;

var styles = {
	sandboxIntro: {
		padding: "20px",
		color: settings.lighterGrey
	}
}
