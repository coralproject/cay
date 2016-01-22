import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

// Settings
import settings from '../../settings';

import { setToggler, setTopic } from '../../actions/playground';

@connect(state => state.playground)
@Radium
class CustomizerToggle extends React.Component {

  componentDidMount() {
    var initialStatus = this.props.toggler.status;
    this.setState({ active: initialStatus });
  }

  onTogglerClick() {
    var currentStatus = this.props.toggler.status;
    this.props.dispatch(setToggler(this.props.groupIndex, this.props.togglerIndex, !currentStatus));
    this.setState({ active: !currentStatus });
  }

  onMouseEnter() {
    if (this.props.toggler.topic) {
      this.props.dispatch(setTopic(this.props.toggler.topic));
    }
  }

  render() {

    return (
      <div style={ [ styles.base, this.state.active ? styles.active : null ] } onMouseEnter={ this.onMouseEnter.bind(this) } >
        <label style={ styles.label }>
          <input onClick={ this.onTogglerClick.bind(this) } checked={ this.state.active } type="checkbox" /> 
          <span style={ styles.labelSpan }>{ this.state.active ? this.props.toggler.label : this.props.toggler.offLabel }</span>
        </label>
        <p style={ styles.description }>
          { this.props.toggler.description }
        </p>
      </div>
      );

  }
}

// same as the @connect decorator above
export default CustomizerToggle;

var styles = {
  base: {
    padding: '20px',
    margin: '0 3% 20px 0',
    borderLeft: '1px solid ' + settings.grey,
    borderRight: '1px solid ' + settings.grey,
    borderBottom: '1px solid ' + settings.grey,
    borderTop: '4px solid ' + settings.grey,
    height: '100px',
    width: '30%',
    'float': 'left'
  },
  active: {
    borderTop: '4px solid ' + settings.coralPink
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    fontFamily: 'Fira Sans',
    marginBottom: '10px'
  },
  labelSpan: {
    fontWeight: 'bold',
    fontFamily: 'Fira Sans'
  },
  description: {
    color: '#666',
    fontFamily: 'Fira Sans'
  }
};
