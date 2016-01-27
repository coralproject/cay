import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class ReactionTools extends React.Component {

  options = [
    { title: 'Smile' },
    { title: 'Cry' },
    { title: 'Sad' },
    { title: 'Angry' },
    { title: 'Confused' }
  ]

  render() {

    return (
      <div style={ styles.reactionTools } ref={(c) => this._reactionTools = c}>
      { 
        this.options.map((option, i) => { 
          return (
            <div key={ i } style={ styles.reactionToolsOption }>
              { option.title }
            </div>
          );
        })
      }
      </div>
    );

  }
}

// same as the @connect decorator above
export default ReactionTools;

var styles = {
  reactionTools: {
    height: '60px',
    display: 'table',
    background: '#ccc',
    lineHeight: '60px',
    width: '100%',
    margin: '0'
  },
  reactionToolsOption: {
    display: 'table-cell',
    width: '20%',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':hover': {
      background: '#F77260',
      color: 'white'
    }
  }
};
