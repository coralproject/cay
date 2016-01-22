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

    var sideBarLinks = this.props.currentSidebarTopic && this.props.topics[this.props.currentSidebarTopic].links ?
      <div style={ styles.sideBarReferences }>
        <h3 style={ styles.referencesTitle }>Learn more about { this.props.topics[this.props.currentSidebarTopic].title }</h3>
          {
            this.props.topics[this.props.currentSidebarTopic].links.map((link, i) => {
              return (
                  <a style={ styles.sideBarLinks } href="{ link.href }">{ link.friendlyName }</a>
              )
            })
          }
      </div>
    : '';

    var sideBarContent = this.props.currentSidebarTopic ? 
      <div>
        <h2 style={ styles.sideBarTitle }>{ this.props.topics[this.props.currentSidebarTopic].title }</h2>
        <p style={ styles.sideBarDescription }>{ this.props.topics[this.props.currentSidebarTopic].description }</p>
        <div style={ styles.tweets }>
          <span style={ styles.twitterIcon }><Icon size="medium" name="fa-twitter" /></span> <span style={ styles.twitterTitle }>Join the discussion!</span><br />
          <TwitterStream />
        </div>
        { sideBarLinks }
      </div>
    : "No topic" ;
   
    return (
      <div style={ styles.sideBar }>
        { sideBarContent }
      </div>
    );  

  }
}

// same as the @connect decorator above
export default Sidebar;

var styles = {
  sideBar: {
    position: 'fixed',
    right: '0px',
    top: '0px',
    height: '100%',
    width: '300px',
    backgroundColor: '#3B60A8',
    zIndex: '75000',
    color: 'white',
    padding: '30px'
  },
  sideBarTitle: {
    fontWeight: '600',
    fontSize: '24pt',
    marginBottom: '30px',
    fontFamily: 'Josefin Slab',
    textTransform: 'uppercase'
  },
  sideBarDescription: {
    fontSize: '12pt',
    marginBottom: '40px'
  },
  sideBarLinks: {
    color: '#FCBD46',
    textDecoration: 'none',
    display: 'block',
    fontSize: '10pt',
    padding: '10px 0',
    fontFamily: 'Fira Sans'
  },
  twitterIcon: {
    color: '#55acee'
  },
  tweets: {
    marginBottom: '40px'
  },
  twitterTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '700'
  },
  referencesTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '700',
    marginBottom: '20px'
  }
};
