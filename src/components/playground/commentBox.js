import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';
import Icon from '../../components/icon';

@connect(state => state.playground)
@Radium
class CommentBox extends React.Component {

  render() {

    return (
      <div style={ styles.commentBox }>
        <h3 style={ styles.commentBoxTitle }>Posting as <strong>coolcat</strong></h3>
        <div style={ styles.toolBar }>
          <button style={ styles.toolBarButton }><Icon name="fa-bold" /></button>
          <button style={ styles.toolBarButton }><Icon name="fa-italic" /></button>
          <button style={ styles.toolBarButton }><Icon name="fa-link" /></button>
          <button style={ styles.toolBarButton }><Icon name="fa-quote-left" /></button>
        </div>
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
    backgroundColor: settings.lightGrey,
    borderBottom: '1px solid #aaa'
  },
  commentBox: {
    backgroundColor: settings.coralPink,
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
    paddingBottom: '10px'
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
    color: settings.grey,
    borderTop: '1px solid ' + settings.lightGrey
  }
};