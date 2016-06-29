import React from 'react';
import Radium from 'radium';
import settings from 'settings';
import Page from 'app/layout/Page';

@Radium
export default class NoMatch extends React.Component {
  render() {
    return (
      <Page style={styles.base}>
        <div style={styles.container}>
          <p style={styles.notFound}>Not Found!</p>
          <p style={styles.pun}>It was just here, right here!</p>
          <p>wow, embarassing. Let us know that something <a style={styles.ghLink} target="_blank" href="https://github.com/coralproject/cay/issues">broke</a>.</p>
        </div>
      </Page>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: settings.brandColor,
    color: 'white'
  },
  notFound: {
    color: 'blue',
    fontSize: '200px',
    fontWeight: 'bold',
    lineHeight: '0.8em',
    backgroundImage: 'url(/img/logomark_512x512.svg)',
    backgroundSize: '100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    MozBackgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitTextFillColor: 'transparent',
    MozTextFillColor: 'transparent',
    animation: 'animatedBackground 10s ease infinite'
  },
  ghLink: {
    color: 'white'
  },
  pun: {
    fontSize: '28px'
  }
};
