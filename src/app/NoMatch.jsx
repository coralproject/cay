import React from 'react';
import Radium from 'radium';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';

@Radium
export default class NoMatch extends React.Component {
  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('Missing') } />
      </Page>
    );
  }
}
