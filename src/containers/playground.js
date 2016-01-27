// Framework tools
import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

// Playground-specific imports
import Sidebar from '../components/playground/Sidebar';
import Customizer from '../components/playground/Customizer';
import Preview from '../components/playground/Preview';
import Wizard from '../components/playground/Wizard';

// Playground CSS
require('../../css/playground.css');
require('../../fonts/playground/coral-icon-font.css');

@connect(state => state.playground)
@Radium
class Playground extends React.Component {

  onWizardClick() {
    this.setState({ wizardIsOpen: !this.state.wizardIsOpen });
  }

  hideWizard() {
    this.setState({ wizardIsOpen: false }); 
  }

  render() {

    var wizard = this.state.wizardIsOpen ? 
      <div style={ styles.wizardOverlay } onClick={ this.hideWizard.bind(this) }>
        <Wizard hideWizard={ this.hideWizard.bind(this) } />
      </div>
      : null;

    return (
      <div>
        <div style={ [ styles.playGround, this.state.wizardIsOpen ? styles.blurred : '' ] }>

          <img src="http://coralproject.github.io/design/img/logos/coralWordMark-1.5.png" style={ styles.logo } />
          
          <div style={ styles.heading }>

            <h1 style={ styles.headingTitle }>Playground</h1>

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

              <button style={ styles.wizardButton } onClick={ this.onWizardClick.bind(this) }>Use the Wizard</button>

            </div>

          </div>

          <Customizer />
          <Preview />

          Medal, Trophy and Badge icons by Zlatko Najdenovski from the Noun Project

          <Sidebar />

        </div>

        { wizard }

      </div>
    );
  }
}

// same as the @connect decorator above
export default Playground;

const styles = {
  playGround: {
    margin: 'auto',
    transition: 'filter 1s',
    fontFamily: 'Fira Sans'
  },
  heading: {
    padding: '50px 350px 50px 50px'
  },
  headingTitle: {
    fontFamily: 'Josefin Slab',
    textTransform: 'uppercase',
    fontSize: '75px',
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  playgroundIntro: {
    fontSize: '14pt',
    color: 'white',
    lineHeight: '1.2',
    padding: '20px',
    margin: '20px',
    textAlign: 'center',
    fontFamily: 'Fira Sans'
  },
  playgroundIntroText: {
    fontSize: '12pt',
    fontFamily: 'Fira Sans'
  },
  wizardButton: {
    color: '#F77260',
    border: 'none',
    borderRadius: '5px',
    padding: '20px',
    display: 'block',
    margin: '20px auto',
    fontFamily: 'Fira Sans',
    fontWeight: 'bold',
    fontSize: '16pt',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  logo: {
    width: '400px',
    margin: '40px 50px'
  },
  blurred: {
    filter: 'blur(8px)',
    transition: 'filter 1s'
  },
  wizardOverlay: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '9000'
  }
};
