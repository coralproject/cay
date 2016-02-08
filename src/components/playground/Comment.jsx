import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import ProfileBadge from './ProfileBadge';
import ProfileInfo from './ProfileInfo';
import CommentContent from './CommentContent';
import StatsBar from './StatsBar';
import CommentTools from './CommentTools';

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
        { profileInfoSection }
        <ProfileBadge profileClickHandler={ this.onProfileClick.bind(this) } user={ this.props.user } />
        <div onClick={ this.onCommentContentClick.bind(this) } style={ styles.commentContent }>
          <CommentContent content={ this.props.content } />
        </div>
        <StatsBar likes={ this.props.likes } />
        { commentTools }
      </div>
      );

  }
}

// same as the @connect decorator above
export default Comment;

var styles = {
  comment: {
    borderBottom: '1px solid #999',
    padding: '20px 20px 20px 100px',
    position: 'relative',
    minHeight: '100px'
  },
  commentContent: {
    cursor: 'pointer'
  }
};