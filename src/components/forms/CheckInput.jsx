import React, { PropTypes } from 'react'
import Radium from 'radium'

const CheckInput = ({ label, enabled, handleCheckbox, handleInput, defaultValue, error, errorMsg }) => (
  <label style={styles.bottomCheck}>
    <input
      type="checkbox"
      checked={enabled}
      onChange={handleCheckbox}
      defaultValue={enabled}
    />
    <span style={ [ styles.bottomLabelText, enabled ? '' : styles.disabled ] }>
      {label}
    </span>
    <input
      onChange={handleInput}
      defaultValue={defaultValue}
      type="number"
      min="0"
      step="1"
      disabled={!enabled}
      style={ [ styles.bottomCheckTextInput, !enabled ? styles.disabled : '' ] }
    />
    { error ? <span style={ [styles.error] }> {errorMsg} </span> : null }
  </label>
)

CheckInput.propTypes = {
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired
}

CheckInput.defaultProps = {
  label: "Label",
  enabled: false,
  defaultValue: 0
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
    display: 'block',
    padding: '10px 10px 10px 0',
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
    padding: '4px',
    ':focus': {
      outline: 'none'
    }
  },
  bottomLabelText: {
    height: '30px',
    display: 'inline-block'
  },
  disabled: {
    color: '#AAA'
  }
}
export default Radium(CheckInput)
