import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class PhoneNumberEditor extends Component {

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
        <div style={ styles.bottomOptions }>
          <CommonFieldOptions {...this.props} />
        </div>
      </div>
    );
  }

}

const styles = {
};
