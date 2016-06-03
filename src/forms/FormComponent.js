import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';
import FaTrash from 'react-icons/lib/fa/trash';
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up';
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down';
import { updateWidget } from 'forms/FormActions';


const renderSettings = {
  text(field) {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
      onList: props.onList,
      position: props.position
    };
  }
};

@DragSource('form_component', askSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(({ forms }) => ({
  widgets: forms.widgets
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

  onTitleChange(title) {
    this.props.dispatch(updateWidget(this.props.id, { title }));
  }

  renderEdit() {
    const { id, onMove, isLast, field } = this.props;
    return (
      <div style={styles.editContainer}>
        <div>{id+1}.</div>
        <div style={styles.editBody}>
          <h4>{this.props.field.label}</h4>
          {
            false ?
              <div>
                <p>Description text (optional)</p>
                {this.editSettings()}
              </div>
            :
              null
          }
        </div>
        <div style={styles.arrowContainer}>
          <button style={styles.delete}><FaTrash /></button>
          { id !== 0 ? <button onClick={() => onMove('up', id)} style={styles.arrow}><FaArrowCircleUp /></button> : null  }
          { !isLast ? <button onClick={() => onMove('down', id)} style={styles.arrow}><FaArrowCircleDown /></button> : null  }
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
      opacity: isDragging ? 0.75 : 1,
      marginBottom: 10,
      shadowOffset: { height: 1, width: 0},
      boxShadow: '0 1px 3px #9B9B9B',
      lineHeight: '40px',
      cursor: 'pointer',
      padding: '0 10px',
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 3,
      fontSize: 14,
      fontWeight: 'bold',
      width: '48%',
      textAlign: 'left',
      margin: '1%'
    };
  },
  editContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '10px 10px 10px 20px',
    boxShadow: '0 1px 3px #9B9B9B',
    borderRadius: 4,
    height: 60,
    lineHeight: '40px'
  },
  editBody: {
    flex: 1,
    marginLeft: 10
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow: {
    width: '40px',
    height: '40px',
    padding: '0',
    lineHeight: '20px',
    marginLeft: '5px',
    border: '1px solid #CCC',
    background: 'none',
    borderRadius: '4px',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  delete: {
    width: '40px',
    height: '40px',
    padding: '0',
    lineHeight: '20px',
    marginLeft: '5px',
    border: '1px solid #CCC',
    background: '#DDD',
    borderRadius: '4px',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  }
};
