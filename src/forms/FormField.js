import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

// Icons
import FaTrash from 'react-icons/lib/fa/trash';
import FaClose from 'react-icons/lib/fa/close';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

// DnD dependencies
import { DragSource } from 'react-dnd';
import DragHandler from 'forms/DragHandler';

// Actions
import { updateWidget } from 'forms/FormActions';

// Field Editors
import EditorFactory from 'forms/EditorFactory';

@DragSource('DraggableFormField', DragHandler, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(({ forms }) => ({
  isDragging: forms.isDragging,
  widgets: forms.widgets
}))
export default class FormField extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    // fieldBackup is used to restore params when clicking Cancel
    this.state = { 'expanded': props.autoExpand, field: props.field, fieldBackup: props.field };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: nextProps.field, fieldBackup: nextProps.field });
  }

  toggleExpanded() {
    this.props.container.setState({ autoExpand: -1 });
    if (this.props.onList) {
      this.setState({ expanded: !this.state.expanded });
    }
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
    if (e) e.stopPropagation();
    this.toggleExpanded();
    this.setState({ fieldBackup: this.state.field });
    this.props.dispatch(updateWidget(this.props.id, this.state.field));
  }

  onCancelClick(e) {
    if (e) e.stopPropagation();
    this.setState({ field: this.state.fieldBackup });
    this.toggleExpanded();
  }

  onEditorChange(field) {
    var fieldCopy = Object.assign({}, this.state.field, field);
    this.setState({ field: fieldCopy });
  }

  onClick() {
    const {onList, field, onClick } = this.props;
    if (!onList) {
      onClick(field);
    }
  }

  onKeyUp(e) {
    switch (e.keyCode) {
    case 13: // ENTER
      this.onSaveClick();
      break;
    case 27: // ESCAPE
      this.onCancelClick();
      break;
    }
  }

  getFieldEditor() {
    const { field } = this.state;
    // Passing listeners down from this class to the editors
    var localProps = { onEditorChange: this.onEditorChange.bind(this) };
    return EditorFactory[field.component] ? EditorFactory[field.component](field, localProps) : EditorFactory['TextField'](field, localProps);
  }

  render() {
    return this.props.connectDragSource(
      <div>
        {
          !this.props.isDragging && this.state.expanded
          ? this.renderExpanded()
          : this.renderCollapsed()
        }
      </div>
    );
  }

  renderCollapsed() {
    const { id, onMove, isLast, position, onDelete, onDuplicate } = this.props;
    const { field } = this.state;

    return (
      <div>
        {
          <div style={ styles.fieldContainer(!this.props.isDragging && this.state.expanded) } key={ id } onClick={ this.toggleExpanded.bind(this) }>
            <div style={ styles.fieldAndPosition }>
              <div style={ styles.fieldPosition }>{ position + 1 }.</div>
              <h4 style={styles.editBody}>
                { field.title ? field.title : field.friendlyType }
                {
                  field.wrapper && field.wrapper.required ?
                    <span style={ styles.requiredAsterisk }>*</span>
                  :
                    null
                }
                {
                  field.identity ?
                    <span style={ styles.identityLabel }><FaUser/></span>
                  :
                    null
                }
              </h4>
            </div>
            <div style={styles.arrowContainer}>
              <button style={styles.copy} onClick={ onDuplicate.bind(this, position) }><FaCopy /></button>
              <button style={styles.delete} onClick={ onDelete.bind(this, position) }><FaTrash /></button>
              <button onClick={ position !== 0 ? onMove.bind(this, 'up', position) : null } style={styles.arrow} disabled={position === 0}><FaArrowUp /></button>
              <button onClick={ !isLast ? onMove.bind(this, 'down', position) : null } style={styles.arrow} disabled={!!isLast}><FaArrowDown /></button>
            </div>
          </div>
        }
        </div>
    );
  }

  renderExpanded() {
    const { field } = this.state;

    return  (
      <div style={ styles.editSettingsPanel } onKeyUp={ this.onKeyUp.bind(this) }>

        <div style={ styles.titleAndDescription }>
          <input
            onChange={ this.onTitleChange.bind(this) }
            style={ styles.fieldTitle }
            defaultValue={ field.title }
            type="text"
            placeholder={ `Ask readers a question (${ field.friendlyType })` }
            autoFocus={ true } />
          <input
            onChange={ this.onDescriptionChange.bind(this) }
            defaultValue={ field.description }
            style={ styles.fieldDescription }
            type="text"
            placeholder="Description text (optional)" />
        </div>

        { this.getFieldEditor() }

        <div style={ styles.bottomButtons }>
          <button style={ styles.cancelButton } onClick={ this.onCancelClick.bind(this) }><FaClose /> Cancel</button>
          <button style={ styles.saveButton } onClick={ this.onSaveClick.bind(this) }><FaFloppyO /> Save</button>
        </div>

      </div>
    );
  }

}

export const styles = {
  fieldContainer: function(isExpanded) {
    return {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      width: '100%',
      boxShadow: '0 1px 3px #9B9B9B',
      borderRadius: 4,
      height: isExpanded ? '60px' : 'auto',
      lineHeight: '20px',
      cursor: 'pointer'
    };
  },
  editBody: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  arrowPlaceHolder: {
    width: '25px',
    height: '30px',
    padding: 0,
    marginLeft: '5px',
    display: 'inline-block'
  },
  delete: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  copy: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
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
    width: '75%',
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
  fieldPosition: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  fieldAndPosition: {
    display: 'flex',
    flexGrow: '1'
  },
  requiredAsterisk: {
    color: '#B22'
  },
  identity: {
    padding: '20px 0'
  },
  identityLabel: {
    color: '#333',
    padding: '0 5px',
    marginLeft: '5px',
    display: 'inline-block'
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
    fontWeight: 'bold',
    lineHeight: '1em'
  }
};
