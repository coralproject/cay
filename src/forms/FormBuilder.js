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
  {type: 'TextField', label: 'Short text'},
  {type: 'TextArea', label: 'Text area'},
  {type: 'TextField', label: 'Email address'},
  {type: 'TextField', label: 'Number'},
  {type: 'MultipleChoice', label: 'Radio buttons'},
  {type: 'MultipleChoice', label: 'Multiple choice'},
  {type: 'MultipleChoice', label: 'Drop down'}
];

@connect(({ app, forms }) => ({ app, forms }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  render() {
    const {preview, onClosePreview} = this.props;
    return (
      <div style={styles.builderContainer}>
        <div style={styles.leftPan}>
          <div style={styles.typesContainer}>
            <h4 style={styles.typesTitle}>1. Build form</h4>
            <p style={styles.typesSubTitle}>Drag and drop items to create a form</p>
            <div style={styles.typeList}>
              {askTypes.map((type, i) => (
                <FormComponent key={i} field={type} onClick={this.addToBottom.bind(this, type)} />
              ))}
            </div>
          </div>
        </div>
        <FormDiagram />
        <Modal
          title="Save Search"
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
      id: Math.floor(Math.random() * 99999)
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
  typesContainer: {
    flex: 1,
    marginRight: 20,
    backgroundColor: '#D8D8D8',
    padding: 20,
    color: '#5D5D5D',
    borderRadius: 4
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
  typesTitle: {
    fontSize: 18.78,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5
  },
  typesSubTitle: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 5
  },
  dropPlaceHolder: {
    height: '70px',
    border: '1px dashed #111',
    background: 'rgba(128,128,128,.1)',
    marginBottom: '10px',
    borderRadius: '3px'
  },
  dropPlaceHolderActive: {
    border: '1px dashed #111',
    height: '70px',
    background: 'rgba(0,0,0,.1)',
    padding: '30px',
    borderRadius: '3px',
    marginBottom: '10px'
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    fontSize: '15pt',
    lineHeight: '60px'
  }
};
