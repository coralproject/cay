import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import MainHeader from '../components/main-header';
import Sidebar from '../components/sidebar';
import ContentWrapper from '../components/content-wrapper';

@connect(state => state.userData)
@Radium
class UserManager extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MainHeader />
        <Sidebar />
        <ContentWrapper module="trust" />
      </div>
    );
  }
}

export default UserManager;
