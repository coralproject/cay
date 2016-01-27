import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';
import Icon from '../../components/icon';
import CoralIcon from '../../components/coral-icon';

@connect(state => state.playground)
@Radium
class ProfileInfo extends React.Component {

  render() {

    var user = this.props.users[this.props.user];

    return (
      <div style={ styles.profileInfo }>
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
                <div style={ styles.profileBullet }><Icon size="medium" name="fa-clock-o" /> Member for { user.membershipAge }</div>
                <div style={ styles.profileBullet }><Icon size="medium" name="fa-map-marker" /> { user.location }</div>
                <div style={ styles.profileBullet }><Icon size="medium" name="fa-mortar-board" /> { user.education }</div>
              </div>            
            : ''
          }
        </div>
        <div style={ styles.profileCenterPane }>
          <div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>{ user.comments }</span><br/>comments
            </div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>{ user.points }</span><br/>points
            </div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>{ user.upvoteBalance }%</span><br/>upvotes
            </div>
            <div style={ styles.clearfix }></div>
          </div>
          { 
            this.props.togglerGroups['reputation'].togglers['badges'].status ? 
              <div>
                {
                  user.badges.map((badge) => {
                    return (
                      <div>
                        <CoralIcon size="medium" name={ badge.icon } color={ badge.color } /> { badge.name }
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
              <div><Icon size="large" name="fa-comments-o" /></div> : 
              ''
          }
          { 
            this.props.togglerGroups['moderation'].togglers['muting'].status ? 
              <div><Icon size="large" name="fa-hand-paper-o" /></div> : 
              ''
          }
          <div style={ styles.moreActions }><Icon size="large" name="fa-ellipsis-h" /></div>
        </div>
        <div style={ styles.clearfix }></div>
      </div>
    );

  }
}

// same as the @connect decorator above
export default ProfileInfo;

var styles = {
  userName: {
    fontSize: '20pt',
    fontWeight: 'bold',
  },
  profileInfo: {
    background: settings.lightGrey,
    position: 'relative',
    minHeight: '100px',
    fontSize: '9pt',
    display: 'table',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '30px'
  },
  profileLeftPane: {
    display: 'table-cell',
    width: '250px',
    minHeight: '150px',
    borderRight: '1px solid #ccc',
    verticalAlign: 'top',
    padding: '20px'
  },
  profileCenterPane: {
    display: 'table-cell',
    minHeight: '150px',
    borderRight: '1px solid #ccc',
    verticalAlign: 'top',
    padding: '20px'
  }, 
  profileRightPane: {
    display: 'table-cell',
    width: '90px',
    minHeight: '150px',
    verticalAlign: 'top',
    position: 'relative',
    textAlign: 'center',
    padding: '20px'
  }, 
  profileStat: {
    'float': 'left',
    width: '30%',
    padding: '1.5%',
    textAlign: 'center'
  },
  profileTotal: {
    fontSize: '16pt',
    fontWeight: 'bold'
  },
  moreActions: {
    position: 'absolute',
    bottom: '5px',
    left: '20px'
  },
  clearfix: {
    'clear': 'both'
  }
};
