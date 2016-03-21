import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import moment from 'moment';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ProfileBadge from './ProfileBadge';
import ProfileInfo from './ProfileInfo';
import CommentContent from './CommentContent';
import ActionsBar from './ActionsBar';
import Upvoter from './Upvoter';
import CommentTools from './CommentTools';

import CoralIcon from '../../components/CoralIcon';

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

    var leftPadding = 0;
    if (this.props.togglerGroups.layout.togglers.profilepictures.status) leftPadding += 75;
    if (this.props.depth > 0) leftPadding += 25;

    var user = this.props.users[this.props.user];

    return (
      <div style={ 
        [ 
          styles.comment,
          { paddingLeft: leftPadding },
          this.props.depth > 0 ? { borderLeft: '1px solid #ddd' } : null
        ]
      }>
        <h4 style={ [ styles.userName, this.props.togglerGroups['reputation'].togglers['badges'].status && user.badges && user.badges.length ? styles.withBadge : null ] } onClick={ this.onProfileClick.bind(this) }>
          { 
            this.props.togglerGroups['reputation'].togglers['badges'].status ? 
              <span>
                {
                  user.badges && user.badges.length ? 
                    <CoralIcon 
                      style={ styles.badgeIcon } 
                      size="medium" 
                      name={ user.badges[0].icon } 
                      color={ user.badges[0].color } />
                  : null
                }
              </span>
            : null
          }
          { 
            this.props.togglerGroups['privacy'].togglers['anonymity'].status ? 
            this.props.users[this.props.user].nickName : 
            this.props.users[this.props.user].realName 
          }
        </h4>
        <div style={ styles.date }>{ moment().fromNow() }</div>
        <ReactCSSTransitionGroup transitionName="profileinfo" transitionAppear={ false }>
          { profileInfoSection }
        </ReactCSSTransitionGroup>
        { 
          this.props.togglerGroups.layout.togglers.profilepictures.status ?
            <ProfileBadge profileClickHandler={ this.onProfileClick.bind(this) } user={ this.props.user } style={ this.props.depth > 0 ? { left: '25px' } : null } />
          : 
            null
        }
        
        <div onClick={ this.onCommentContentClick.bind(this) } style={ [ styles.commentContent, this.props.togglerGroups['interaction'].togglers['upvotes'].status ? styles.withUpvoter : null ] }>
          <CommentContent content={ this.props.content } />
          { 
            this.props.togglerGroups['interaction'].togglers['upvotes'].status ? 
            <Upvoter { ...this.props } /> : 
            null
          }
        </div>
        <ActionsBar { ...this.props } moreClickHandler={ this.onCommentContentClick.bind(this) } />
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
    paddingTop: '20px',
    paddingBottom: '0px',
    position: 'relative',
    minHeight: '100px',
    [mediaQueries.tablet]: {
      padding: '75px 0px 20px 0px'
    }
  },
  userName: {
    fontSize: '11pt',
    fontWeight: '600',
    color: '#333',
    marginBottom: '5px',
    cursor: 'pointer',
    position: 'relative'
  },
  commentContent: {
    cursor: 'pointer',
    position: 'relative'
  },
  withUpvoter: {
    paddingRight: '80px'
  },
  withPicture: {
    paddingLeft: '75px'
  },
  noPicture: {
    paddingLeft: '0px'
  },
  badgeIcon: {
    height: '24px',
    lineHeight: '24px',
    width: '24px',
    position: 'absolute',
    left: '-8px',
    top: '-8px'
  },
  withBadge: {
    paddingLeft: '20px'
  },
  date: {
    fontSize: '10pt',
    color: '#999',
    marginBottom: '5px'
  }
};