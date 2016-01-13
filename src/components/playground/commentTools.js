import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';

import ReportingTool from './reportingTool';
import ReactionTools from './reactionTools';

@connect(state => state.playground)
@Radium
class CommentTools extends React.Component {

  options = [
    { title: 'Ignore User', key: 'ignore' },
    { title: 'Report', key: 'report' },
    { title: 'React...', key: 'react' },
    { title: 'Reply', key: 'reply' },
    { title: 'Share', key: 'share' }
  ]

  getTopOffset() {
    var viewportOffset = this._commentTools.getBoundingClientRect();
    return viewportOffset.top;
  }

  onOptionClick(optionKey) {
    switch (optionKey) {
   
    case 'report':
      this.setState({ reportingExpanded: !this.state.reportingExpanded, position: this.getTopOffset() });
      break;
    
    case 'react':
      this.setState({ reactionsExpanded: !this.state.reactionsExpanded });
      break;
    
    default:
      break;

    }
  }

  onOverlayClick(optionKey) {
    switch (optionKey) {
    case 'report':
      this.setState({ reportingExpanded: false });
      break;

    default:
      break;
    } 
  }

  render() {

    var reportingToolRender = this.state.reportingExpanded ? 
      <div style={ styles.reportingToolOverlay } onClick={ this.onOverlayClick.bind(this, 'report') }>
        <ReportingTool position={ this.state.position } /> 
      </div>
      : null;

    var reactions = this.state.reactionsExpanded ?
      <ReactionTools />
      : null;

    return (
      <div>
        <div style={ styles.commentTools } ref={(c) => this._commentTools = c}>
          { 
            this.options.map((option) => { 
              return (
                <div key={ option.key } style={ styles.commentToolsOption } onClick={ this.onOptionClick.bind(this, option.key) }>
                  { option.title }
                </div>
              );
            })
          }
          { reportingToolRender }
        </div>
        { reactions }
      </div>
      );

  }
}

// same as the @connect decorator above
export default CommentTools;

var styles = {
  commentTools: {
    height: '60px',
    display: 'table',
    background: settings.lightGrey,
    lineHeight: '60px',
    width: '100%',
    margin: '0'
  },
  commentToolsOption: {
    display: 'table-cell',
    width: '20%',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':hover': {
      background: settings.coralPink,
      color: 'white'
    }
  },
  reportingToolOverlay: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.75)',
    zIndex: '9000'
  }
};
