import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class ProfileBadge extends React.Component {

  render() {

    return (
      <div style={ styles.profileBadge } onClick={ this.props.profileClickHandler }>
        <img style={ styles.profilePicture } width="60" height="60" src={ "/img/playground/profile" + this.props.user + ".jpg" } />
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
    left: '0px',
    textAlign: 'center',
    cursor: 'pointer',
    width: '60px',
    [mediaQueries.tablet]: {
      width: '80%',
      height: '40px',
      textAlign: 'left',
      lineHeight: '40px'
    }
  },
  profilePicture: {
    borderRadius: '30px',
    [mediaQueries.tablet]: {
      'float': 'left',
      marginRight: '10px',
      width: '40px',
      height: '40px'
    }
  },
  userName: {
    fontSize: '10pt',
    'float': 'left',
    marginRight: '10px',
    height: '40px',
    wordWrap: 'break-word',
    maxWidth: '100%'
  }
};
