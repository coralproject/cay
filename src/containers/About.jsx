import React from 'react';
import Radium from 'radium';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';

@Radium
export default class About extends React.Component {
  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('About') } />
        <h1>Some header</h1>
        <p>Lorem ipsum dolor</p>
      </Page>
    );
  }
}
