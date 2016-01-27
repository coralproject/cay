import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../../components/Icon';

@connect(state => state.playground)
@Radium
class CommentBox extends React.Component {

  render() {

    var toolBar = this.props.togglerGroups['content'].togglers['rich_content'].status 
      || this.props.togglerGroups['content'].togglers['emoji'].status
      ?
      <div style={ styles.toolBar }>
          {  
            this.props.togglerGroups['content'].togglers['rich_content'].status ? 
              <span>
                <button style={ styles.toolBarButton }><Icon name="fa-bold" /></button>
                <button style={ styles.toolBarButton }><Icon name="fa-italic" /></button>
                <button style={ styles.toolBarButton }><Icon name="fa-link" /></button>
                <button style={ styles.toolBarButton }><Icon name="fa-quote-left" /></button>
              </span>
            : 
              ''
          }
          {  
            this.props.togglerGroups['content'].togglers['emoji'].status ? 
              <span>
                <button style={ styles.toolBarButton }><Icon name="fa-smile-o" /></button>
              </span>
            : 
              ''
          }
        </div>
      : '';
    return (
      <div style={ styles.commentBox }>
        <h3 style={ styles.commentBoxTitle }><span style={ styles.postingAs }>Posting as </span><strong style={ styles.strong }>{ this.props.togglerGroups['privacy'].togglers['anonymity'].status ? 'coolcat' : 'Jane Doe' }</strong></h3>
        { toolBar }
        <div>
          <div style={ styles.commentBoxContent } contentEditable="true"></div>
        </div>
        <div style={ styles.safetyTips }>
          <span style={ styles.heart }><Icon name="fa-heart" /></span> Dont engage in personal attacks! Remember you can always use the report tools.
        </div>
      </div>
      );

  }
}

// same as the @connect decorator above
export default CommentBox;

var styles = {
  toolBar: {
    backgroundColor: '#eee',
    borderBottom: '1px solid #aaa'
  },
  commentBox: {
    backgroundColor: '#F77260',
    padding: '20px',
    borderRadius: '8px'
  },
  commentBoxContent: {
    backgroundColor: 'white',
    padding: '20px',
    minHeight: '250px'
  },
  commentBoxTitle: {
    fontSize: '11pt',
    paddingBottom: '10px',
    fontFamily: 'Fira Sans'
  },
  toolBarButton: {
    cursor: 'pointer',
    padding: '5px',
    borderRight: '1px solid #aaa',
    borderTop: '0',
    borderLeft: '0',
    borderBottom: '0',
    background: 'none'
  },
  heart: {
    color: '#900'
  },
  safetyTips: {
    background: 'white',
    padding: '20px',
    color: '#999',
    borderTop: '1px solid #eee'
  },
  strong: {
    fontWeight: 'bold',
    fontFamily: 'Fira Sans'
  },
  postingAs: {
    fontFamily: 'Fira Sans'
  }
};