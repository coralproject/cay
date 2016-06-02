
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

@connect(({ forms }) => ({ forms }))
class FormDiagram extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { widgets: [], isHovering: false, tempWidgets: [] };
    this.previousState = []; // a copy of state.fields
    this.previousHover = null; // cache the element previously hovered
  }

  onMouseLeave(e) {
    console.log("Mouse out");
  }

  render() {
    const { onFieldSelect, forms } = this.props;
    const { widgets } = forms;
    return (
      <div style={styles.formDiagramContainer}>
        <h4>This is the form name for the public</h4>
        <p>This is the form description for the users</p>
        <div style={styles.formDiagram} onMouseLeave={ this.onMouseLeave.bind(this) }>

          { this.state.tempWidgets.map((field, i) => (
            <DropPlaceHolder key={i} formDiagram={ this } position={ i }>
              <FormComponent onFieldSelect={onFieldSelect}
                onList={true} field={field} position={ i } isLast={i === this.state.tempWidgets.length - 1} id={i} key={i}
                onMove={this.onMove.bind(this)} />
            </DropPlaceHolder>
          ))}
          {
            this.state.isHovering ?
              null
            :
              <DropPlaceHolder empty={ true } formDiagram={ this } position={ this.state.tempWidgets.length } key={ this.state.tempWidgets.length } />
          }
        </div>
      </div>
    );
  }

  onMove(direction, id) {
    this.props.dispatch(moveWidget(id, id + (direction === 'up' ? -1 : 1)));
  }

  appendWidget(field) {
    this.props.dispatch(appendWidget({
      title: field.label,
      type: 'field',
      component: field.type,
      wrapper: {},
      props: {},
      id: Math.floor(Math.random() * 99999)
    }));
  }
}

const askTarget = {

  // Hover changes the component's internal state
  hover(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let targetPosition = component.props.position;

    if (targetPosition != formDiagram.previousHover) {
      formDiagram.previousHover = targetPosition;
    } else {
      return; // hovering the same as before? early return, do nothing.
    }

    let tempWidgets = formDiagram.previousState.slice();
    var draggedItem = monitor.getItem();

    if (draggedItem.onList) {
      console.log(draggedItem.position);
    } else {
      // If hovering over the default empty placeholder (the bottom one)
      if (component.props.empty) {
        tempWidgets[targetPosition] = draggedItem.field;
      } else {
        // if hovering over an existing field
        console.log("Target" , targetPosition);
        let fieldsBefore = tempWidgets.slice(0, targetPosition);
        let fieldsAfter = tempWidgets.slice(targetPosition);
        console.log(fieldsBefore);
        console.log(fieldsAfter);
        tempWidgets = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      }
    }

    formDiagram.setState({ tempWidgets: tempWidgets, isHovering: true });

  },

  // persist state only on drop
  drop(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let fields = formDiagram.previousState.slice();
    let targetPosition = component.props.position;

    var draggedItem = monitor.getItem();

    // If we are dragging an item already on the form
    if (draggedItem.onList) {

      let fieldsCopy = fields.slice();
      console.log(draggedItem.position);
      fieldsCopy.splice(draggedItem.position, 1);
      console.log(fieldsCopy);
      /*
      const index = Math.min(fields.length - 1, hoverIndex);
      const id = monitor.getItem().id;
      fields[id] = fields[index];
      fields[index] = monitor.getItem().field;*/
    } else {
      let fieldsBefore = fields.slice(0, targetPosition);
      let fieldsAfter = fields.slice(targetPosition);
      fields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      formDiagram.previousState = fields.slice();
    }
    formDiagram.setState({ fields: fields, isHovering: false });

  }
};


@DropTarget('form_component', askTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@connect(({ app, forms }) => ({ app, forms }))
class DropPlaceHolder extends Component {

  render() {
    return (
      this.props.connectDropTarget(
        this.props.isOver ?
          <div style={ styles.dropPlaceHolderActive }>
          </div>
        :
          <div style={ this.props.isOver ? styles.dropPlaceHolderActive : styles.dropPlaceHolder }>
            {
              this.props.children ?
                this.props.children
              :
                <p>Drop your question here</p>
            }
          </div>

      )
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
    padding: '10px',
    height: '70px',
    border: '1px dashed red',
    background: 'rgba(128,128,128,.1)'
  },
  dropPlaceHolderActive: {
    border: '1px dashed green',
    height: '40px',
    background: 'rgba(0,0,0,.1)',
    padding: '30px'
  }
};
