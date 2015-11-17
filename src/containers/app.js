import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import MainHeader from '../components/main-header';
import Sidebar from '../components/sidebar';
import ContentWrapper from '../components/content-wrapper';

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

// same as the @connect decorator above
export default App;
