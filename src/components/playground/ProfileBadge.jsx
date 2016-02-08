import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class ProfileBadge extends React.Component {

  render() {

    return (
      <div style={ styles.profileBadge } onClick={ this.props.profileClickHandler }>
        <img style={ styles.profilePicture } width="60" height="60" src={ "/img/playground/profile" + this.props.user + ".jpg" } /><br />
        <h4 style={ styles.userName }>
          { 
            this.props.togglerGroups['privacy'].togglers['anonymity'].status ? 
            this.props.users[this.props.user].nickName : 
            this.props.users[this.props.user].realName 
          }
        </h4>
      </div>
      );

  }
}

// same as the @connect decorator above
export default ProfileBadge;

var styles = {
  profileBadge: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  profilePicture: {
    borderRadius: '30px'
  },
  userName: {
    fontSize: '10pt'
  }
};
