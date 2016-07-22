import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { createEmpty } from 'forms/FormActions';
import Page from 'app/layout/Page';

import FormBuilder from 'forms/FormBuilder.js';
import FormChrome from 'app/layout/FormChrome';

@connect(({ forms }) => ({ forms }))
@Radium
export default class FormCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {preview: false};
  }

  componentWillMount() {
    this.props.dispatch(createEmpty());
  }

  render() {
    const { preview } = this.state;
    const { forms } = this.props;
    return (
      <Page style={styles.page}>
        <FormChrome form={forms.form}
          create={true} updateStatus={() => {}} activeTab="builder" />
        <div style={styles.formBuilderContainer}>
          <FormBuilder
            onClosePreview={this.onClosePreview.bind(this)}
            onOpenPreview={ this.showPreview.bind(this) }
            preview={preview} />
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
    this.setState({
      preview: true
    });
  }

}

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
