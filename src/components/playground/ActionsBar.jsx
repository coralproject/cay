import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import MdThumbUp from 'react-icons/lib/md/thumb-up';
import FaSmileO from 'react-icons/lib/fa/smile-o';

import CommentBox from './CommentBox';

import mediaQueries from '../../playgroundSettings';

import { likeComment, unLikeComment } from 'playground/PlaygroundActions';

@connect(state => state.playground)
@Radium
class ActionsBar extends React.Component {

  likeClickHandler(index, parents) {
    if (!this.props.liked) {
      this.props.dispatch(likeComment(index, parents));
    } else {
      this.props.dispatch(unLikeComment(index, parents));
    }
  }

  replyClickHandler() {
    this.setState({ showReplyBox: !this.state.showReplyBox })
  }

  onReplyHandler() {
    this.setState({ showReplyBox: false });
  }

  reactionClickHandler() {    
  }

  render() {

    return (
      <div style={ styles.statsBar }>
        { 
          this.props.togglerGroups.stream.togglers.replies.status ? 
            <div onClick={ this.replyClickHandler.bind(this, this.props.index) } style={ styles.actionBarButton }>
              <MdThumbUp />&nbsp;
              Reply
            </div>
          : null
        }
        { 
          this.props.togglerGroups['interaction'].togglers['likes'].status ? 
            <div onClick={ this.likeClickHandler.bind(this, this.props.index, this.props.parents) } style={ [ styles.actionBarButton, this.props.liked ? styles.liked : null ] }>
              <MdThumbUp />&nbsp;
              { this.props.likes } Likes
            </div>
          : null
        }
        { 
          this.props.togglerGroups['interaction'].togglers['reactions'].status ? 
            <div onClick={ this.reactionClickHandler.bind(this, this.props.index, this.props.parents) } style={ styles.actionBarButton }>
              <FaSmileO />&nbsp;
              { this.props.likes } Reactions
            </div>
          : null
        }
        <div style={ styles.clear }></div>
        {
          !!this.state.showReplyBox ? 
            <CommentBox replyMode={ true } replyCallback={ this.onReplyHandler.bind(this) } threadIndex={ this.props.index } parents={ this.props.parents } />
          : 
            null
        }
      </div>
    );

  }
}

// same as the @connect decorator above
export default ActionsBar;

var styles = {
  statsBar: {
    padding: '10px 0',
    fontSize: '12pt',
    color: '#999'
  },
  actionBarButton: {
    cursor: 'pointer',
    'float': 'left',
    padding: '0 20px',
    lineHeight: '40px',
    [mediaQueries.tablet]: {
      display: 'block',
      'float': 'none'
    }
  },
  clear: {
    clear: 'both'
  },
  liked: {
    color: '#a00'
  }
};