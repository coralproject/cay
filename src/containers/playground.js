// Framework tools
import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

// Settings
import settings from '../settings';

// Playground-specific imports
import Sidebar from '../components/playground/sidebar';
import Customizer from '../components/playground/customizer';
import Preview from '../components/playground/preview';

// Global CSS
require('../../css/reset.css');
require('../../css/global.css');
require('../../css/playground.css');
require('../../fonts/glyphicons-halflings-regular.woff');

@connect(state => state.data)
@Radium
class Playground extends React.Component {

  render() {

    return (
        <div style={ styles.playGround }>
          
          <div style={ styles.heading }>

            <h1 style={ styles.headingTitle }>The Playground</h1>

            <div style={ styles.playgroundIntro }>

              <p style={ styles.playgroundIntroText }>
                What does an ideal commenting system looks like to you?<br />
                <br />
                Use the controls to tweak the UI and explore how it affects the comment box and the stream. You can also try the features on the comment box and the stream itself. <br />
                <br />
                Learn about online comments and the issues they are facing, <br />
                through the contextual sidebar.<br />
                <br />
                Share your thoughts on the problems addressed by each solution.
              </p>

              <button style={ styles.wizardButton }>Use the Wizard</button>

            </div>

          </div>

          <Customizer />
          <Preview />
          <Sidebar />

        </div>
    );
  }
}

// same as the @connect decorator above
export default Playground;

const styles = {
  playGround: {
    maxWidth: "800px"
  },
  heading: {
    padding: "40px"
  },
  headingTitle: {
    fontSize: "30pt",
    fontWeight: "bold",
    color: settings.coralPink,
    textAlign: "center"
  },
  playgroundIntro: {
    fontSize: "14pt",
    color: "white",
    lineHeight: "1.2",
    backgroundColor: "rgba(0,0,0,.8)",
    padding: "20px",
    margin: "20px",
    textAlign: "center"
  },
  playgroundIntroText: {
    fontSize: "12pt"
  },
  wizardButton: {
    backgroundColor: settings.coralPink,
    border: "none",
    borderRadius: "5px",
    padding: "20px",
    display: "block",
    margin: "20px auto",
    fontWeight: "bold",
    fontSize: "16pt",
    color: "white",
    cursor: "pointer"
  }
};
