import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
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

@connect(({ forms }) => ({
  widgets: forms.widgets
}))
export default class AskComponent extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    id: PropTypes.number
  };

  render() {
    const { onList } = this.props;
    return onList ? this.renderEdit() : this.renderType();
  }

  renderType() {
    const { field } = this.props;
    return (
      <div onClick={this.onClick.bind(this)} style={styles.askComponent}>
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
          <TextField onChange={this.onTitleChange.bind(this)} value={field.title} />
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
  askComponent: {
    opacity: 1,
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
