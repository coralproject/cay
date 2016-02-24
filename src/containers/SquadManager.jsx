import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';

@connect(state => state.pipelines)
@Radium
export default class SquadManager extends React.Component {
  render() {
    return (
      <Page>
        <ContentHeader title="Squad Manager" />
        SquadManager
      </Page>
    );
  }
}
