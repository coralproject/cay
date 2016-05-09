import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Page from 'app/layout/Page';
import Button from 'components/Button';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import ContentHeader from 'components/ContentHeader';
import TextField from 'components/forms/TextField';
import FormBuilder from 'asks/FormBuilder.js';

@Radium
export default class AskCreate extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    return (
      <Page>
        <ContentHeader title={window.L.t('Create a new ask')} style={styles.header}>
          <div>
            <Button style={styles.headerBtn} category='primary'>Save <FaFloopyO style={styles.icon} /></Button>
            <Button style={styles.headerBtn}>Preview <FaEye style={styles.icon} /></Button>
          </div>
        </ContentHeader>
        <div>
          <TextField style={styles.textField} label={window.L.t('Name')} />
          <TextField style={styles.textField} label={window.L.t('Thank you message')} />
          <TextField label={window.L.t('Description')} />
        </div>
        <div>
          <h2>Form Builder</h2>
          <FormBuilder />
        </div>
      </Page>
    );
  }

}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textField: {
    marginRight: 20
  },
  headerBtn: {
    marginLeft: 20
  },
  icon: {
    float: 'right',
    marginLeft: 10
  }
};
