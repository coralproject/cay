import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ProfileBadge from './ProfileBadge';
import ProfileInfo from './ProfileInfo';
import CommentContent from './CommentContent';
import ActionsBar from './ActionsBar';
import Upvoter from './Upvoter';
import CommentTools from './CommentTools';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class Comment extends React.Component {

  onCommentContentClick() {
    this.setState({ toolsExpanded: !this.state.toolsExpanded });
  }

  onProfileClick() {
    this.setState({ profileExpanded: !this.state.profileExpanded });
  }

  render() {

    var commentTools = this.state.toolsExpanded ? <CommentTools /> : null;
    var profileInfoSection = this.state.profileExpanded ? <ProfileInfo user={ this.props.user } /> : null;

    return (
      <div style={ styles.comment }>
        <ReactCSSTransitionGroup transitionName="profileinfo" transitionAppear={ false }>
          { profileInfoSection }
        </ReactCSSTransitionGroup>
        <ProfileBadge profileClickHandler={ this.onProfileClick.bind(this) } user={ this.props.user } />
        <div onClick={ this.onCommentContentClick.bind(this) } style={ [ styles.commentContent, this.props.togglerGroups['interaction'].togglers['upvotes'].status ? styles.withUpvoter : null ] }>
          <CommentContent content={ this.props.content } />
          { 
            this.props.togglerGroups['interaction'].togglers['upvotes'].status ? 
            <Upvoter /> : 
            null
          }
        </div>
        <ActionsBar { ...this.props } moreClickHandler={ this.onCommentContentClick.bind(this) } index={ this.props.index } />
        <ReactCSSTransitionGroup transitionName="commentTools" transitionAppear={ false }>
          { commentTools }
        </ReactCSSTransitionGroup>
      </div>
    );

  }
}

// same as the @connect decorator above
export default Comment;

var styles = {
  comment: {
    borderBottom: '1px solid #ddd',
    padding: '20px 0px 20px 75px',
    position: 'relative',
    minHeight: '100px',
    [mediaQueries.tablet]: {
      padding: '75px 0px 20px 0px'
    }
  },
  commentContent: {
    cursor: 'pointer',
    position: 'relative'
  },
  withUpvoter: {
    paddingRight: '80px'
  }
};