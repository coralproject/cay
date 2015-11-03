import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import MainHeader from './main-header';
import Sidebar from './sidebar';
import TrustModule from './trust-module';

// @connect(state => state.userData)
@Radium
class UserManager extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MainHeader />
        <Sidebar />
        <TrustModule />
      </div>
    );
  }
}

export default UserManager;
