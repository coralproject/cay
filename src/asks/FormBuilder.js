
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
            <h4 style={styles.typesTitle}>1. Build form</h4>
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

      },
      footer: {
        permissions: 'Code of conduct'
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

  drop(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const style = askComponentStyles.askComponent();

    const hoverIndex = Math.floor(hoverClientY / (style.height + style.marginBottom / 2));
    const fields = component.state.fields.slice();
    if (monitor.getItem().onList) {
      const index = Math.min(fields.length - 1, hoverIndex);
      const id = monitor.getItem().id;
      fields[id] = fields[index];
      fields[index] = monitor.getItem().field;
    } else {
      const index = Math.min(fields.length, hoverIndex);
      fields.splice(index, 0, monitor.getItem().field);
    }
    component.setState({ fields });
  }
};

@DropTarget('ask_component', askTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class FormDiagram extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    onFieldSelect: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = { fields: [] };
  }

  render() {
    const {connectDropTarget, onFieldSelect} = this.props;
    const {fields} = this.state;
    return (
      <div style={styles.formDiagramContainer}>
        <h4 contentEditable="true">This is the form name for the public</h4>
        <p contentEditable="true">This is the form description for the users</p>
        {connectDropTarget(
          <div style={styles.formDiagram}>
            {fields.map((field, i) => (
              <AskComponent onFieldSelect={onFieldSelect}
                onList={true} field={field} isLast={i === fields.length - 1} id={i} key={i}
                onMove={this.onMove.bind(this)} />
            ))}
          </div>
        )}

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
