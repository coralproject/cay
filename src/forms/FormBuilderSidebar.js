import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button, Tabs, Tab, RadioGroup, Radio, Textfield } from 'react-mdl';

import Spinner from 'components/Spinner';

import CopyToClipboard from 'react-copy-to-clipboard';

import {
  updateForm,
  updateFormSettings
 } from 'forms/FormActions';

import FieldTypeButton from 'forms/FieldTypeButton';
import askTypes from 'forms/WidgetTypes';

import Modal from 'components/modal/Modal';
import PublishOptions from 'forms/PublishOptions';

@connect(({ app, forms }) => ({ app, forms }))
export default class FormBuilderSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { openDialog: false, formStatus: 'closed' };
  }

  onPublishOptions() {
    this.setState({ openDialog: !this.state.openDialog });
  }

  onFormStatusChange(e) {
    let status = e.target.value;
    this.setState({ formStatus: status });
    this.props.dispatch(updateForm({status}));
    this.props.dispatch(updateFormSettings({ isActive: status === 'open' }));
  }

  onInactiveMessageChange(e) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: e.target.value }));
  }

  createEmbed(type) {
    const {forms, activeForm} = this.props;
    const form = activeForm ? forms[activeForm] : forms.form;
    if (!form) return;

    switch (type) {
    case 'script-tag':
      return `<div id="ask-form"></div><script src="${form.settings.baseUrl}${activeForm}.js"></script>`;
    case 'iframe':
      return `<iframe width="100%" height="580" src="${form.settings.baseUrl}${activeForm}.html"></iframe>`;
    case 'standalone':
      return `${form.settings.baseUrl}${activeForm}.html`;
    default:
      // nothing
    }
  }

  render() {

    const { preview, onClosePreview, onOpenPreview, forms, activeForm, app, onSaveClick } = this.props;
    const form = activeForm ? forms[activeForm] : forms.form;

    return (
      <div style={styles.leftPan}>
        <div style={styles.leftContainer}>
          <h4 style={styles.leftContainerTitle}>Question Fields</h4>
          <div className="field-types" style={styles.typeList}>
            {askTypes.map((type, i) => (
              <FieldTypeButton key={ i } field={ type } />
            ))}
          </div>

          <PublishOptions
            isForm
            form={form}
            forms={forms}
            activeForm={activeForm}
            onOpenPreview={onOpenPreview}
            onSaveClick={onSaveClick}
            scriptCode={this.createEmbed('script-tag')}
            iframeCode={this.createEmbed('iframe')}
            standaloneCode={this.createEmbed('standalone')}
          />

        </div>
      </div>
    );
  }

}

const styles = {
  leftPan: {
    width: 400
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
    padding: 20,
    paddingTop: 10,
    paddingLeft: 0,
    color: '#5D5D5D',
    borderRadius: 4,
    marginBottom: 20
  },
  typeList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
    marginBottom: '20px'
  },
  leftContainerTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '.9em'
  },
  leftContainerSubTitle: {
    margin: '20px 0',
    fontSize: '14pt'
  },
  typesSubTitle: {
    fontSize: 16,
    marginBottom: 10
  },
  embedCode: {
    width: '100%',
    padding: '15px',
    color: '#5d5d5d',
    marginBottom: 10,
    marginTop: 10,
    resize: 'none'
  },
  dialogSubTitle: {
    margin: '15px 0',
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30
  },
  copied: {
    paddingLeft: '15px',
    color: '#0a0'
  },
  dialogContent: {
    padding: 15
  }
};
