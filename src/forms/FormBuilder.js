import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Actions
import { saveForm, appendWidget, updateForm } from 'forms/FormActions';
import { showFlashMessage } from 'flashMessages/FlashMessagesActions';

import Spinner from 'components/Spinner';
import FaClose from 'react-icons/lib/fa/close';

import FormDiagram from 'forms/FormDiagram';
import { Header, Sidebar } from 'forms/FormBuilderLayout';


@connect(({ app, forms }) => ({ app, forms }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    const { preview, onClosePreview, onOpenPreview, forms, activeForm, app } = this.props;
    const form = activeForm ? forms[activeForm] : forms.form;
    return (
      <div>
        <Header form={form} forms={forms} activeForm={activeForm}
          onOpenPreview={onOpenPreview}
          onTitleChange={this.onFormTitleChange.bind(this)}
          onSaveClick={this.onSaveClick.bind(this)} />
        <div style={styles.builderContainer}>
          <Sidebar form={form}
            create={!activeForm}
            onFormStatusChange={this.onFormStatusChange.bind(this)}
            addToBottom={this.addToBottom.bind(this)}
            activeForm={activeForm}
            app={app} />
          <FormDiagram activeForm={ this.props.activeForm } />
          { preview ? <Preview
            renderPreview={this.renderPreview.bind(this)}
            onClosePreview={onClosePreview.bind(this)}
            /> : null }
        </div>
      </div>
    );
  }

  addToBottom(data) {
    this.props.dispatch(appendWidget({
      title: data.title,
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
      .then(data => {
        if (data && data.id) {
          this.props.dispatch(showFlashMessage('Your form saved.', 'success'));
          return !activeForm && router.push(`/forms/${data.id}`);
        } else {
          this.props.dispatch(showFlashMessage('Uh-oh, we can\'t save your form. Try again or report the error to your technical team', 'warning'));
        }
      });
  }

  onFormStatusChange(e) {
    let { form } = this.props.forms;
    var newSettings = Object.assign({}, form.settings, { isActive: e.target.checked });
    this.props.dispatch(updateForm({
      settings: newSettings
    }));
  }

  onInactiveMessageChange(e) {
    let { form } = this.props.forms;
    var newSettings = Object.assign({}, form.settings, { inactiveMessage: e.target.value });
    this.props.dispatch(updateForm({
      settings: newSettings,
      id: uuid.v4()
    }));
  }

  onFormTitleChange(e) {
    const { form, activeForm } = this.props.forms;
    const header = activeForm ? this.props.forms[activeForm].header : form.header;
    this.props.dispatch(updateForm({
      header: {
        ...header,
        title: e.target.value
      }
    }));
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
        <div id="ask-form"></div>
      </div>
    );
  }
}

const Preview = ({ onClosePreview, renderPreview }) => (
  <div style={ styles.previewPane }>
    <div style={ styles.previewActions }>
      <span style={ styles.previewClose } onClick={onClosePreview}><FaClose /></span>
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
    borderLeft: '1px solid #eee',
    boxShadow: '-5px -5px 20px #999',
    display: 'flex',
    flexDirection: 'column'
  },
  previewActions: {
    padding: '10px',
    flex: 'none',
    height: '60px',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10
  },
  previewClose: {
    padding: '0 10px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '12pt',
    cursor: 'pointer'
  },
  previewContent: {
    overflow: 'auto',
    flexGrow: '2'
  },
  previewContainer: {
    position: 'relative'
  },
  previewSpinner: {
    position: 'absolute',
    textAlign: 'center',
    top: '100px',
    fontSize: '30pt',
    width: '200px',
    left: '50%',
    marginLeft: '-100px' // width / 2
  }
};
