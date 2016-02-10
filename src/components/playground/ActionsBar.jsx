import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../../components/Icon';

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
              <Icon size="medium" name="fa-thumbs-o-up" /> 
              { this.props.likes } Likes
            </div>
          : null
        }
        { 
          this.props.togglerGroups['interaction'].togglers['reactions'].status ? 
            <div onClick={ this.reactionClickHandler.bind(this) } style={ styles.actionBarButton }>
              <Icon size="medium" name="fa-smile-o" /> 
              { this.props.likes } Reactions
            </div>
          : null
        }
        { 
          true ? 
            <div style={ styles.actionBarButton } onClick={ this.moreClickHandler.bind(this) }>
              <Icon size="medium" name="fa-ellipsis-h" /> 
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
    lineHeight: '30px'
  },
  clear: {
    clear: 'both'
  },
  liked: {
    color: '#a00'
  }
};