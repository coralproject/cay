import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import { setToggler, setTopic } from 'playground/PlaygroundActions';

import Switch from '../../components/forms/Switch';

@connect(state => state.playground)
@Radium
class CustomizerToggle extends React.Component {

  componentWillMount() {
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
        <Switch color={ '#F77260' } checked={ this.state.active } check={ true } clickHandler={ this.onTogglerClick.bind(this) } extraStyles={ styles.switchExtra } />
        <span style={ styles.descriptionSpan }>{ this.state.active ? this.props.toggler.label : this.props.toggler.offLabel }</span>
        <div style={ styles.clearfix }></div>
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
    marginBottom: '15px',
    borderLeft: '1px solid #999',
    borderRight: '1px solid #999',
    borderBottom: '1px solid #999',
    borderTop: '4px solid #999',
    minHeight: '100px',
    width: '100%',
    transition: 'background .5s',
    cursor: 'pointer'
  },
  active: {
    borderTop: '4px solid #F77260',
    backgroundColor: 'white'
  },
  label: {
    display: 'block',
    width: '80px',
    height: '30px',
    borderRadius: '15px',
    marginBottom: '10px',
    border: '1px solid #aaa',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  },
  descriptionSpan: {
    fontWeight: 'bold',
    fontFamily: 'Fira Sans',
    fontSize: '14pt',
    lineHeight: '30px'
  },
  description: {
    color: '#666',
    fontFamily: 'Fira Sans',
    marginTop: '10px'
  },
  checkbox: {
    display: 'none'
  },
  switchExtra: {
    'float': 'left',
    margin: '0 10px 0 0',
    fontFamily: 'Fira Sans'
  },
  clearfix: {
    clear: 'both'
  }
};
