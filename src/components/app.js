import React from "react";
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";

import MainHeader from './main-header';
import Sidebar from './sidebar';

@connect(state => state.data)
@Radium
class App extends React.Component {

  render() {
    return (
      <div>
        <MainHeader />
        <Sidebar />
        <p>This will be some content or a pic of your dog</p>
      </div>
    );
  }
}

var styles = {
  backgroundColor: `hsla(${Math.random() * 255}, 50%, 50%, ${Math.random()})`,
  padding: '5px',
  color: 'white',
  border: 0,
  ':hover': {
    backgroundColor: 'blue'
  }
};

export default App;
