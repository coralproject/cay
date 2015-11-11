import React from "react";
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";

import MainHeader from './main-header';
import Sidebar from './sidebar';
import ContentWrapper from './content-wrapper';

@connect(state => state.data)
@Radium
class App extends React.Component {

  render() {
    return (
      <div>
        <MainHeader />
        <Sidebar />
        <ContentWrapper module="dashboard" />
      </div>
    );
  }
}

export default App;
