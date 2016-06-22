import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField });
  }

  onMaxCharsChange(e) {
    let { field } = this.state;
    let updatedProps = Object.assign({}, field.props, { maxLength: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onRequiredClick(e) {
    let { field } = this.state;
    let updatedWrapper = Object.assign({}, field.wrapper, { required: e.target.checked });
    let updatedField = Object.assign({}, field, { wrapper: updatedWrapper });
    this.setState({ field: updatedField });
    this.props.onEditorChange(updatedField);
  }

  render() {
    let { field } = this.state;
    return (
      <div>
        <label>
        <input type="checkbox"
          onClick={ this.onRequiredClick.bind(this) }
          checked={ field.wrapper.required } />
          Required
        </label>
        <div>
          <label style={ editWidgetStyles.label }>
              Max. chars:
              <input
                onChange={ this.onMaxCharsChange.bind(this) }
                defaultValue={ field.props.maxLength || 0 }
                type="text"
                style={ editWidgetStyles.textInput }></input>
          </label>
        </div>
      </div>
    );
  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
};
