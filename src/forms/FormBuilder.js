
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

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
      id: Math.floor(Math.random() * 99999) + '' // cast to string for pillar
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

@connect(({ forms }) => ({ forms }))
class FormDiagram extends Component {

  render() {
    const { onFieldSelect, forms } = this.props;
    const { widgets } = forms;
    return (
      <div style={styles.formDiagramContainer}>
        <h4>This is the form name for the public</h4>
        <p>This is the form description for the users</p>
        <div style={styles.formDiagram}>
          {widgets.map((widget, i) => (
            <FormComponent onFieldSelect={onFieldSelect}
              onList={true} field={widget} isLast={i === widgets.length - 1} id={i} key={i}
              onMove={this.onMove.bind(this)} />
          ))}
        </div>
      </div>
    );
  }

  onMove(direction, id) {
    this.props.dispatch(moveWidget(id, id + (direction === 'up' ? -1 : 1)));
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
    height: '70vh',
    overflowY: 'scroll'
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
  }
};
