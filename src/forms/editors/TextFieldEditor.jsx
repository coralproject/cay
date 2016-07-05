import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field, minLengthEnabled: props.field.props.minLength > 0, maxLengthEnabled: props.field.props.maxLength > 0 }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField, minLengthEnabled: nextProps.field.props.minLength > 0, maxLengthEnabled: nextProps.field.props.maxLength > 0 });
  }

  onMinCharsChange(e) {
    let { field } = this.state;
    let updatedProps = Object.assign({}, field.props, { minLength: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onMaxCharsChange(e) {
    let { field } = this.state;
    let updatedProps = Object.assign({}, field.props, { maxLength: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onMinLengthChange(e) {
    this.setState({ minLengthEnabled: e.target.checked });
    // Set to 0 if disabled
    if (!e.target.checked) {
      let { field } = this.state;
      let updatedProps = Object.assign({}, field.props, { minLength: 0 });
      let updatedField = Object.assign({}, field, { props: updatedProps });
      this.props.onEditorChange(updatedField);
    }
  }

  onMaxLengthChange(e) {
    this.setState({ maxLengthEnabled: e.target.checked });
    // Set to 0 if disabled
    if (!e.target.checked) {
      let { field } = this.state;
      let updatedProps = Object.assign({}, field.props, { maxLength: 0 });
      let updatedField = Object.assign({}, field, { props: updatedProps });
      this.props.onEditorChange(updatedField);
    }
  }

  render() {
    let { field } = this.state;
    return (
      <div>

        <div style={ styles.responseArea }>
          <input style={ styles.responseAreaInput } type="text" disabled placeholder="Response Area" />
        </div>

        <div style={ styles.bottomOptions }>

          <div style={ styles.bottomOptionsLeft }>
            <label style={ styles.bottomCheck }>
              <input type="checkbox" checked={ this.state.minLengthEnabled } onChange={ this.onMinLengthChange.bind(this) } />
              <span style={ [ this.state.minLengthEnabled ? '' : styles.disabled ] }>Min. chars</span>
              <input
                onChange={ this.onMinCharsChange.bind(this) }
                defaultValue={ field.props.minLength || 0 }
                type="text"
                disabled={ !this.state.minLengthEnabled }
                style={ [ styles.bottomCheckTextInput, !this.state.minLengthEnabled ? styles.disabled : '' ] }></input>
            </label>

            <label style={ styles.bottomCheck }>
              <input type="checkbox" checked={ this.state.maxLengthEnabled } onChange={ this.onMaxLengthChange.bind(this) } />
              <span style={ [ this.state.maxLengthEnabled ? '' : styles.disabled ] }>Max. chars</span>
              <input
                onChange={ this.onMaxCharsChange.bind(this) }
                defaultValue={ field.props.maxLength || 0 }
                type="text"
                disabled={ !this.state.maxLengthEnabled }
                style={ [ styles.bottomCheckTextInput, !this.state.maxLengthEnabled ? styles.disabled : '' ] }></input>
            </label>

          </div>

          <CommonFieldOptions {...this.props} />

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
    cursor: 'pointer',
    fontSize: '10pt'
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
    fontSize: '10pt',
    width: '50px',
    textAlign: 'center'
  },
  responseAreaInput: {
    padding: '10px',
    height: '40px',
    display: 'block',
    width: '100%'
  },
  disabled: {
    color: '#AAA'
  }

};
