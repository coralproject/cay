import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../../settings';

@connect(state => state.playground)
@Radium
class ProfileBadge extends React.Component {

  render() {

    return (
        <div style={ styles.profileBadge }>
            PICTURE
        </div>
    );

  }
}

// same as the @connect decorator above
export default ProfileBadge;

var styles = {
    profileBadge: {
    	padding: "20px"   
    }
};