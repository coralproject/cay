import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { createEmpty } from 'forms/FormActions';
import Page from 'app/layout/Page';
import Button from 'components/Button';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import FaExt from 'react-icons/lib/fa/external-link';
import FaShare from 'react-icons/lib/fa/user-plus';
import ContentHeader from 'components/ContentHeader';

import FormBuilder from 'forms/FormBuilder.js';

@connect(({ asks }) => ({asks}))
@Radium
export default class AskCreate extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {preview: false};
  }

  componentWillMount() {
    this.props.dispatch(createEmpty());
  }

  render() {
    const {preview} = this.state;
    return (
      <Page style={styles.page}>
        <ContentHeader style={styles.header}>
          <div style={styles.headerTitle}>
            <h1 style={styles.title} contentEditable="true">Name form</h1>
            <br />
            <h3 style={styles.description} contentEditable="true">This is the description</h3>
          </div>
          <div>
            <Button style={[styles.headerBtn, styles.saveBtn]}>Save and exit <FaFloopyO style={styles.icon} /></Button>
            <Button style={[styles.headerBtn, styles.shareBtn]}>Share form <FaShare style={styles.icon} /></Button>
            <Button onClick={this.showPreview.bind(this)} style={[styles.headerBtn, styles.previewBtn]}>Preview form <FaExt style={styles.icon} /></Button>
          </div>
        </ContentHeader>
        <div style={styles.formBuilderContainer}>
          <FormBuilder onClosePreview={this.onClosePreview.bind(this)}
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
    marginTop: 50
  },
  builderTitle: {
    marginBottom: 30,
    fontSize: 25
  }
};
