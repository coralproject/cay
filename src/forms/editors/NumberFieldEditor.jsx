import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class NumberFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field, minValueEnabled: props.field.props.minLength > 0, maxValueEnabled: props.field.props.maxLength > 0 }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField, minValueEnabled: nextProps.field.props.minLength > 0, maxValueEnabled: nextProps.field.props.maxLength > 0 });
  }

  onMinValueChange(e) {
    let { field } = this.state;
    let updatedProps = Object.assign({}, field.props, { minLength: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onMaxValueChange(e) {
    let { field } = this.state;
    let updatedProps = Object.assign({}, field.props, { maxLength: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onMinValueCheckChange(e) {
    this.setState({ minValueEnabled: e.target.checked });
    // Set to 0 if disabled
    if (!e.target.checked) {
      let { field } = this.state;
      let updatedProps = Object.assign({}, field.props, { minLength: 0 });
      let updatedField = Object.assign({}, field, { props: updatedProps });
      this.props.onEditorChange(updatedField);
    }
  }

  onMaxValueCheckChange(e) {
    this.setState({ maxValueEnabled: e.target.checked });
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

        <div style={ styles.bottomOptions }>

          <div style={ styles.bottomOptionsLeft }>
            <label style={ styles.bottomCheck }>
              <input type="checkbox" checked={ this.state.minValueEnabled } onChange={ this.onMinValueCheckChange.bind(this) } />
              <span style={ [ this.state.minValueEnabled ? '' : styles.disabled ] }>Min. value</span>
              <input
                onChange={ this.onMinValueChange.bind(this) }
                defaultValue={ field.props.minLength || 0 }
                type="number"
                disabled={ !this.state.minValueEnabled }
                style={ [ styles.bottomCheckTextInput, !this.state.minValueEnabled ? styles.disabled : '' ] }></input>
            </label>

            <label style={ styles.bottomCheck }>
              <input type="checkbox" checked={ this.state.maxValueEnabled } onChange={ this.onMaxValueCheckChange.bind(this) } />
              <span style={ [ this.state.maxValueEnabled ? '' : styles.disabled ] }>Max. value</span>
              <input
                onChange={ this.onMaxValueChange.bind(this) }
                defaultValue={ field.props.maxLength || 0 }
                type="number"
                disabled={ !this.state.maxValueEnabled }
                style={ [ styles.bottomCheckTextInput, !this.state.maxValueEnabled ? styles.disabled : '' ] }></input>
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
    fontSize: '10pt',
    width: '50px',
    textAlign: 'center'
  },
  disabled: {
    color: '#AAA'
  }

};
