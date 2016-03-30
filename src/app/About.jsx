import React from 'react';
import Radium from 'radium';

import settings from 'settings';
import Page from 'app/layout/Page';

@Radium
export default class About extends React.Component {
  render() {
    return (
      <Page>

        <div style={ styles.logoWrapper }>
          <p style={ styles.logoLegend }>Welcome to</p>
          <img style={ styles.logo } src="img/coralWordMark-color.png" />
        </div>

        <h1 style={ styles.aboutHeading }>What to expect</h1>
        <p style={ styles.aboutParagraph }>
          { "This is the beta test site for Trust, a tool to find selective value in existing comment sections. We're updating it regularly - check back for new versions." }
          <br/>
          Some options may be greyed out. These are features that will be implemented soon.
        </p>

        <h1 style={ styles.aboutHeading }>Send us feedback</h1>

        <p style={ styles.aboutParagraph }>
          Is it broken? What would you like to see?<br/>
          Email coralcommunity@mozillafoundation.org,
          submit an issue (labeled 'Kind:Bug' or 'Kind:Question')
          or a pull request on <a href="https://github.com/coralproject/cay" target="_blank">our GitHub repo</a>.
        </p>

      </Page>
    );
  }
}

const styles = {
  aboutHeading: {
    fontSize: '24pt',
    fontWeight: 600,
    color: settings.brandColor,
    margin: '0 0 30px 0'
  },
  aboutParagraph: {
    fontSize: '14pt',
    margin: '0 0 80px 0',
    lineHeight: '1.3',
    maxWidth: 700
  },
  logoWrapper: {
    marginBottom: 40,
    position: 'relative'
  },
  logoLegend: {
    marginBottom: 10,
    color: '#888',
    fontSize: '14pt'

  },
  logo: {
    maxWidth: 500,
    width: '80%'
  }

}
