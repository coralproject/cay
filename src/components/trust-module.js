import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

// @connect(state => state.userData)
@Radium
class TrustModule extends React.Component {
  render() {
    return (
      <div style={styles}>
        <p>the trust module</p>
      </div>
    );
  }
}

var styles = {
  marginLeft: '230px',
  backgroundColor: '#ecf0f5',
  height: (window.innerHeight - 50) + 'px'
};


export default TrustModule;
