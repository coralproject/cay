import React, { Component,  PropTypes } from 'react';

export default class Tooltip extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e) {
    this.setState({ active: true });
  }

  handleMouseOut(e) {
    this.setState({ active: false });
  }

  render() {
    const { text, htmlFor, children } = this.props;
    const { active } = this.state;
    return (
      <span
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={{ position: 'relative'}}
      >
        {children}
        <span
          className={`mdl-tooltip ${(active) ? 'is-active' : ''}`}
          style={styles}
          htmlFor={htmlFor}
        >
          {text}
        </span>
      </span>
    );
  }
}

const styles = {
  position: 'absolute',
  left: 0,
  top: 'auto',
  bottom: -50,
};