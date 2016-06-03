import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FormDiagram from 'forms/FormDiagram';

import FormComponent, {styles as askComponentStyles} from 'forms/FormComponent';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';
import Modal from 'components/modal/Modal';
import { appendWidget, moveWidget } from 'forms/FormActions';

const askTypes = [
  {type: 'TextField', title: 'Short Text'},
  {type: 'TextArea', title: 'Long Text'},
  {type: 'TextField', title: 'Numbers'},
  {type: 'MultipleChoice', title: 'Multiple choice'},
  {type: 'TextField', title: 'Email'},
  {type: 'TextField', title: 'Date'},
  {type: 'LocationDropdown', title: 'Location'},
  {type: 'TextField', title: 'Phone number'}
];

@connect(({ app, forms }) => ({ app, forms }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  render() {
    const {preview, onClosePreview} = this.props;
    return (
      <div style={styles.builderContainer}>
        <div style={styles.leftPan}>

          <div style={styles.leftContainer}>
            <h4 style={styles.leftContainerTitle}>Question Fields</h4>
            <p style={styles.typesSubTitle}>Drag and drop items to create a form</p>
            <div style={styles.typeList}>
              {askTypes.map((type, i) => (
                <FormComponent key={i} field={type} onClick={this.addToBottom.bind(this, type)} />
              ))}
            </div>
          </div>

          <div style={styles.leftContainer}>
            <h4 style={styles.leftContainerTitle}>Form Settings</h4>
            <h5 style={ styles.leftContainerSubTitle }>Set Form Status</h5>
            <label>
              <input type="checkbox" /> Active
            </label>
            <p>You are not currently accepting submissions.</p>
            <h5 style={ styles.leftContainerSubTitle }>Custom Inactive Message</h5>
            <textarea style={ styles.inactiveMessage } defaultValue="We are not currently accepting submissions. Thank you."></textarea>
            <div style={ styles.formSettingsBottomActions }>
              <button style={ styles.formSettingsAction }>Embed Form</button>
              <button style={ styles.formSettingsAction }>Live Form</button>
            </div>
          </div>

        </div>
        <FormDiagram />
        <Modal
          title="Form Preview"
          isOpen={preview}
          confirmAction={() => console.log('worked')}
          cancelAction={onClosePreview}>
          {this.renderPreview.call(this)}
        </Modal>
      </div>
    );
  }

  addToBottom(data) {
    this.props.dispatch(appendWidget({
      title: data.label,
      type: 'field',
      component: data.type,
      wrapper: {},
      props: {},
      id: Math.floor(Math.random() * 99999) + ''
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
        <div id="ask-form"></div>
      </div>
    );
  }
}

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
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    border: '1px solid #BBB',
    borderRadius: '3px',
    background: 'white',
    fontSize: '12pt',
    cursor: 'pointer'
  }
};
