
import React, { Component, PropTypes } from 'react';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import AskComponent, {styles as askComponentStyles} from 'asks/AskComponent';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';
import Modal from 'components/modal/Modal';
import {connect} from 'react-redux';


const askTypes = [
  {type: 'text', label: 'Short text'},
  {type: 'textarea', label: 'Text area'},
  {type: 'email', label: 'Email address'},
  {type: 'number', label: 'Number'},
  {type: 'radio', label: 'Radio buttons'},
  {type: 'multiple-choice', label: 'Multiple choice'},
  {type: 'dropdown', label: 'Drop down'}
];

@connect(({ app }) => ({ app }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {

  render() {
    const {preview, onClosePreview} = this.props;
    return (
      <div style={styles.builderContainer}>
        <div style={styles.leftPan}>
          <div style={styles.typesContainer}>
            <h4 style={styles.typesTitle}>Question Fields</h4>
            <p style={styles.typesSubTitle}>Drag and drop items to create a form</p>
            <div style={styles.typeList}>
              {askTypes.map((type, i) => (
                <AskComponent key={i} field={type} onClick={this.addToBottom.bind(this, type)} />
              ))}
            </div>
          </div>
        </div>
        <FormDiagram />
        <Modal
          title="Save Search"
          isOpen={preview}
          cancelAction={onClosePreview}>
          {this.renderPreview.call(this)}
        </Modal>
      </div>
    );
  }

  addToBottom(type) {
    this.setState({
      fields: fields.concat(type)
    });
  }

  renderPreview() {
    if(!this.props.preview) return null;

    const props = {
      settings: {
    		showFieldNumbers: true
      },
      header: {
        title: 'Some Ask'
      },
      footer: {
        permissions: 'Code of conduct'
      },
      finishedScreen: {
		    title: 'Thanks.',
		    description: 'This is a more verbose thank you message.'
      },
      page: {
        children: [{
          type: 'field',
          component: 'MultipleChoice',
          title: 'Select one or several themes for your story',
          required: true,
          pseudoLabel: true,
          props: {
            multipleChoice: true,
            options: [{title: 'Pablo'}, {title: 'Familiy life'}, {title: 'School'}, {title: 'Law Enforcement'}]
          }
        }]
      }
    };

    const src = `${this.props.app.elkhornHost}/preview.js?props=${JSON.stringify(props)}`;
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

const askTarget = {

  hover(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let targetPosition = component.props.position;

    if (targetPosition != formDiagram.previousHover) {
      formDiagram.previousHover = targetPosition;
    } else {
      return; // hovering the same as before? early return, do nothing.
    }

    let fields = formDiagram.previousState.slice();
    var draggedItem = monitor.getItem();

    if (draggedItem.onList) {

    } else {
      // If hovering over the default empty placeholder (the bottom one)
      if (component.props.empty) {
        console.log(targetPosition);
        fields[targetPosition] = draggedItem.field;
        //fields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      } else {
        // if hovering over an existing field
        let fieldsBefore = fields.slice(0, targetPosition);
        let fieldsAfter = fields.slice(targetPosition);
        fields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      }
    }

    formDiagram.setState({ fields: fields, isHovering: true });

  },

  drop(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let fields = formDiagram.previousState.slice();
    let targetPosition = component.props.position;

    var draggedItem = monitor.getItem();

    if (draggedItem.onList) {
      const index = Math.min(fields.length - 1, hoverIndex);
      const id = monitor.getItem().id;
      fields[id] = fields[index];
      fields[index] = monitor.getItem().field;
    } else {
      let fieldsBefore = fields.slice(0, targetPosition);
      let fieldsAfter = fields.slice(targetPosition);
      fields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      formDiagram.previousState = fields.slice();
    }
    formDiagram.setState({ fields: fields, isHovering: false });

  }
};

class FormDiagram extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    onFieldSelect: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = { fields: [], isHovering: false };
    this.previousState = []; // a copy of state.fields
    this.previousHover = null; // cache the element previously hovered
  }

  render() {
    const {connectDropTarget, onFieldSelect} = this.props;
    const {fields} = this.state;
    return (
      <div style={styles.formDiagramContainer}>
        <h4>This is the form name for the public</h4>
        <p>This is the form description for the users</p>

          <div style={styles.formDiagram}>
            {fields.map((field, i) => (
              <DropPlaceHolder formDiagram={ this } position={ i }>
                <AskComponent onFieldSelect={onFieldSelect}
                  onList={true} field={field} isLast={i === fields.length - 1} id={i} key={i}
                  onMove={this.onMove.bind(this)} />
              </DropPlaceHolder>
            ))}
            {
              this.state.isHovering ?
                null
              :
                <DropPlaceHolder empty={ true } formDiagram={ this } position={ fields.length } />
            }

          </div>

      </div>
    );
  }

  onMove(direction, id) {
    const { fields } = this.state;
    const changeWith = direction === 'up' ? id - 1 : id + 1;

    const newFields = [...fields];
    const aux = newFields[id];
    newFields[id] = newFields[changeWith];
    newFields[changeWith] = aux;
    this.setState({ fields: newFields });
  }
}

@DropTarget('ask_component', askTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
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
    minHeight: '300px',
    border: '2px solid blue'
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
