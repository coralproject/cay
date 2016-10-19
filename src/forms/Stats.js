import React, { Component } from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import rd3 from 'react-d3-library';
import node from './d3test';
const RD3Component = rd3.Component;

export default class Stats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
  }

  componentDidMount() {
    this.setState({d3: node});
  }

  render() {

    console.log(this.props)

    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
};