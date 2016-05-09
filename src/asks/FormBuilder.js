
import React, { Component, PropTypes } from 'react';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import AskComponent, {styles as askComponentStyles} from 'asks/AskComponent';

const askTypes = [
  {type: 'text', label: 'short text'},
  {type: 'textarea', label: 'text area'},
  {type: 'email', label: 'email address'},
  {type: 'number', label: 'number'},
  {type: 'radio', label: 'radio buttons'},
  {type: 'multiple-choice', label: 'multiple choice'},
  {type: 'dropdown', label: 'drop down'}
];

@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeField: null
    };
  }

  render() {
    const {activeField} = this.state;
    return (
      <div style={styles.builderContainer}>
        <div style={styles.typesContainer}>
          {askTypes.map((type, i) => (
            <AskComponent key={i} field={type} />
          ))}
        </div>
        <FormDiagram onFieldSelect={this.onFieldSelect.bind(this)} />
        <FieldSettings field={activeField} />
      </div>
    );
  }

  onFieldSelect(field) {
    this.setState({
      activeField: field
    });
  }
}

const askTarget = {
  drop(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverClientY = clientOffset.y - (hoverBoundingRect.top);
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
    return connectDropTarget(
      <div style={styles.formDiagram}>
        {fields.map((field, i) => (
          <AskComponent onFieldSelect={onFieldSelect}
            onList={true} field={field} id={i} key={i} />
        ))}
      </div>
    );
  }
}

class FieldSettings extends Component {
  render() {
    return (
      <div style={styles.fieldSettings}>
        <h3>Settings</h3>
        {this.renderSettings()}
      </div>
    );
  }

  renderSettings() {
    const {field} = this.props;
    if(!field) {
      return (
        <p>Click on a form field and access to its properties.</p>
      );
    }
    switch(field.type) {
    case 'text':
      return (
        <div>
          <input placeholder='maxLength' />
        </div>
      );
    case 'email':
      return (
        <div>
          <label>Required</label>
          <input type="checkbox" />
        </div>
      );
    }
  }
}

const styles = {
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  },
  typesContainer: {
    flex: 1,
    marginRight: 20
  },
  formDiagram: {
    background: '#fff',
    flex: 1,
    height: 500,
    marginRight: 20,
    padding: 20
  },
  fieldSettings: {
    flex: 1,
    transition: 'all 2s linear'
  }
};
