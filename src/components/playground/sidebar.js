import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';
import Icon from '../../components/icon';
import TwitterStream from './TwitterStream';

@connect(state => state.playground)
@Radium
class Sidebar extends React.Component {

  render() {

    return (
      <div style={ styles.sideBar }>
        <h2 style={ styles.sideBarTitle }>Topic title</h2>
        <p style={ styles.sideBarDescription }>Sidebar topic description</p>
        <div style={ styles.tweets }>
          <span style={ styles.twitterIcon }><Icon size="medium" name="fa-twitter" /></span> Join the discussion!<br />
          <TwitterStream />
        </div>
        <div style={ styles.sideBarReferences }>
          <h3>Learn more about this topic</h3>
          <a style={ styles.sideBarLinks } href="#">Link one</a><br />
          <a style={ styles.sideBarLinks } href="#">Link two</a><br />
          <a style={ styles.sideBarLinks } href="#">Link three</a>
        </div>
      </div>
    );

  }
}

// same as the @connect decorator above
export default Sidebar;

var styles = {
  sideBar: {
    position: 'fixed',
    right: '300px',
    top: '0px',
    height: '100%',
    width: '300px',
    backgroundColor: settings.darkerGrey,
    zIndex: '15000',
    color: 'white',
    padding: '30px'
  },
  sideBarTitle: {
    fontWeight: 'bold',
    fontSize: '24pt',
    marginBottom: '30px'
  },
  sideBarDescription: {
    fontSize: '12pt'
  },
  sideBarLinks: {
    color: settings.coralPink,
    textDecoration: 'none'
  },
  twitterIcon: {
    color: '#55acee'
  }
};
