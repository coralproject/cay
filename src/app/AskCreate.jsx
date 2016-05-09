import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Radium from 'radium';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import TextField from 'components/forms/TextField';
import TextArea from 'components/forms/TextArea';

const askTypes = ['text', 'email', 'multiple choice'];

@DragDropContext(HTML5Backend)
@Radium
export default class AskCreate extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeField: null
    };
  }

  render() {
    const {activeField} = this.state;
    return (
      <Page>
        <ContentHeader title={window.L.t('Create a new ask')} />
        <div>
          <TextField style={styles.textField} label={window.L.t('Name')} />
          <TextField style={styles.textField} label={window.L.t('Thank you message')} />
        </div>
        <div>
          <TextArea label={window.L.t('Description')} />
        </div>
        <div style={styles.builderContainer}>
          <div style={styles.typesContainer}>
            {askTypes.map((type, i) => (
              <AskComponent key={i} type={type} />
            ))}
          </div>
          <FormDiagram onFieldSelect={this.onFieldSelect.bind(this)} />
          <FieldSettings field={activeField} />
        </div>
      </Page>
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
    const style = styles.askComponent();

    const hoverIndex = Math.floor(hoverClientY / (style.height + style.marginBottom / 2));
    const fields = component.state.fields.slice();
    if (monitor.getItem().onList) {
      const index = Math.min(fields.length - 1, hoverIndex);
      const id = monitor.getItem().id;
      fields[id] = fields[index];
      fields[index] = monitor.getItem().type;
    } else {
      const index = Math.min(fields.length, hoverIndex);
      fields.splice(index, 0, monitor.getItem().type);
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
            onList={true} type={field} id={i} key={i} />
        ))}
      </div>
    );
  }
}

const askSource = {
  beginDrag(props) {
    return {
      type: props.type,
      id: props.id,
      onList: props.onList
    };
  }
};

@DragSource('ask_component', askSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class AskComponent extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, type } = this.props;
    return connectDragSource(
      <div onClick={this.onClick.bind(this)} style={styles.askComponent(isDragging)}>
        {type}
      </div>
    );
  }

  onClick() {
    const {onList, type, onFieldSelect} = this.props;
    if (onList) {
      onFieldSelect(type);
    }
  }
}

class FieldSettings extends Component {
  render() {
    const {field} = this.props;
    if(!field) return (<span></span>);
    return (
      <div style={styles.fieldSettings}>
        <h3>Settings</h3>
        {this.renderSettings()}
      </div>
    );
  }

  renderSettings() {
    const {field} = this.props;
    switch(field) {
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
  textField: {
    marginRight: 20
  },
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  },
  askComponent: function(isDragging) {
    return {
      opacity: isDragging ? 0.5 : 1,
      background: 'rgb(68, 68, 68)',
      color: '#fff',
      marginBottom: 20,
      padding: 20,
      cursor: 'pointer',
      height: 50
    };
  },
  typesContainer: {
    flex: 1,
    marginRight: 20
  },
  formDiagram: {
    background: '#fff',
    flex: 2,
    height: 500,
    marginRight: 20
  },
  fieldSettings: {
    flex: 1
  }
};
