import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaCopy from 'react-icons/lib/fa/copy';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class MultipleChoiceEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { options: props.field.props.options && props.field.props.options.length ?
        props.field.props.options
      :
        [ { title: 'Option 1' } ]
    };
    this.focusNew = false;
  }

  updateFieldOptions(options) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { options: options });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  addOption() {
    var optionsCopy = this.state.options.slice();
    optionsCopy.push({ title: 'Option ' + (this.state.options.length + 1) });
    // We are not using state on this, it's going to be manipulated on render
    this.focusNew = true;
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  duplicateOption(i) {
    var optionsStart = this.state.options.slice(0, i);
    var optionsEnd = this.state.options.slice(i);
    var optionCopy = Object.assign({}, this.state.options[i]);
    var optionsCopy = optionsStart.concat(optionCopy).concat(optionsEnd);
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  removeOption(i) {
    var optionsCopy = this.state.options.slice();
    optionsCopy.splice(i, 1);
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  updateOption(i, e) {
    var optionsCopy = this.state.options.slice();
    optionsCopy[i] = { title: e.target.value };
    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);
  }

  moveOption(index, direction) {

    var moveFrom = index;
    var moveTo = index + (direction == 'up' ? -1 : 1);

    var optionsCopy = this.state.options.slice();
    optionsCopy[moveTo] = Object.assign({}, this.state.options[moveFrom]);
    optionsCopy[moveFrom] = Object.assign({}, this.state.options[moveTo]);

    this.setState({ options: optionsCopy });
    this.updateFieldOptions(optionsCopy);

  }

  onMultipleClick(e) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { multipleChoice: e.target.checked });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onOtherClick(e) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { otherAllowed: e.target.checked });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  onOtherTextChange(e) {
    let { field } = this.props;
    let updatedProps = Object.assign({}, field.props, { otherText: e.target.value });
    let updatedField = Object.assign({}, field, { props: updatedProps });
    this.props.onEditorChange(updatedField);
  }

  getOptions() {
    return this.state.options.map((option, i) => {
      return (
        <div key={ i } style={ styles.optionRow }>
          <div style={ styles.optionRowText }>
            <input
              ref={
                (el) => {
                  if (el) {
                    // Setting focus on the last element if the 'focusNew' flag is set
                    if (this.focusNew && i == this.state.options.length - 1) {
                      el.focus();
                      this.focusNew = false;
                    }
                  }
                }
              }
              style={ styles.optionInput } type="text" placeholder={ option.title } onChange={ this.updateOption.bind(this, i) } />
          </div>

          {/* Action buttons for an option */}
          <div style={ styles.optionRowButtons }>
            <button style={ styles.optionButton } onClick={ this.duplicateOption.bind(this, i) }><FaCopy /></button>
            {
              (i > 0) || (i == 0 && this.state.options.length > 1) ?
                <button style={ styles.optionButton } onClick={ this.removeOption.bind(this, i) }><FaTrashO /></button>
              :
                <button style={ styles.optionButton } disabled><FaTrashO /></button>
            }
            <button disabled={ i == 0 } style={ styles.optionButton } onClick={ this.moveOption.bind(this, i, 'up') }><FaArrowUp /></button>
            <button disabled={ i == this.state.options.length - 1 } style={ styles.optionButton } onClick={ this.moveOption.bind(this, i, 'down') }><FaArrowDown /></button>
          </div>

        </div>
      );
    });
  }

  render() {
    let { field } = this.props;

    return (
      <div>

        <div style={ styles.options }>

          { this.getOptions() }

          {
            field.props.otherAllowed ?
              <div style={ styles.optionRow }>
                <div style={ styles.optionRowText }>
                  <input style={ styles.optionInput } type="text" placeholder="Other:" value={ field.props.otherText } onChange={ this.onOtherTextChange.bind(this) } />
                </div>
                <div style={ styles.optionRowButtons }>
                  &nbsp;
                </div>
              </div>
            : null
          }

          <div style={ styles.optionRow }>
            <div style={ styles.optionRowText }>
              <button style={ styles.addOption } onClick={ this.addOption.bind(this) } className="add-option"><FaPlusCircle /> Add another option</button>
            </div>
            <div style={ styles.optionRowButtons }>
              &nbsp;
            </div>
          </div>

        </div>

        <div style={ styles.bottomOptions }>

          <div style={ styles.bottomOptionsLeft }>
            <label style={ styles.bottomCheck }>
              <input type="checkbox"
                onClick={ this.onMultipleClick.bind(this) }
                checked={ field.props.multipleChoice } />
                Allow multiple selections
            </label>
            <label style={ styles.bottomCheck }>
              <input type="checkbox"
                onClick={ this.onOtherClick.bind(this) }
                checked={ field.props.otherAllowed } />
                Allow "Other"
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
  options: {
    margin: '10px 0'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px 10px 10px 0',
    cursor: 'pointer'
  },
  optionButton: {
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    marginLeft: '10px',
    padding: '0px',
    cursor: 'pointer'
  },
  addOption: {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
    padding: '0px 10px',
    fontSize: '12pt',
    borderRadius: '0px',
    border: '1px dashed #ccc',
    background: '#fff',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    color: '#999'
  },
  optionRow: {
    marginBottom: '10px',
    display: 'flex'
  },
  optionRowText: {
    flexGrow: '2'
  },
  optionRowButtons: {
    paddingTop: '10px',
    width: '120px'
  },
  optionInput: {
    display: 'block',
    padding: '10px',
    fontSize: '12pt',
    width: '100%'
  },
  bottomOptions: {
    display: 'flex',
    width: '100%'
  },
  bottomOptionsLeft: {
    flexGrow: '1',
    lineHeight: '30px'
  },
  otherSample: {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
    padding: '0px 10px',
    fontSize: '12pt',
    borderRadius: '0px',
    border: '1px solid #ddd',
    background: '#fff',
    width: '100%',
    textAlign: 'left',
    color: '#999'
  }
};
