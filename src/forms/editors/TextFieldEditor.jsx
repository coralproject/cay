import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import CommonFieldOptions from 'forms/CommonFieldOptions'
import editWidgetStyles from 'forms/editors/editWidgetStyles'

import CheckInput from '../../components/forms/CheckInput'

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minLengthEnabled: props.field.props.minLength > 0,
      maxLengthEnabled: props.field.props.maxLength > 0,
      error: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMaxInput = this.handleMaxInput.bind(this)
    this.handleMinInput = this.handleMinInput.bind(this)
  }
  extendField(attrs){
    const { field, onEditorChange } = this.props
    onEditorChange({
      ...field,
      ...attrs
    })
  }
  extendFieldProps(attrs){
    const { field, onEditorChange } = this.props
    onEditorChange({
      ...field,
      props: {
        ...field.props,
        ...attrs
      }
    })
  }
  deleteFieldProp(prop) {
    const { field, onEditorChange } = this.props
    const { [prop]:v, ...props } = field.props
    onEditorChange({
        ...field,
        props
    })
  }
  handleInputChange(value, prop) {
    this.extendFieldProps({
      [prop]: Number(value)
    })
  }
  handleMaxInput(e) {
    const maxValue = e.target.value;
    const { minLength } = this.props.field.props
    const { minLengthEnabled, maxLengthEnabled } = this.state
    const error = minLengthEnabled && maxLengthEnabled && maxValue < minLength
    
    if (!error) {
      this.handleInputChange(maxValue, 'maxLength')
    }

    this.setState({
      error: error
    })
  }
  handleMinInput(e) {
    const minValue = e.target.value;
    const { maxLength } = this.props.field.props
    const { minLengthEnabled, maxLengthEnabled } = this.state
    const error = minLengthEnabled && maxLengthEnabled && minValue > maxLength

    if (!error) {
      this.handleInputChange(minValue, 'minLength')
    }

    this.setState({
      error: error
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
  render() {
    const { handleMinInput, handleMaxInput, props, state } = this;
    const { field } = props
    const { minLengthEnabled, maxLengthEnabled, error } = state

    return (
      <div>
        {
          error
            ? <span style={ [styles.error] }> {`Min. Chars can't be greater than Max. Chars`} </span>
            : null
        }
        <div style={styles.bottomOptions}>
          <div style={styles.bottomOptionsLeft}>
            <CheckInput
              label={'Min. Chars'}
              enabled={minLengthEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'minLength') }
              handleInput={handleMinInput}
              defaultValue={field.props.minLength}
            />
            <CheckInput
              label={'Max. Chars'}
              enabled={maxLengthEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'maxLength') }
              handleInput={handleMaxInput}
              defaultValue={field.props.maxLength}
            />
          </div>
          <CommonFieldOptions
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  error: {
    color: 'red',
    display: 'block',
    fontSize: '12px'
  },
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px 0 10px 10px',
    cursor: 'pointer',
    lineHeight: '30px'
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
  bottomLabelText: {
    height: '30px',
    display: 'inline-block'
  },
  disabled: {
    color: '#AAA'
  }
}
