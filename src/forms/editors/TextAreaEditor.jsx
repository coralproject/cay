import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import CommonFieldOptions from 'forms/CommonFieldOptions'

import editWidgetStyles from 'forms/editors/editWidgetStyles'
import CheckInput from '../../components/forms/CheckInput'

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextAreaEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      field: props.field,
      minLengthEnabled: props.field.props.minLength > 0,
      maxLengthEnabled: props.field.props.maxLength > 0
    }
  }
  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField, minLengthEnabled: nextProps.field.props.minLength > 0, maxLengthEnabled: nextProps.field.props.maxLength > 0 });
  }
  extendField(attrs){
    const { field } = this.state
    const { onEditorChange } = this.props

    onEditorChange({
      ...field,
      ...attrs
    })
  }
  extendFieldProps(attrs){
    const { field } = this.state
    const { onEditorChange } = this.props

    onEditorChange({
      ...field,
      props: {
        ...field.props,
        ...attrs
      }
    })
  }
  deleteFieldProp(prop) {
    const { field } = this.state
    delete field.props[prop]
  }
  handleInputChange(e, prop) {
    this.extendFieldProps({
      [prop]: Number(e.target.value)
    })
  }
  handleCheckboxChange(e, prop) {
    this.setState({
      [`${prop}Enabled`]: e.target.checked
    })

    if (!e.target.checked) {
      this.deleteFieldProp(prop)
    }
  }
  handleError(error) {
    const { field } = this.state
    if (error) {
      this.extendField({
        error: true
      })
    } else {
      delete field.error
    }
  }
  render() {
    let { field, minLengthEnabled, maxLengthEnabled } = this.state;
    return (
      <div>
        {
          field.props.minLength > field.props.maxLength
            ? <span style={ [styles.error] }> {`Min Length can't be greater than Max Length`} </span>
            : null
        }
        <div style={ styles.bottomOptions }>
          <div style={styles.bottomOptionsLeft}>
            <CheckInput
              label={'Min. Chars'}
              enabled={minLengthEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'minLength') }
              handleInput={ (e) => this.handleInputChange(e, 'minLength') }
              defaultValue={field.props.minLength}
            />
            <CheckInput
              label={'Max. Chars'}
              enabled={maxLengthEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'maxLength') }
              handleInput={ (e) => this.handleInputChange(e, 'maxLength')}
              defaultValue={field.props.maxLength}
            />
          </div>
          <CommonFieldOptions
            {...this.props}
          />
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
    padding: '10px 20px 10px 0',
    cursor: 'pointer',
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
    fontSize: '12pt',
    width: '50px',
    textAlign: 'center',
    padding: '4px'
  },
  disabled: {
    color: '#AAA'
  }

};
