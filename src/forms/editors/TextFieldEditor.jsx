import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

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

  onIdentityClick(e) {
    let { field } = this.props;
    let updatedField = Object.assign({}, field, { identity: e.target.checked });
    this.props.onEditorChange(updatedField);
  }

  render() {
    let { field } = this.state;
    return (
      <div>
        <div style={ styles.bottomOptions }>

          <div style={ styles.bottomOptionsLeft }>
            <label style={ styles.bottomCheck }>
                Max. chars:
                <input
                  onChange={ this.onMaxCharsChange.bind(this) }
                  defaultValue={ field.props.maxLength || 0 }
                  type="text"
                  style={ styles.bottomCheckTextInput }></input>
            </label>
          </div>

          <div style={ styles.bottomOptionsRight }>
            <label style={ styles.bottomCheck }>
              <input type="checkbox"
                onClick={ this.onIdentityClick.bind(this) }
                checked={ field.identity } />
                Reader info <FaQuestionCircle />
            </label>
            <label style={ styles.bottomCheck }>
              <input type="checkbox"
                onClick={ this.onRequiredClick.bind(this) }
                checked={ field.wrapper.required } />
                Required
            </label>
          </div>

        </div>

      </div>
    );
  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px',
    cursor: 'pointer'
  },
  bottomOptions: {
    display: 'flex',
    width: '100%'
  },
  bottomOptionsLeft: {
    flexGrow: '1'
  },
  bottomOptionsRight: {
    textAlign: 'right',
    flexGrow: '1'
  },
  bottomCheckTextInput: {
    display: 'inline-block',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    marginLeft: '10px',
    fontSize: '12pt'
  }

};
