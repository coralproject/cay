import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';


const renderSettings = {
  text(field) {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Checkbox label='Max chars.' />
          <input style={{width: 40, height: 20}} type='number' />
        </p>
        <Checkbox label='required' />
      </div>
    );
  },

  ['multiple-choice'](field) {
    return (
      <div>
        <p><TextField label='option 1' /></p>
        <p><TextField label='option 2' /></p>
        <p><TextField label='option 3' /></p>
        <Checkbox label='required' />
      </div>
    )
  }
};

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
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.number
  };

  render() {
    const { connectDragSource, onList } = this.props;
    return connectDragSource(onList ?
      this.renderEdit()
      : this.renderType()
    );
  }

  renderType() {
    const { isDragging, field } = this.props;
    return (
      <div onClick={this.onClick.bind(this)} style={styles.askComponent(isDragging)}>
        {field.label}
      </div>
    );
  }

  renderEdit() {
    const { id, onMove, isLast } = this.props;
    return (
      <div style={styles.editContainer}>
        <div>{id+1}.</div>
        <div style={styles.editBody}>
          <h4 contentEditable="true">Field title</h4>
          <p contentEditable="true">Description text (optional)</p>
          {this.editSettings()}
        </div>
        <div style={styles.arrowContainer}>
          { id !== 0 ? <FaArrowUp onClick={() => onMove('up', id)} style={styles.arrow} /> : null  }
          { !isLast ? <FaArrowDown onClick={() => onMove('down', id)} style={styles.arrow} /> : null  }
        </div>
      </div>
    );
  }

  editSettings() {
    const { field } = this.props;
    return renderSettings[field.type] ? renderSettings[field.type](field) : renderSettings['text'](field);
  }

  onClick() {
    const {onList, field, onClick } = this.props;
    if (!onList) {
      onClick(field);
    }
  }
}

export const styles = {
  askComponent: function(isDragging) {
    return {
      opacity: isDragging ? 0.5 : 1,
      marginBottom: 20,
      shadowOffset: { height: 1, width: 0},
      boxShadow: '0 1px 3px #9B9B9B',
      padding: 20,
      cursor: 'pointer',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 'bold',
      minWidth: 150,
      margin: 5
    };
  },
  editContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    boxShadow: '0 1px 3px #9B9B9B',
    margin: 10,
    borderRadius: 4
  },
  editBody: {
    flex: 1,
    marginLeft: 10
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  arrow: {
    cursor: 'pointer'
  }
};
