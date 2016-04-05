import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import ReportingTool from './ReportingTool';
import ReactionTools from './ReactionTools';

import mediaQueries from '../../playgroundSettings';
import { deleteComment, blockUser } from 'playground/playgroundActions';

@connect(state => state.playground)
@Radium
class CommentTools extends React.Component {

  options = [
    { title: 'Block', key: 'block' },
    { title: 'Report', key: 'report' },
    { title: 'Delete', key: 'delete' },
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

  blockClickHandler(user) {
    this.props.dispatch(blockUser(user));
  }

  deleteClickHandler(index, parents) {
    this.props.dispatch(deleteComment(index, parents));
  }

  render() {

    var reportingToolRender = this.state.reportingExpanded ? 
      <div style={ styles.reportingToolOverlay } onClick={ this.onOverlayClick.bind(this, 'report') }>
        <ReportingTool position={ this.state.position } /> 
      </div>
      : null;

    var reactions = this.state.reactionsExpanded && this.props.togglerGroups['interaction'].togglers['reactions'].status ?
      <ReactionTools />
      : null;

    return (
      <div>
        <div style={ styles.commentTools } ref={(c) => this._commentTools = c}>
          { 
            this.props.togglerGroups['moderation'].togglers['muting'].status ? 
              <div key="block" style={ styles.commentToolsOption } onClick={ this.blockClickHandler.bind(this, this.props.user) }>
                Block User
              </div>
            : 
              null 
          }
          <div key="report" style={ styles.commentToolsOption } onClick={ this.onOptionClick.bind(this, 'report') }>
            Report
          </div>
          {
            this.props.togglerGroups['reputation'].togglers['privileges'].status ?
              <div key="delete" style={ styles.commentToolsOption } onClick={ this.deleteClickHandler.bind(this, this.props.index, this.props.parents) }>
                Delete
              </div>
            : 
              null
          }
          <div key="share" style={ styles.commentToolsOption } onClick={ this.onOptionClick.bind(this, 'share') }>
            Share
          </div>
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
    position: 'absolute',
    width: '200px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 8px #888',
    borderRadius: '5px',
    background: '#fafafa',
    lineHeight: '1',
    margin: '0',
    right: '0',
    top: '50px',
    zIndex: '99999'
  },
  commentToolsOption: {
    margin: '0',
    padding: '15px',
    textAlign: 'left',
    cursor: 'pointer',
    ':hover': {
      background: '#F77260',
      color: 'white'
    },
    [mediaQueries.tablet]: {
      display: 'block',
      padding: '0 10px',
      width: '100%',
      textAlign: 'left',
      borderBottom: '1px solid #ddd'
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
