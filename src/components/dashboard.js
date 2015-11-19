import React from 'react';
import Radium from 'radium';

@Radium
export default class Dashboard extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.base}>
          Dashboard
        </div>
      </div>
    );
  }
}

var styles = {
  base: {
    minHeight: '250px',
    padding: '15px',
    // margin-right: auto;
    // margin-left: auto;
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  wrapper: {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  }
}
