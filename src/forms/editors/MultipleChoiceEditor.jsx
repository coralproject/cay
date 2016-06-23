import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';

import FaTimesCircle from 'react-icons/lib/fa/times-circle';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class MultipleChoiceEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { options: props.field.props.options && props.field.props.options.length ?
        props.field.props.options
      :
        [ { title: 'Sample option 1' } ]
    };
  }

  updateFieldOptions(options) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { options: options });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  addOption(i) {
    var optionsCopy = this.state.options.slice();
    optionsCopy.push({ title: 'Sample option ' + (this.state.options.length + 1) });
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  removeOption(i) {
    var optionsCopy = this.state.options.slice();
    optionsCopy.splice(i, 1);
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  updateOption(index, value) {
    var optionsCopy = this.state.options.slice();
    optionsCopy[index] = { title: value };
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  onMultipleClick(e) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { multipleChoice: e.target.checked });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onRequiredClick(e) {
    let { field } = this.props;
    let updatedWrapper = Object.assign({}, field.wrapper, { required: e.target.checked });
    let updatedField = Object.assign({}, field, { wrapper: updatedWrapper });
    this.props.onEditorChange(updatedField);
  }

  render() {
    let { field } = this.props;
    return (
      <div>
        <div style={ styles.options }>
          {
            this.state.options.map((option, i) => {
                return (
                  <div key={ i }>
                    <TextField label={ option.title } onChange={ this.updateOption.bind(this, i) } />
                    {
                      i > 0 ?
                        <button style={ styles.plusMinus } onClick={ this.removeOption.bind(this, i) }><FaTimesCircle /></button>
                      : null
                    }
                  </div>
                )
            })
          }
          <button style={ styles.addOption } onClick={ this.addOption.bind(this) }>Add option</button>
        </div>
        <label style={ styles.required }>
          <input type="checkbox"
            onClick={ this.onMultipleClick.bind(this) }
            checked={ field.props.multipleChoice } />
            Allow multiple selections
        </label>
        <label style={ styles.required }>
          <input type="checkbox"
            onClick={ this.onRequiredClick.bind(this) }
            checked={ field.wrapper.required } />
            Required
        </label>
      </div>
    );
  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  options: {
    padding: '20px',
    border: '1px solid #ccc',
    margin: '10px 0'
  },
  required: {
    display: 'block',
    padding: '10px 0',
    cursor: 'pointer'
  },
  plusMinus: {
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    marginLeft: '10px',
    padding: '0',
    cursor: 'pointer'
  },
  addOption: {
    height: '40px',
    lineHeight: '40px',
    padding: '0 10px',
    fontSize: '12pt',
    borderRadius: '0',
    border: '1px solid #ccc',
    background: '#fff',
    marginTop: '10px',
    cursor: 'pointer'
  }
};
