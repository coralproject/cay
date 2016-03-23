import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import { setToggler } from 'playground/PlaygroundActions';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class Wizard extends React.Component {

  componentWillMount() {
    this.setState({ currentStep: 0 });
  }

  onYesButtonClick(e) {
    e.stopPropagation();
    var currentStep = this.state.currentStep;
    this.props.dispatch(setToggler(this.props.wizardSteps[ currentStep ].affectedGroup, this.props.wizardSteps[ currentStep ].affectedToggler, true));
    currentStep++;
    if (currentStep >= this.props.wizardSteps.length) {
      this.props.hideWizard();
    } else {
      this.setState({ currentStep: currentStep });
    }
  }

  onNoButtonClick(e) {
    e.stopPropagation();
    var currentStep = this.state.currentStep;
    this.props.dispatch(setToggler(this.props.wizardSteps[ this.state.currentStep ].affectedGroup, this.props.wizardSteps[ this.state.currentStep ].affectedToggler, false));
    currentStep++;
    if (currentStep >= this.props.wizardSteps.length) {
      this.props.hideWizard();
    } else {
      this.setState({ currentStep: currentStep });
    }
  }

  render() {

    return (
      <div style={ styles.wizard } onClick={ (e) => e.stopPropagation() }>
        <p style={ styles.question }>{ this.props.wizardSteps[ this.state.currentStep ].content }</p>
        <button onClick={ this.onYesButtonClick.bind(this) } style={ styles.yesButton }>{ this.props.wizardSteps[ this.state.currentStep ].yesLabel }</button>
        <button onClick={ this.onNoButtonClick.bind(this) } style={ styles.noButton }>{ this.props.wizardSteps[ this.state.currentStep ].noLabel }</button>
      </div>
    );

  }
}

// same as the @connect decorator above
export default Wizard;

var styles = {
  question: {
    fontFamily: 'Fira Sans',
    fontSize: '20pt',
    color: '#3d3d3d',
    fontWeight: '700'
  },
  noButton: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    backgroundColor: '#999',
    fontFamily: 'Fira Sans',
    color: 'white',
    border: 'none',
    padding: '15px 20px',
    fontSize: '14pt',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  yesButton: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#35BE53',
    fontFamily: 'Fira Sans',
    color: 'white',
    border: 'none',
    padding: '15px 20px',
    fontSize: '14pt',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  wizard: {
    position: 'fixed',
    top: '150px',
    left: '50%',
    width: '700px',
    marginLeft: '-500px', // - (half of the wizard width) - (half the sidebar), not a magic number
    padding: '30px 30px 100px 30px',
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0 0 20px rgba(0,0,0,.5)',
    zIndex: '99999',
    borderRadius: '4px',
    [mediaQueries.tablet]: {
      width: '100%',
      left: '0px',
      top: '50px',
      marginLeft: '0px'
    }
  }
};
