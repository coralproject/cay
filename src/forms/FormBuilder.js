import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Actions
import {
  saveForm,
  appendWidget,
  updateFormSettings,
  updateFormHeader,
  updateFormFooter
 } from 'forms/FormActions';
import { showFlashMessage } from 'flashmessages/FlashMessagesActions';

// Icons
import Spinner from 'components/Spinner';
import FaClose from 'react-icons/lib/fa/close';

// Components
import FormFieldsContainer from 'forms/FormFieldsContainer';
import FormBuilderSidebar from 'forms/FormBuilderSidebar';
import { Header } from 'forms/FormBuilderLayout';


@connect(({ app, forms }) => ({ app, forms }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    // An empty form with no changes is valid as 'saved'
    this.saved = true;
    this.state = { openDialog: false }

    this.onPublishOptions = this.onPublishOptions.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.addToBottom = this.addToBottom.bind(this);
    this.onFormTitleChange = this.onFormTitleChange.bind(this);
    this.markAsUnsaved = this.markAsUnsaved.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  markAsUnsaved() {
    this.saved = false;
  }

  hookRouter() {
    this.context.router.setRouteLeaveHook(this.props.route, () => {
      if (this.saved === false) {
        return 'This form has unsaved changes. Are you sure you want to leave this page?';
      }
    });
  }

  componentDidMount() {
    this.hookRouter();
  }

  render() {
    const { preview, onClosePreview, onOpenPreview, forms, activeForm, app } = this.props;
    const form = activeForm ? forms[activeForm] : forms.form;
    return (
      <div>
        <Header form={form} forms={forms} activeForm={activeForm}
          onTitleChange={this.onFormTitleChange}
          onSaveClick={this.onSaveClick} />
        <div style={styles.builderContainer}>
          <FormBuilderSidebar
            create={!activeForm}
            onOpenPreview={onOpenPreview}
            onPublishOptions={this.onPublishOptions}
            onSaveClick={this.onSaveClick}
            addToBottom={this.addToBottom}
            activeForm={activeForm}
            openDialog={this.state.openDialog}
            app={app}
            markAsUnsaved={this.markAsUnsaved}
            />
          <FormFieldsContainer activeForm={ this.props.activeForm } markAsUnsaved={this.markAsUnsaved} />
          { preview
            ? <div>
                <div style={ styles.previewOverlay }></div>
                <Preview
                  renderPreview={this.renderPreview}
                  onClosePreview={onClosePreview.bind(this)}
                  />
              </div>
            : null
          }
        </div>
      </div>
    );
  }

  addToBottom(data) {
    this.markAsUnsaved();
    this.props.dispatch(appendWidget({
      title: data.title,
      description: data.description,
      friendlyType: data.friendlyType,
      type: 'field',
      component: data.type,
      identity: data.identity ? data.identity : false,
      wrapper: {},
      props: { ...data.props },
      id: uuid.v4()
    }));
  }

  onSaveClick() {
    const { router } = this.context;
    const { forms, dispatch, activeForm } = this.props;
    const { form, widgets } = forms;
    dispatch(saveForm(activeForm ? forms[activeForm] : form, widgets))
      .then(response => {
        if (response.data && response.data.id) {
          this.saved = true;
          this.props.dispatch(showFlashMessage('Your form saved.', 'success'));
          return !activeForm && router.push(`/forms/${response.data.id}`);
        } else {
          this.props.dispatch(showFlashMessage('Uh-oh, we can\'t save your form. Try again or report the error to your technical team', 'warning', 4000));
        }
      });
  }

  onPublishOptions() {
    this.setState({ openDialog: !this.state.openDialog });
  }

  onFormTitleChange(e) {
    this.markAsUnsaved();
    this.props.dispatch(updateFormHeader({title: e.target.value}));
  }

  renderPreview() {
    if(!this.props.preview) return null;

    const form = this.props.activeForm ? this.props.forms[this.props.activeForm] : this.props.forms.form;
    const previewForm = {...form};
    previewForm.steps[0].widgets = this.props.forms.widgets;

    const src = `${this.props.app.elkhornHost}/preview.js?props=${encodeURIComponent(JSON.stringify(previewForm))}`;
    const script = document.createElement('script');
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);

    return (
      <div style={ styles.previewContainer }>
        <div style={ styles.previewSpinner }><Spinner /></div>
        <div style={ styles.previewHeader}>Preview</div>
        <div id="ask-form"></div>
      </div>
    );
  }
}

const Preview = ({ onClosePreview, renderPreview }) => (
  <div style={ styles.previewPane }>
    <div style={ styles.previewActions }>
      <span style={ styles.previewClose } onClick={onClosePreview}><span style={ styles.previewCloseIcon }><FaClose /></span></span>
    </div>
    <div style={ styles.previewContent }>
      {renderPreview()}
    </div>
  </div>
);

const styles = {
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse'
  },
  previewPane: {
    position: 'fixed',
    right: '0px',
    top: '0px',
    height: '100%',
    width: '600px',
    background: 'white',
    boxShadow: '-5px -5px 20px #999',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100
  },
  previewActions: {
    padding: '10px',
    flex: 'none',
    height: '60px',
    position: 'absolute',
    top: 40,
    left: -40,
    zIndex: 10
  },
  previewHeader: {
    background: '#F36451',
    color: 'white',
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    padding: '0 20px'
  },
  previewClose: {
    padding: '10px 0px',
    lineHeight: '80px',
    fontSize: '12pt',
    cursor: 'pointer',
    borderRight: '30px solid white',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    height: '0px',
    width: '50px',
    zIndex: 100
  },
  previewCloseIcon: {
    position: 'absolute',
    top: 8,
    left: 17
  },
  previewContent: {
    overflow: 'auto',
    flexGrow: '2'
  },
  previewContainer: {
    position: 'relative',
    zIndex: 100
  },
  previewSpinner: {
    position: 'absolute',
    textAlign: 'center',
    top: '100px',
    fontSize: '30pt',
    width: '200px',
    left: '50%',
    marginLeft: '-100px' // width / 2
  },
  previewOverlay: {
    position: 'fixed',
    backgroundColor: '#E2E2E2',
    opacity: '.8',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 10
  }
};
