import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CustomizerSettings from './CustomizerSettings';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class Customizer extends React.Component {

  onCustomizerTogglerClick() {
    this.setState({ settingsExpanded: !this.state.settingsExpanded });
  }

  render() {

    var customizerSettings = this.state.settingsExpanded ? <CustomizerSettings /> : null;

    return (
      <div style={ styles.customizer }>
        <div style={ styles.customizeToggler } onClick={ this.onCustomizerTogglerClick.bind(this) }>
          <h2 style={ styles.customizeTogglerTitle }>
            <span style={ styles.customizeTogglerTitleSpan }>Customize</span>
          </h2>
        </div>
        <CustomizerSettings />
      </div>
    );

  }
}

// same as the @connect decorator above
export default Customizer;


var styles = {
  customizer: {
    padding: '40px 40px 200px 40px',
    background: '#F1EBE0',
    color: '#3d3d3d',
    [mediaQueries.tablet]: {
      padding: '20px'
    }
  },
  customizerIcon: {
    marginTop: '-10px',
    marginRight: '5px'
  },
  customizeToggler: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    position: 'relative',
    fontSize: '16pt',
    cursor: 'pointer'
  },
  customizeTogglerButton: {
    position: 'absolute',
    top: '5px',
    right: '0px',
    background: 'none',
    border: 'none',
    padding: '0',
    margin: '0'
  },
  customizeTogglerTitleSpan: {
    fontSize: '24pt',
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    textTransform: 'uppercase'
  },
  cogIcon: {
    fontSize: '24pt',
    marginRight: '10px'
  }

};
