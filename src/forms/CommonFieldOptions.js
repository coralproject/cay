import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { showingTooltip: false };
  }

  onRequiredClick(e) {
    let { field } = this.props;
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

  onMouseEnter(e) {
    this.setState({ showingTooltip: true });
  }

  onMouseLeave(e) {
    this.setState({ showingTooltip: false });
  }

  render() {
    let { field } = this.props;
    return (
      <div style={ styles.bottomOptionsRight }>
        <label style={ styles.bottomCheck }>
          <input type="checkbox"
            onClick={ this.onIdentityClick.bind(this) }
            checked={ field.identity } />
            Reader info
            <span
              style={ styles.questionMark }
              onMouseEnter={ this.onMouseEnter.bind(this) }
              onMouseLeave={ this.onMouseLeave.bind(this) }>
              <FaQuestionCircle />
              {
                  this.state.showingTooltip ?
                    <div style={ styles.popOver }>
                      <strong style={ styles.strong }>What is this feature?</strong>
                      <p>Check if this field contains personal information.</p>
                    </div>
                  : null
              }
            </span>
        </label>
        <label style={ styles.bottomCheck }>
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
  bottomCheck: {
    display: 'inline-block',
    padding: '10px',
    cursor: 'pointer'
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
  },
  questionMark: {
    position: 'relative'
  },
  popOver: {
    position: 'absolute',
    top: '20px',
    width: '200px',
    left: '-100px',
    background: 'white',
    zIndex: '9000',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'left',
    boxShadow: '0 1px 3px #999'
  },
  strong: {
    fontWeight: 'bold',
    fontSize: '11pt',
    marginBottom: '10px',
    display: 'block'
  }
};
