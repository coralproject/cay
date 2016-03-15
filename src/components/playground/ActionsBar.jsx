import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import MdThumbUp from 'react-icons/lib/md/thumb-up';
import FaSmileO from 'react-icons/lib/fa/smile-o';
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h';

import mediaQueries from '../../playgroundSettings';

import { likeComment, unLikeComment } from '../../actions/playground';

@connect(state => state.playground)
@Radium
class ActionsBar extends React.Component {

  likeClickHandler(index) {
    if (!this.props.liked) {
      this.props.dispatch(likeComment(index));
    } else {
      this.props.dispatch(unLikeComment(index));
    }
  }

  moreClickHandler() {
    if (this.props.moreClickHandler) { this.props.moreClickHandler(); }
  }

  reactionClickHandler() {
    
  }

  render() {

    return (
      <div style={ styles.statsBar }>
        { 
          this.props.togglerGroups['interaction'].togglers['likes'].status ? 
            <div onClick={ this.likeClickHandler.bind(this, this.props.index) } style={ [ styles.actionBarButton, this.props.liked ? styles.liked : null ] }>
              <MdThumbUp />&nbsp;
              { this.props.likes } Likes
            </div>
          : null
        }
        { 
          this.props.togglerGroups['interaction'].togglers['reactions'].status ? 
            <div onClick={ this.reactionClickHandler.bind(this) } style={ styles.actionBarButton }>
              <FaSmileO />&nbsp;
              { this.props.likes } Reactions
            </div>
          : null
        }
        { 
          true ? 
            <div style={ styles.actionBarButton } onClick={ this.moreClickHandler.bind(this) }>
              <FaEllipsisH />&nbsp;
              More actions
            </div>
          : null
        }
        <div style={ styles.clear }></div>
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
    padding: '0 10px',
    lineHeight: '30px',
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