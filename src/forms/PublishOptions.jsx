import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button, Tabs, Tab, RadioGroup, Radio, Textfield } from 'react-mdl';
import { CoralButton } from '../components/ui';

import Spinner from 'components/Spinner';
import CopyToClipboard from 'react-copy-to-clipboard';

import settings from 'settings';

import {
  updateFormStatus,
  saveForm,
  updateFormSettings
 } from 'forms/FormActions';

import Modal from 'components/modal/Modal';

@connect(({ app, forms }) => ({ app, forms }))
export default class PublishOptions extends Component {

  constructor(props) {
    super(props);
    this.state = { publishModalOpened: false, formStatus: 'closed', activeTab: 0 };

    this.onFormStatusChange = this.onFormStatusChange.bind(this);
    this.onInactiveMessageChange = this.onInactiveMessageChange.bind(this);
    this.togglePublishModal = this.togglePublishModal.bind(this);
  }

  togglePublishModal() {
    this.setState({ publishModalOpened: !this.state.publishModalOpened });
  }

  onFormStatusChange(e) {
    let status = e.target.value;
    const {dispatch, forms} = this.props;
    this.setState({ formStatus: status });
    this.props.dispatch(updateFormStatus(forms.activeForm, status));
  }

  onInactiveMessageChange(e) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: e.target.value }));
  }

  getFormStatusSection() {
    const { forms, activeForm, onSaveClick, isForm } = this.props;
    const form = activeForm ? forms[activeForm] : forms.form;
    return (
      isForm && form
      ? <div>
          <h4 style={ styles.dialogSubTitle }>Set form status</h4>
          <RadioGroup
            onChange={ this.onFormStatusChange }
            childContainer="div"
            value={ form.status }
            name="formStatusRadio">
            <Radio value="open" ripple>Live, accepting submissions</Radio>
            <Radio value="closed">Closed, not accepting submissions</Radio>
          </RadioGroup>
          {
            this.state.formStatus && this.state.formStatus == 'closed'
            ? <div>
              <input type="text"
                onChange={this.onInactiveMessageChange}
                placeholder="We are not currently accepting submissions..."
                value={form.settings.inactiveMessage}
                style={styles.textInput}
                />
              </div>
            : null
          }
          <div style={ styles.rightAlignButtons }>
            <Button
              raised ripple accent
              style={{ marginTop: 20, backgroundColor: '#358D66' }}
              onClick={onSaveClick}>
              { forms.savingForm ? <Spinner/> : null } Apply
            </Button>
          </div>
        </div>
      : null
    );
  }

  render() {

    const { onOpenPreview, forms, activeForm, onSaveClick, iframeCode, scriptCode, standaloneCode, hideOptions, isGallery } = this.props;

    return (
      <div style={styles.leftPan}>

          <div>
            <CoralButton
              className="form-preview-button"
              type="primary"
              icon="visibility"
              onClick={onOpenPreview}
              style={{ width: 150, marginRight: 10 }}
            >
              Preview
            </CoralButton>

            <CoralButton
              className="form-save-button"
              type="success"
              icon="done"
              style={{ width: 150 }}
              onClick={onSaveClick}
            >
              {`Save `}
              { forms.savingForm || forms.loadingGallery ? <Spinner/> : null }
            </CoralButton>

            {
              activeForm && !hideOptions
              ? <CoralButton
                  className="form-publish-button"
                  icon="settings"
                  type="black"
                  style={{ width: 310, marginTop: 10 }}
                  onClick={this.togglePublishModal}
                >
                  Publish options
                </CoralButton>
              : null
            }

          </div>

          {activeForm ? (
            <Modal
              noFooter
              style={styles.publishModal}
              title="Publish Options"
              cancelAction={this.togglePublishModal}
              isOpen={this.state.publishModalOpened}>

              <div style={ styles.dialogContent }>

                {this.getFormStatusSection()}

                <div>
                  <h4 style={ styles.dialogSubTitle }>Embed options</h4>
                  <Tabs tabBarProps={ { style: { justifyContent: 'flex-start' } } } activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })}>
                    <Tab style={ { 'float': 'left' } }>With iframe</Tab>
                    <Tab>Without iframe</Tab>
                  </Tabs>
                  <section>
                    {
                      this.state.activeTab == 0 ?
                        <div>
                          <textarea className="embed-code" readOnly style={styles.embedCode} value={iframeCode}/>
                          <div style={ styles.rightAlignButtons }>
                            {
                              this.state.embedCopied
                              ? <span style={ styles.copied }>Copied!</span>
                              : null
                            }
                            <CopyToClipboard
                              text={iframeCode}
                              onCopy={() => {
                                this.setState({embedCopied: true});
                                setTimeout(() => this.setState({embedCopied: false}), 5000);
                              }}>
                              <Button raised>Copy</Button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      :
                        <div>
                          <textarea className="embed-code-iframe" readOnly style={styles.embedCode} value={scriptCode}/>
                          <div style={ styles.rightAlignButtons }>
                            {
                              this.state.embedCopied
                              ? <span style={ styles.copied }>Copied!</span>
                              : null
                            }
                            <CopyToClipboard
                              text={scriptCode}
                              onCopy={() => {
                                this.setState({embedCopied: true});
                                setTimeout(() => this.setState({embedCopied: false}), 5000);
                              }}>
                              <Button raised>Copy</Button>
                            </CopyToClipboard>
                          </div>
                        </div>
                    }
                  </section>
                </div>

                <div>
                  <h4 style={ [ styles.dialogSubTitle, styles.withMargin ] }>Standalone {isGallery ? 'Gallery' : 'Form'} URL</h4>
                  <textarea className="standalone-form-url" readOnly style={styles.embedCode} value={standaloneCode}/>
                    <div style={ styles.rightAlignButtons }>
                      {
                        this.state.standaloneCopied
                        ? <span style={ styles.copied }>Copied!</span>
                        : null
                      }
                      <CopyToClipboard
                        text={standaloneCode}
                        onCopy={() => {
                          this.setState({standaloneCopied: true});
                          setTimeout(() => this.setState({standaloneCopied: false}), 5000);
                        }}>
                        <Button raised>Copy</Button>
                      </CopyToClipboard>
                    </div>
                </div>

              </div>
            </Modal>
          ): null }

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
    resize: 'none',
    fontSize: '.9em',
    borderRadius: '4px',
    border: '1px solid ' + settings.mediumGrey
  },
  dialogSubTitle: {
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    color: settings.darkColorBase
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30
  },
  copied: {
    paddingLeft: '15px',
    color: '#0a0',
    marginRight: '15px'
  },
  dialogContent: {
    padding: 10
  },
  rightAlignButtons: {
    textAlign: 'right'
  },
  withMargin: {
    margin: '10px 0 0 0'
  },
  textInput: {
    width: '95%',
    margin: '10px 0 0 5%',
    padding: '5px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid ' + settings.mediumGrey
  }
};
