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

  constructor(props) {
    super(props);
    this.state = {preview: false};
  }

  render() {
    const {preview} = this.state;
    return (
      <Page>
        <ContentHeader title={window.L.t('Create a new ask')} style={styles.header}>
          <div>
            <Button style={styles.headerBtn} category='primary'>Save <FaFloopyO style={styles.icon} /></Button>
            <Button onClick={this.showPreview.bind(this)} style={styles.headerBtn}>Preview <FaEye style={styles.icon} /></Button>
          </div>
        </ContentHeader>
        <div>
          <TextField style={styles.textField} label={window.L.t('Name')} />
          <TextField style={styles.textField} label={window.L.t('Thank you message')} />
          <TextField label={window.L.t('Description')} />
        </div>
        <div style={styles.formBuilderContainer}>
          <h2 style={styles.builderTitle}>Form Builder</h2>
          <FormBuilder onClosePreview={this.onClosePreview.bind(this)}
            preview={preview} />
        </div>
      </Page>
    );
  }

  onClosePreview() {
    this.setState({
      preview: false
    });
  }

  showPreview() {
    this.setState({
      preview: true
    });
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
  },
  formBuilderContainer: {
    marginTop: 50
  },
  builderTitle: {
    marginBottom: 30,
    fontSize: 25

  }
};
