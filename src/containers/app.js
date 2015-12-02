import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../settings';

import MainHeader from '../components/main-header';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';

@connect(state => state.data)
@Radium
class App extends React.Component {

  render() {
    return (
      <div style={styles}>
        <MainHeader />
        <Sidebar />
        <Dashboard />
      </div>
    );
  }
}

// same as the @connect decorator above
export default App;

const styles = {
  background: settings.coralPink
};
