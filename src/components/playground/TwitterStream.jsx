import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class TwitterStream extends React.Component {

  // Twitter branding reference:
  // https://about.twitter.com/es/company/brand-assets
  render() {

    return (
      <div style={ styles.twitterStream }>
        (Twitter stream placeholder)
      </div>
    );

  }
}

// same as the @connect decorator above
export default TwitterStream;

var styles = {
  twitterStream: {
    marginTop: '20px',
    padding: '30px',
    border: '1px solid white',
    opacity: '.5'
  }
};
