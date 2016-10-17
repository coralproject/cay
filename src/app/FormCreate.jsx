
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import {
  copyForm,
  createEmpty,
  updateFormSettings,
  leavingEdit
} from 'forms/FormActions';
import { authSnackbarDisplayedOnce } from 'app/AppActions';
import { showFlashMessage } from 'flashmessages/FlashMessagesActions';
import Login from 'app/Login';
import Page from 'app/layout/Page';
import FormBuilder from 'forms/FormBuilder.js';
import FormChrome from 'app/layout/FormChrome';

@connect(({ oidc, app, forms }) => ({
  app,
  elkhornHost: app.elkhornHost,
  oidc,
  forms
}))
@Radium
export default class FormCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      preview: false
    };

    this.leavingEdit = this.leavingEdit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(createEmpty());
    let copying = /\?copying=(.+)/.exec(window.location.search);
    if (copying) {
      this.props.dispatch(copyForm(copying[1]));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(authSnackbarDisplayedOnce());
  }

  updateInactive(value) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: value }));
  }

  leavingEdit() {
    const {dispatch, params} = this.props;
    dispatch(leavingEdit(params.id));
  }

  render() {
    const {oidc, app} = this.props;
    const { preview } = this.state;

    if (!oidc.user) return <Login />;

    const authTimeout = new Date(this.props.oidc.user.expires_at * 1000);

    return (
      <Page
        style={styles.page}
        authTimeout={authTimeout}
        displayAuthSnackbar={!app.authSnackbarDisplayedOnce}
        >
        <FormChrome form={null}
          create={true}
          updateStatus={() => null}
          updateInactive={this.updateInactive.bind(this)}
          activeTab="builder" />
        <div style={styles.formBuilderContainer}>
          <FormBuilder
            onClosePreview={this.onClosePreview.bind(this)}
            onOpenPreview={ this.showPreview.bind(this) }
            route={ this.props.route }
            create={true}
            preview={preview}
            leavingEdit={this.leavingEdit}
          />
        </div>
      </Page>
    );
  }

  onClosePreview() {
    this.setState({
      preview: false
    });
  }

  showPreview() {
    const { activeForm, forms, elkhornHost } = this.props;
    // First test the form is reachable
    const form = activeForm ? forms[activeForm] : forms.form;
    const previewForm = { ...form };
    previewForm.steps[0].widgets = forms.widgets;
    const url = `${elkhornHost}/preview.js?props=${encodeURIComponent(JSON.stringify(previewForm))}`;

    let formCreate = this;
    fetch(url, {
      method: 'HEAD'
    })
    .then(() => formCreate.setState({ preview: true }))
    .catch(() => formCreate.props
      .dispatch(showFlashMessage('Uh-oh, we can\'t preview your form. Try again or report the error to your technical team', 'warning', 4000)));
  }
}

/**
 * Module styles
 */

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  headerTitle: {
    flex: 1,
    color: '#5D5D5D'
  },
  title: {
    fontSize: 36,
    display: 'inline-block',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 24,
    display: 'inline-block'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 20,
    borderBottom: '1px solid #E9E9E9'
  },
  textField: {
    marginRight: 20
  },
  headerBtn: {
    marginLeft: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 15
  },
  saveBtn: {
    backgroundColor: '#7BC9A3'
  },
  shareBtn: {
    backgroundColor: '#F77160'
  },
  previewBtn: {
    backgroundColor: '#4A4A4A'
  },
  icon: {
    float: 'right',
    marginLeft: 10
  },
  formBuilderContainer: {
  },
  builderTitle: {
    marginBottom: 30,
    fontSize: 25
  }
};
