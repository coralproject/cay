import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CoralIcon from '../../components/CoralIcon';

import FaClockO from 'react-icons/lib/fa/clock-o';
import FaMortarBoard from 'react-icons/lib/fa/mortar-board';
import FaHandPaperO from 'react-icons/lib/fa/hand-paper-o';
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h';
import MdPlace from 'react-icons/lib/md/place';
import MdComment from 'react-icons/lib/md/comment';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class ProfileInfo extends React.Component {

  render() {

    var user = this.props.users[this.props.user];

    return (
      <div style={ styles.profileInfoWrapper }>
        <div style={ styles.profileInfo }>
          <div style={ styles.profilePicPane }>
            <img style={ styles.profilePicture } width="180" height="180" src={ "/img/playground/profile" + this.props.user + ".jpg" } /><br />
          </div>
          <div style={ styles.profileLeftPane }>
            <h3 style={ styles.userName }>
              { 
                this.props.togglerGroups['privacy'].togglers['anonymity'].status ? 
                user.nickName : 
                user.realName 
              }
            </h3><br />
            { 
              this.props.togglerGroups['privacy'].togglers['public_profile'].status ? 
                <div>
                  <div style={ styles.profileBullet }><FaClockO style={ styles.profileBulletIcon } /> Member for { user.membershipAge }</div>
                  <div style={ styles.profileBullet }><MdPlace style={ styles.profileBulletIcon } /> { user.location }</div>
                  <div style={ styles.profileBullet }><FaMortarBoard style={ styles.profileBulletIcon } /> { user.education }</div>
                </div>            
              : ''
            }
          </div>
          <div style={ styles.profileCenterPane }>
            <div>
              <div style={ styles.profileStat }>
                <span style={ styles.profileTotal }>{ user.comments }</span> comments
              </div>
              <div style={ styles.profileStat }>
                <span style={ styles.profileTotal }>{ user.points }</span> points
              </div>
              <div style={ styles.profileStat }>
                <span style={ styles.profileTotal }>{ user.upvoteBalance }%</span> upvotes
              </div>
              <div style={ styles.clearfix }></div>
            </div>
            { 
              this.props.togglerGroups['reputation'].togglers['badges'].status ? 
                <div>
                  {
                    user.badges.map((badge, i) => {
                      return (
                        <div key={ i } style={ styles.badge }>
                          <CoralIcon style={ styles.badgeIcon } size="medium" name={ badge.icon } color={ badge.color } /> { badge.name }
                        </div>
                      );
                    })
                  }
                </div>
              : ''
            }
          </div>
          <div style={ styles.profileRightPane }>
            { 
              this.props.togglerGroups['community'].togglers['privatemessages'].status ? 
                <div style={ styles.rightPaneAction }><MdComment /></div> : 
                null
            }
            { 
              this.props.togglerGroups['moderation'].togglers['muting'].status ? 
                <div style={ styles.rightPaneAction }><FaHandPaperO /></div> : 
                null
            }
            <div style={ styles.moreActions }><FaEllipsisH /></div>
          </div>
          <div style={ styles.clearfix }></div>
        </div>
        <div style={ styles.profileInfoSpacer }></div>
      </div>
    );

  }
}

// same as the @connect decorator above
export default ProfileInfo;

var styles = {
  userName: {
    fontSize: '16pt',
    fontWeight: 'bold',
    wordWrap: 'break-word'
  },
  profileInfo: {
    background: '#eee',
    position: 'relative',
    fontSize: '9pt',
    width: '100%',
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'row',
    [mediaQueries.mobile]: {
      display: 'block'
    }
  },
  profileInfoSpacer: {
    height: '30px'
  },
  profilePicPane: {
    width: '180px',
    [mediaQueries.mobile]: {
      width: '120px',
      position: 'absolute',
      top: '0px',
      left: '0px'
    }
  },
  profilePicture: {
    [mediaQueries.mobile]: {
      width: '120px',
      height: '120px'
    }
  },
  profileLeftPane: {
    width: '250px',
    minHeight: '150px',
    borderRight: '1px solid #ccc',
    verticalAlign: 'top',
    padding: '20px',
    [mediaQueries.mobile]: {
      width: '100%',
      paddingLeft: '140px',
      borderRight: 'none'
    },
    [mediaQueries.table]: {
      borderRight: 'none'
    }
  },
  profileCenterPane: {
    minHeight: '150px',
    borderRight: '1px solid #ccc',
    verticalAlign: 'top',
    padding: '20px 10px',
    flexGrow: '2',
    [mediaQueries.tablet]: {
      borderRight: 'none',
      borderTop: '1px solid #ccc'
    }
  }, 
  profileRightPane: {
    width: '45px',
    minHeight: '150px',
    verticalAlign: 'top',
    position: 'relative',
    textAlign: 'center',
    [mediaQueries.tablet]: {
      width: 'auto',
      minHeight: 'auto',
      borderTop: '1px solid #ccc'
    }
  }, 
  profileStat: {
    marginBottom: '10px'
  },
  profileTotal: {
    fontSize: '16pt',
    fontWeight: 'bold'
  },
  rightPaneAction: {
    height: '40px',
    lineHeight: '40px',
    [mediaQueries.tablet]: {
      'float': 'left',
      width: '40px',
      height: '40px',
      lineHeight: '40px'
    }
  },
  moreActions: {
    position: 'absolute',
    bottom: '5px',
    left: '7px',
    [mediaQueries.tablet]: {
      position: 'relative',
      'float': 'left',
      bottom: 'auto',
      left: 'auto',
      width: '40px',
      height: '40px',
      lineHeight: '40px'
    }
  },
  clearfix: {
    'clear': 'both'
  },
  profileBullet: {
    position: 'relative',
    paddingLeft: '15px',
    marginBottom: '10px'
  },
  profileBulletIcon: {
    position: 'absolute',
    left: '0px'
  },
  badge: {
    position: 'relative',
    paddingLeft: '30px',
    height: '30px',
    marginBottom: '5px',
    lineHeight: '30px'
  },
  badgeIcon: {
    position: 'absolute',
    left: '0px',
    height: '20px',
    width: '20px',
    lineHeight: '32px'
  }
};
