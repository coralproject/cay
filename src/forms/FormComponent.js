import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { updateWidget } from 'forms/FormActions';

import FaTrash from 'react-icons/lib/fa/trash';
import FaClose from 'react-icons/lib/fa/close';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up';
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down';

import TextFieldEditor from 'forms/editors/TextFieldEditor';
import TextAreaEditor from 'forms/editors/TextAreaEditor';
import MultipleChoiceEditor from 'forms/editors/MultipleChoiceEditor';
import DateFieldEditor from 'forms/editors/DateFieldEditor';
import NumberFieldEditor from 'forms/editors/NumberFieldEditor';

const renderSettings = {

  DateField(field, props) {
    return (
      <DateFieldEditor field={ field } { ...props } />
    );
  },

  NumberField(field, props) {
    return (
      <NumberFieldEditor field={ field } { ...props } />
    );
  },

  TextField(field, props) {
    return (
      <TextFieldEditor field={ field } { ...props } />
    );
  },

  TextArea(field, props) {
    return (
      <TextAreaEditor field={ field } { ...props } />
    );
  },

  MultipleChoice(field, props) {
    return (
      <MultipleChoiceEditor field={ field } { ...props } />
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
  },
  endDrag(props, monitor, component) {
    // console.log("enddrag");
  }
};

@DragSource('form_component', askSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(({ forms }) => ({
  widgets: forms.widgets
}))
export default class FormComponent extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    // originalField is used to restore params when clicking X
    this.state = { 'expanded': false, field: props.field, originalField: props.field };
  }

  render() {
    const { onList } = this.props;
    return onList ?
      this.renderEdit()
      : this.renderType();
  }

  toggleExpanded() {
    if (this.props.onList) {
      this.setState({ expanded: !this.state.expanded })
    }
  }

  renderType() {
    const { isDragging, field } = this.props;
    return (
      <div onClick={this.onClick.bind(this)} style={styles.askComponent(isDragging)}>
        <field.icon style={styles.icon} />
        <span style={styles.title}>{field.title}</span>
      </div>
    );
  }

  onIdentityClick(e) {
    var field = Object.assign({}, this.state.field);
    field.identity = e.target.checked;
    this.setState({ field: field });
  }

  onDescriptionChange(e) {
    var field = Object.assign({}, this.state.field);
    field.description = e.target.value;
    this.setState({ field: field });
  }

  onTitleChange(e) {
    var field = Object.assign({}, this.state.field);
    field.title = e.target.value;
    this.setState({ field: field });
  }

  onSaveClick(e) {
    this.toggleExpanded();
    this.setState({ originalField: this.state.field });
    this.props.dispatch(updateWidget(this.props.id, this.state.field));
  }

  onCloseClick(e) {
    this.setState({ field: this.state.originalField });
    this.toggleExpanded();
  }

  renderEdit() {
    const { id, onMove, isLast, position, onDelete } = this.props;
    const { field } = this.state;
    return (
      <div>
        {
          !this.state.expanded ?
          <div>
            {
              <div style={ styles.editContainer(this.state.expanded) }>
                <div>{ position + 1 }.</div>
                <div style={styles.editBody} onClick={ this.toggleExpanded.bind(this) }>
                  <h4>
                    { field.title }
                    {
                      field.wrapper && field.wrapper.required ?
                        <span style={ styles.requiredAsterisk }>*</span>
                      :
                        null
                    }
                    {
                      field.identity ?
                        <span style={ styles.identityLabel }>PII</span>
                      :
                        null
                    }
                  </h4>
                </div>
                <div style={styles.arrowContainer}>
                  <button style={styles.delete} onClick={ () => onDelete(position) }><FaTrash /></button>
                  { position !== 0 ? <button onClick={() => onMove('up', position)} style={styles.arrow}><FaArrowCircleUp /></button> : null  }
                  { !isLast ? <button onClick={() => onMove('down', position)} style={styles.arrow}><FaArrowCircleDown /></button> : null  }
                </div>
              </div>
            }
            </div>
          : null
        }
        {
          this.state.expanded ?
            <div style={ styles.editSettingsPanel }>

              <div style={ styles.titleAndDescription }>
                <input
                  onChange={ this.onTitleChange.bind(this) }
                  style={ styles.fieldTitle }
                  defaultValue={ this.props.field.title }
                  type="text"
                  placeholder="Ask readers a question" />
                <input
                  onChange={ this.onDescriptionChange.bind(this) }
                  defaultValue={ field.description }
                  style={ styles.fieldDescription }
                  type="text"
                  placeholder="Description text (optional)" />
              </div>

              { this.editSettings() }

              <div style={ styles.bottomButtons }>
                <button style={ styles.cancelButton } onClick={ this.onCloseClick.bind(this) }><FaClose /> Cancel</button>
                <button style={ styles.saveButton } onClick={ this.onSaveClick.bind(this) }><FaFloppyO /> Save</button>
              </div>

            </div>
          :
            null
        }
      </div>
    );
  }

  onEditorChange(field) {
    var fieldCopy = Object.assign({}, this.state.field, field);
    this.setState({ field: fieldCopy });
  }

  editSettings() {
    const { field } = this.state;
    // Passing listeners down from this class to the editors
    var localProps = { onEditorChange: this.onEditorChange.bind(this) };
    return renderSettings[field.component] ? renderSettings[field.component](field, localProps) : renderSettings['TextField'](field, localProps);
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
      width: '48%',
      textAlign: 'left',
      margin: '1%',
      display: 'flex',
      alignItems: 'center'
    };
  },
  editContainer: function(isExpanded) {
    return {
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      padding: '10px 10px 10px 20px',
      boxShadow: '0 1px 3px #9B9B9B',
      borderRadius: 4,
      height: isExpanded ? '60px' : 'auto',
      lineHeight: '40px'
    }
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
  },
  editSettingsPanel: {
    position: 'relative',
    top: '0px',
    left: '0px',
    width: '100%',
    height: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px #444'
  },
  saveButton: {
    display: 'inline-block',
    fontSize: '11pt',
    height: '40px',
    color: 'white',
    background: '#36B278',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    lineHeight: '40px',
    marginLeft: '10px'
  },
  cancelButton: {
    fontSize: '11pt',
    height: '40px',
    color: '#777',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    lineHeight: '40px',
    marginLeft: '10px'
  },
  label: {
    display: 'block',
    width: '100%',
    marginBottom: '10px'
  },
  fieldTitle: {
    fontSize: '14pt',
    padding: '5px 0',
    width: '50%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  fieldDescription: {
    fontSize: '11pt',
    padding: '5px 0',
    marginBottom: '20px',
    width: '50%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  requiredAsterisk: {
    color: '#B22'
  },
  identity: {
    padding: '20px 0'
  },
  identityLabel: {
    fontSize: '10pt',
    color: 'white',
    padding: '0 5px',
    borderRadius: '3px',
    marginLeft: '15px',
    display: 'inline-block',
    background: '#999',
    height: '30px',
    lineHeight: '30px'
  },
  bottomButtons: {
    textAlign: 'right'
  },
  icon: {
    marginRight: 8,
    fontSize: '11pt'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  }
};
