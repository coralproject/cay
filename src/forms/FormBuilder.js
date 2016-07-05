import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import uuid from 'node-uuid';

import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FaClose from 'react-icons/lib/fa/close';
import FaSpinner from 'react-icons/lib/fa/spinner';

import { updateForm } from 'forms/FormActions';
import FormDiagram from 'forms/FormDiagram';

import FormComponent, {styles as askComponentStyles} from 'forms/FormComponent';
import { appendWidget, moveWidget } from 'forms/FormActions';

import askTypes from 'forms/WidgetTypes';

@connect(({ app, forms }) => ({ app, forms }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  render() {
    const {preview, onClosePreview, onOpenPreview, forms} = this.props;
    const form = this.props.activeForm ? forms[this.props.activeForm] : forms.form;
    return (
      <div style={styles.builderContainer}>
        <div style={styles.leftPan}>

          <div style={styles.leftContainer}>
            <h4 style={styles.leftContainerTitle}>Question Fields</h4>
            <p>Click on an field type to add it to the form.</p>
            <div style={styles.typeList}>
              {askTypes.map((type, i) => (
                <FormComponent key={i} field={type} onClick={this.addToBottom.bind(this, type)} />
              ))}
            </div>
          </div>

          <div style={styles.leftContainer}>
            <h4 style={styles.leftContainerTitle}>Form Settings</h4>
            <h5 style={ styles.leftContainerSubTitle }>Set Form Status</h5>
            <label style={ styles.switch }>
              <input
                style={ styles.switchInput }
                checked={ form.settings.isActive }
                onChange={ this.onFormStatusChange.bind(this) } type="checkbox" />
              <div style={ styles.switchSlider(form.settings.isActive) }>
                <span style={ styles.switchInactiveText }>Inactive</span>
                <span style={ styles.switchHandle }></span>
                <span style={ styles.switchActiveText }>Active</span>
              </div>
            </label>
            {
              form.settings.isActive ?
                <p>You are accepting submissions.</p> :
                <p>You are not currently accepting submissions.</p>
            }

            {
              !form.settings.isActive ?
                <div>
                  <h5 style={ styles.leftContainerSubTitle }>Custom Inactive Message</h5>
                  <textarea onChange={ this.onInactiveMessageChange.bind(this) } style={ styles.inactiveMessage }
                    defaultValue={ form.settings.inactiveMessage }
                    placeholder="Ex: We are not currently accepting submissions. Thank you."
                    ></textarea>
                </div>
              : null
            }
            <div style={ styles.formSettingsBottomActions }>
              <hr />
              {
                this.props.forms.savedForm ?
                (
                  <div>
                  <p>Copy this code to embed your form.</p>
                  <textarea style={styles.embedCode} value={`<div id=“ask-form”></div><script src=“${this.props.app.elkhornHost}/${this.props.forms.savedForm}.js”></script>`}>
                  </textarea>
                    <a href={ `${this.props.app.elkhornHost}/iframe/${this.props.forms.savedForm}` } target="_blank" style={ styles.formSettingsAction }>Live Form</a>
                  </div>
                ) :
                <p>This form is not saved. Once you save it you will see embed code here.</p>
              }
            </div>
          </div>

        </div>
        <FormDiagram onOpenPreview={ onOpenPreview } activeForm={ this.props.activeForm } />
        { preview ? <Preview
          renderPreview={this.renderPreview.bind(this)}
          onClosePreview={onClosePreview.bind(this)}
          /> : null }
      </div>
    );
  }

  addToBottom(data) {
    this.props.dispatch(appendWidget({
      title: data.title,
      type: 'field',
      component: data.type,
      identity: data.identity ? data.identity : false,
      wrapper: {},
      props: { ...data.props },
      id: Math.floor(Math.random() * 99999) + ''
    }));
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

  renderPreview() {
    if(!this.props.preview) return null;

    const form = Object.assign({}, this.props.forms.form);
    form.steps[0].widgets = this.props.forms.widgets;

    const src = `${this.props.app.elkhornHost}/preview.js?props=${encodeURIComponent(JSON.stringify(form))}`;
    const script = document.createElement('script');
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);

    return (
      <div>
        <FaSpinner style={styles.previewSpinner} />
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
    justifyContent: 'space-between'
  },
  leftPan: {
    flex: 1
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
    backgroundColor: '#D8D8D8',
    padding: 20,
    color: '#5D5D5D',
    borderRadius: 4,
    marginBottom: 20
  },
  formDiagram: {
    height: 'auto',
    minHeight: '300px'
  },
  formDiagramContainer: {
    flex: 2,
    marginRight: 20,
    padding: 20,
    color: '#5d5d5d'
  },
  typeList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  leftContainerTitle: {
    fontSize: 18.78,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leftContainerSubTitle: {
    margin: '20px 0',
    fontSize: '14pt'
  },
  inactiveMessage: {
    width: '100%',
    padding: '10px',
    resize: 'none',
    height: '100px',
    color: '#AAA',
    border: '1px solid #BBB',
    borderRadius: '4px',
    fontSize: '12pt'
  },
  typesSubTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  formSettingsAction: {
    display: 'inline-block',
    textDecoration: 'none',
    color: 'black',
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    border: '1px solid #BBB',
    borderRadius: '3px',
    background: 'white',
    fontSize: '12pt',
    cursor: 'pointer'
  },
  switchSlider: function(isActive) {
    return {
      position: 'absolute',
      width: '280px',
      left: isActive ? '-80px' : '0px',
      background: isActive ? '#292' : '#333',
      transition: 'all .5s',
      cursor: 'pointer',
      height: '45px'
    };
  },
  switch: {
    position: 'relative',
    height: '42px',
    display: 'inline-block',
    padding: 0,
    margin: 0,
    width: '120px',
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,.2)',
    borderRadius: '4px'
  },
  switchHandle: {
    display: 'block',
    'float': 'left',
    position: 'relative',
    width: '30px',
    height: '30px',
    margin: '5px',
    background: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 4px #aaa'
  },
  switchInput: {
    position: 'absolute',
    top: '-9000px',
    left: '-9000px'
  },
  switchActiveText: {
    display: 'block',
    'float': 'left',
    textAlign: 'center',
    width: '80px',
    height: '40px',
    lineHeight: '40px',
    color: 'white',
    textShadow: '0px 1px 2px #444'
  },
  switchInactiveText: {
    display: 'block',
    'float': 'left',
    textAlign: 'center',
    width: '80px',
    height: '40px',
    lineHeight: '40px',
    color: 'white',
    textShadow: '0px 1px 2px #444'
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
  previewSpinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    animationName: 'spin',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },
  embedCode: {
    width: '100%',
    height: 50
  }
};
