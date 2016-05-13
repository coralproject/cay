
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
  {type: 'text', label: 'short text'},
  {type: 'textarea', label: 'text area'},
  {type: 'email', label: 'email address'},
  {type: 'number', label: 'number'},
  {type: 'radio', label: 'radio buttons'},
  {type: 'multiple-choice', label: 'multiple choice'},
  {type: 'dropdown', label: 'drop down'}
];

@connect(({ app }) => ({ app }))
@DragDropContext(HTML5Backend)
export default class FormBuilder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeField: null
    };
  }

  render() {
    const {preview, onClosePreview} = this.props;
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
        <Modal
          title="Save Search"
          isOpen={preview}
          cancelAction={onClosePreview}>
          {this.renderPreview.call(this)}
        </Modal>
      </div>
    );
  }

  renderPreview() {
    if(!this.props.preview) return null;

    const props = {
      settings: {

      },
      footer: {
        permissions: "Code of conduct"
      },
      page: {
        children: [{
          type: "field",
          component: "MultipleChoice",
          title: "Select one or several themes for your story",
          required: true,
          pseudoLabel: true,
          props: {
            multipleChoice: true,
            options: [{title: 'Pablo'}, {title: "Familiy life"}, {title: "School"}, {title: "Law Enforcement"}]
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
        <h3 style={styles.fieldSettingsTitle}>Settings</h3>
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

    return (
      <div>
        {this.renderCommonSettings(field)}
        {this.renderTypeSettings(field)}
      </div>
    );
  }

  renderCommonSettings(field) {
    return (
      <div>
        <Checkbox label="required" />
        <TextField label="label" value={field.label || field.type}/>
      </div>
    );
  }

  renderTypeSettings(field) {
    switch(field.type) {
    case 'text':
      return (
        <div>
          <TextField type="number" label="maxLength" />
        </div>
      );
    case 'textarea':
      return (
        <div>
          <TextField type="number" label="rows" />
        </div>
      );

    }
  }
}

const styles = {
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typesContainer: {
    flex: 1,
    marginRight: 20
  },
  formDiagram: {
    background: '#fff',
    flex: 1,
    minHeight: 500,
    marginRight: 20,
    padding: 20
  },
  fieldSettings: {
    padding: 10,
    paddingTop: 0
  },
  fieldSettingsTitle: {
    fontSize: 20,
    marginBottom: 10
  }
};
