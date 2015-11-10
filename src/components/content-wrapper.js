import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import ContentHeader from './content-header';
import Trust from './trust';

// @connect(state => state.userData)
@Radium
class ContentWrapper extends React.Component {
  render() {
    return (
      <div style={styles}>
        <ContentHeader title="Trust Module Header" />
        <Trust />
      </div>
    );
  }
}

var styles = {
  marginLeft: '230px',
  backgroundColor: '#ecf0f5',
  height: (window.innerHeight - 50) + 'px'
};


export default ContentWrapper;
