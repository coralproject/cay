
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import {
  fetchFormStats
} from 'forms/FormActions';
import { authSnackbarDisplayedOnce } from 'app/AppActions';
import Login from 'app/Login';
import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import FormBuilder from 'forms/FormBuilder.js';

import Stats from 'forms/Stats.js';

import rd3 from 'react-d3-library';

/**
 * Expose Form Edit page component
 */

@connect(({ app, oidc, forms }) => ({ app, oidc, forms }))
@Radium
export default class FormStats extends Component {

  constructor(props) {
    super(props);
    this.state = {  };
    const { id } = props.params;

    this.props.dispatch(fetchFormStats(id));

  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { app, oidc, forms, route } = this.props;


    return (
      <Page>
        <Stats />
      </Page>
    );
  }
}
