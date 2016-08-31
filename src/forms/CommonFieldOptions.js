import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';

import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingTooltip: false
    };
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
              style={ styles.questionMark }>
              <FaQuestionCircle data-tip data-for="readerInfo" />
              <ReactTooltip class="cayTooltip" id="readerInfo" place="bottom" effect="solid" type="light">
                <div style={ styles.popOver }>
                  <strong style={ styles.strong }>What is this feature?</strong>
                  <p>Check if this field contains personal information.</p>
                </div>
              </ReactTooltip>
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
    padding: '10px 0 10px 10px',
    cursor: 'pointer',
    lineHeight: '30px'
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
    position: 'relative',
    bottom: 2,
    left: 3
  },
  popOver: {
    textAlign: 'left',
    width: '200px',
    padding: '20px 0'
  },
  strong: {
    fontWeight: 'bold',
    fontSize: '12pt',
    marginBottom: '10px',
    display: 'block'
  }
};
