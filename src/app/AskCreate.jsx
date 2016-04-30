import React, { Component, PropTypes } from 'react';
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

  render() {
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
          <FormDiagram />
        </div>
      </Page>
    );
  }
}

const askTarget = {
  drop(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const hoverBoundingRect = React.findDOMNode(component).getBoundingClientRect();
    const hoverClientY = clientOffset.y - (hoverBoundingRect.top);
    const style = styles.askComponent();
    const hoverIndex = Math.floor(hoverClientY / (style.height + style.marginBottom / 2));
    const fields = component.state.fields.slice();
    const index = Math.min(fields.length, hoverIndex);
    //console.log(index, hoverIndex);
    fields.splice(index, 0, monitor.getItem().type);
    component.setState({ fields });

  }
};

@DropTarget('ask_component', askTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class FormDiagram extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { fields: [] };
  }

  render() {
    const {connectDropTarget} = this.props;
    const {fields} = this.state;
    return connectDropTarget(
      <div style={styles.formDiagram}>
        {fields.map((field, i) => (
          <AskComponent type={field} key={i} />
        ))}
      </div>
    );
  }
}

const askSource = {
  beginDrag(props) {
    return {
      type: props.type
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
      <div style={styles.askComponent(isDragging)}>
        {type}
      </div>
    );
  }
}

const styles = {
  textField: {
    marginRight: 20
  },
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-around'
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
    margin: 20
  },
  formDiagram: {
    background: '#fff',
    flex: 2,
    height: 500,
    margin: 20
  }
};
