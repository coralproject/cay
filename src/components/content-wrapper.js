import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import ContentHeader from './content-header';
import Trust from './trust';
import Dashboard from './dashboard';

// @connect(state => state.userData)
@Radium
class ContentWrapper extends React.Component {

  getPlugin() {
    switch (this.props.module) {
      case 'trust':
        return <Trust />;
        break;
      case 'dashboard':
        return <Dashboard />;
        break;
      default:
        return <Dashboard />;
    }
  }

  getHeader() {
    switch (this.props.module) {
      case 'trust':
        return 'Trust Module Header';
        break;
      case 'dashboard':
        return 'Super Dashboard';
        break;
      default:
        return 'the default header';
    }
  }

  render() {
    return (
      <div style={styles}>
        <ContentHeader title={this.getHeader()} />
        {this.getPlugin()}
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
