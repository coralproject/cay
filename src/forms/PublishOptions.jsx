import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RadioGroup, Radio } from 'react-mdl';
import { CoralButton, CoralDialog, CoralTabBar, CoralTab } from '../components/ui';
import Copy from '../components/Copy';

import settings from 'settings';

import {
  updateFormStatus,
  updateFormSettings
 } from 'forms/FormActions';

@connect(({ app, forms }) => ({ app, forms }))
export default class PublishOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      publishModalOpened: false,
      formStatus: 'closed',
      activeTab: 0
    };

    this.onFormStatusChange = this.onFormStatusChange.bind(this);
    this.onInactiveMessageChange = this.onInactiveMessageChange.bind(this);
    this.togglePublishModal = this.togglePublishModal.bind(this);
  }

  static propTypes = {
    activeForm: PropTypes.string.isRequired,
    scriptCode: PropTypes.string.isRequired,
    iframeCode: PropTypes.string.isRequired,
    standaloneCode: PropTypes.string.isRequired,
    wordpressShortcode: PropTypes.string.isRequired
  }

  togglePublishModal() {
    this.setState((state) => ({
      publishModalOpened: !state.publishModalOpened
    }));
  }

  onFormStatusChange(e) {
    let status = e.target.value;
    const {forms} = this.props;
    this.setState({ formStatus: status });
    this.props.dispatch(updateFormStatus(forms.activeForm, status));
  }

  onInactiveMessageChange(e) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: e.target.value }));
  }

  showCopied(type) {
    this.setState({
      [`${type}Copied`]: true
    }, () => {
      setTimeout(() => this.setState({
        [`${type}Copied`]: false
      }), 5000);
    });
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
            name="formStatusRadio"
          >
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
            <CoralButton
              type="success"
              style={{ marginTop: 20 }}
              onClick={onSaveClick}
              loading={forms.savingForm}
            >
              Apply
            </CoralButton>
          </div>
        </div>
      : null
    );
  }

  render() {
    const {
      onOpenPreview,
      forms,
      activeForm,
      onSaveClick,
      iframeCode,
      scriptCode,
      standaloneCode,
      wordpressShortcode,
      hideOptions,
      isGallery
      } = this.props;

    return (
      <div style={styles.leftPan}>
          <div>
            <CoralButton
              className="form-preview-button"
              type="primary"
              icon="visibility"
              onClick={onOpenPreview}
              style={styles.previewButton}
            >
              Preview
            </CoralButton>

            <CoralButton
              className="form-save-button"
              type="success"
              icon="done"
              style={styles.saveButton}
              onClick={onSaveClick}
              loading={forms.savingForm || forms.loadingGallery}
            >
              Save
            </CoralButton>

            {
              activeForm && !hideOptions
              ? <CoralButton
                  className="form-publish-button"
                  icon="settings"
                  type="black"
                  style={styles.publishButton}
                  onClick={this.togglePublishModal}
                >
                  Publish options
                </CoralButton>
              : null
            }

          </div>

          {activeForm ? (
            <CoralDialog
              title="Publish Options"
              onCancel={this.togglePublishModal}
              open={this.state.publishModalOpened}
            >
              <div style={ styles.dialogContent }>
                {this.getFormStatusSection()}
                <div>
                  <h4 style={ styles.dialogSubTitle }>Embed options</h4>
                  <CoralTabBar style={ styles.tabBar } activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })}>
                    <CoralTab style={ styles.tab }>With iframe</CoralTab>
                    <CoralTab>Without iframe</CoralTab>
                    <CoralTab>WordPress shortcode</CoralTab>
                  </CoralTabBar>
                  <section>
                    {
                      this.state.activeTab == 0
                      ? <div>
                          <textarea className="embed-code" id="iframeCode" readOnly style={styles.embedCode} value={iframeCode}/>
                          <div style={ styles.rightAlignButtons }>
                            {
                              this.state.embedCopied
                                ? <span style={ styles.copied }>Copied!</span>
                                : null
                            }
                            <Copy
                              target="textarea#iframeCode"
                              onCopy={()=> this.showCopied('embed')}
                              >
                              <CoralButton>
                                Copy
                              </CoralButton>
                            </Copy>
                          </div>
                        </div>
                        : null
                    }
                    {
                      this.state.activeTab === 1
                      ? <div>
                          <textarea className="embed-code-iframe" id="embedCode" readOnly style={styles.embedCode} value={scriptCode}/>
                          <div style={ styles.rightAlignButtons }>
                            {
                              this.state.embedCopied
                                ? <span style={ styles.copied }>Copied!</span>
                                : null
                            }
                            <Copy
                              target="textarea#embedCode"
                              onCopy={()=> this.showCopied('embed')}
                              >
                              <CoralButton>
                                Copy
                              </CoralButton>
                            </Copy>
                          </div>
                        </div>
                      : null
                    }
                    {
                      this.state.activeTab === 2
                      ? <div>
                          <textarea className="wordpress-shortcode" id="shortCode" readOnly style={styles.embedCode} value={wordpressShortcode} />
                          <div style={ styles.rightAlignButtons }>
                            { this.state.embedCopied ? <span style={ styles.copied }>Copied!</span> : null }
                            <Copy target="textarea#shortCode" onCopy={()=> this.showCopied('embed')}>
                              <CoralButton>Copy</CoralButton>
                            </Copy>
                          </div>
                        </div>
                      : null
                    }
                  </section>
                </div>
                <div>
                  <h4 style={ [styles.dialogSubTitle, styles.withMargin] }>Standalone {isGallery ? 'Gallery' : 'Form'} URL</h4>
                  <textarea className="standalone-form-url" id="standaloneCode" readOnly style={styles.embedCode} value={standaloneCode}/>
                  <div style={ styles.rightAlignButtons }>
                    {
                      this.state.standaloneCopied
                        ? <span style={ styles.copied }>Copied!</span>
                        : null
                    }
                    <Copy
                      target="textarea#standaloneCode"
                      onCopy={()=> this.showCopied('standalone')}
                      >
                      <CoralButton>
                        Copy
                      </CoralButton>
                    </Copy>
                  </div>
                </div>
              </div>
            </CoralDialog>
          ): null }
      </div>
    );
  }
}

const styles = {
  previewButton: {
    width: 150,
    marginRight: 10
  },
  saveButton: {
    width: 150
  },
  publishButton: {
    width: 310,
    marginTop: 10
  },
  tabBar: {
    justifyContent: 'flex-start'
  },
  tab: {
    float: 'left'
  },
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
    fontFamily: 'Roboto',
    width: '100%',
    padding: '10px',
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
    fontFamily: 'Roboto',
    width: '95%',
    margin: '10px 0 0 5%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid ' + settings.mediumGrey
  }
};
