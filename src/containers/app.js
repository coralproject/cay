import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../settings';

import {fetchComments} from '../actions';

import Header from '../components/layout/header/header';
import Sidebar from '../components/layout/sidebar/sidebar';
import Dashboard from '../components/dashboard';

@connect(state => state.data)
@Radium
class App extends React.Component {

  getComments() {
    this.props.dispatch(fetchComments());
  }

  render() {

    return (
      <div style={styles}>
        <Header />
        <Sidebar />
        <Dashboard getComments={this.getComments.bind(this)}/>
      </div>
    );
  }
}

// same as the @connect decorator above
export default App;

const styles = {
  background: settings.coralPink
};
