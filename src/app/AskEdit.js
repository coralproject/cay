import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ContentHeader from 'components/ContentHeader';

import Page from 'app/layout/Page';

@Radium
export default class AskEdit extends Component {

  render() {
    return (
      <Page>
        <ContentHeader title="Ask" />
      </Page>
    );
  }
}
