import React, { PropTypes } from 'react';

const propTypes = {
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired
}

const defaultProps = {
  label: "Label",
  enabled: false,
}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
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
export const CharsInput = ({ label, enabled, handleCheckbox, handleInput, defaultValue }) => (
  <label style={styles.bottomCheck}>
    <input
      type="checkbox"
      checked={enabled}
      onChange={handleCheckbox}
      defaultValue={enabled}
    />
    <span style={ [ styles.bottomLabelText, enabled ? '' : styles.disabled ] } >
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
  </label>
)

CharsInput.propTypes = propTypes
CharsInput.defaultProps = defaultProps
