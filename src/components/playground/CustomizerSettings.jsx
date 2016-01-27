import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CustomizerToggle from './CustomizerToggle';
//import CustomizerSlider from './customizerSlider';

@connect(state => state.playground)
@Radium
class CustomizerSettings extends React.Component {

  render() {

    return (
      <div>
        {
          Object.keys(this.props.togglerGroups).map((togglerGroupIndex, gIndex) => {
            return (
              <div style={ styles.toggleGroup } key={ gIndex }>
                <h2 style={ styles.toggleGroupHeader }>{ this.props.togglerGroups[togglerGroupIndex].name }</h2>
                { 
                  Object.keys(this.props.togglerGroups[togglerGroupIndex].togglers).map((togglerKey) => { 
                    return (
                      <CustomizerToggle 
                        groupIndex={ togglerGroupIndex } 
                        togglerIndex={ togglerKey } 
                        toggler={ this.props.togglerGroups[togglerGroupIndex].togglers[togglerKey] }
                        key={ togglerKey } />
                    );
                  })
                }
                <div style={ styles.clearBoth }></div>
              </div>
            );
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
    padding: '30px 0'
  },
  toggleGroupHeader: {
    fontSize: '11pt',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: '20px',
    fontFamily: 'Fira Sans'
  },
  clearBoth: {
    'clear': 'both'
  }
};
