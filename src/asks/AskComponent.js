import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';

const askSource = {
  beginDrag(props) {
    return {
      field: props.field,
      id: props.id,
      onList: props.onList
    };
  }
};

@DragSource('ask_component', askSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class AskComponent extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, field } = this.props;
    return connectDragSource(
      <div onClick={this.onClick.bind(this)} style={styles.askComponent(isDragging)}>
        {field.type}
      </div>
    );
  }

  onClick() {
    const {onList, field, onFieldSelect} = this.props;
    if (onList) {
      onFieldSelect(field);
    }
  }
}

export const styles = {
  askComponent: function(isDragging) {
    return {
      opacity: isDragging ? 0.5 : 1,
      border: '1px dashed #333',
      marginBottom: 20,
      padding: 20,
      cursor: 'pointer',
      height: 50
    };
  }
};
