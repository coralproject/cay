import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class ProfileBadge extends React.Component {

  render() {

    return (
      <div style={ styles.profileBadge }>
        <img style={ styles.profilePicture } src="http://lorempixel.com/60/60/people" /><br />
        <h4 style={ styles.userName }>coolcat29</h4>
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
    textAlign: 'center'
  },
  profilePicture: {
    borderRadius: '30px'
  },
  userName: {
    fontSize: '10pt'
  }
};
