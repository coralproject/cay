import React, { PropTypes } from 'react';
import Radium from 'radium';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import TextField from 'components/forms/TextField';
import TextArea from 'components/forms/TextArea';

@Radium
export default class AskCreate extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  confirmDeletion() {
    // tbd
  }

  onRowClick(_id) {
    const {router} = this.context;
    return router.push(`/asks/${_id}`);
  }

  render() {
    return (
      <Page>
        <ContentHeader title="Create a new ask" style={styles.header} />
        <div><TextField label={window.L.t('Name')} /></div>
        <div><TextArea label={window.L.t('Description')} /></div>
      </Page>
    );
  }
}

const styles = {
  list: {
    width: '100%'
  },
  row: {
    cursor: 'pointer'
  }
}
