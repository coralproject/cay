import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

// @connect(state => state.userData)
@Radium
class TrustModule extends React.Component {
  render() {
    return (
      <div>
        <p>the trust module</p>
      </div>
    );
  }
}

export default TrustModule;
