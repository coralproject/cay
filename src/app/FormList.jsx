import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MdDelete from 'react-icons/lib/md/delete';
import _ from 'lodash';

import { deleteForm, fetchForms } from 'forms/FormActions';
import settings from 'settings';

import Page from 'app/layout/Page';
import Button from 'components/Button';
import ContentHeader from 'components/ContentHeader';
import Table from 'components/tables/Table';
import TableHead from 'components/tables/TableHead';
import TableHeader from 'components/tables/TableHeader';
import TableBody from 'components/tables/TableBody';
import TableRow from 'components/tables/TableRow';
import TableCell from 'components/tables/TableCell';
import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';

// Forms, Widgets, Submissions

@connect(({ forms }) => ({ forms }))
@Radium
export default class FormList extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.dispatch(fetchForms());
  }

  confirmDeletion(name, description, index, event) {
    event.stopPropagation();
    this.setState({
      confirmFormName: name,
      showConfirmDialog: true,
      formToDelete: [ name, description, index ]
    });
  }

  onConfirmClick() {
    var formToDelete = this.state.formToDelete;
    this.setState({ confirmFormName: '', showConfirmDialog: false, tagToDelete: null });
    this.props.dispatch(deleteForm(...formToDelete));
  }

  closeDialog() {
    this.setState({ confirmFormName: '', showConfirmDialog: false, formToDelete: null });
  }

  onRowClick(id) {
    const {router} = this.context;
    return router.push(`/forms/${id}/submissions`);
  }

  renderTable(group = []) {
    return (
      <Table style={styles.list} striped={ true } multiSelect={ false } hasActions={ true } isLoading={ this.props.loadingTags } loadingMessage="Loading...">
        <TableHead>
          <TableHeader>{ window.L.t('Name') }</TableHeader>
          <TableHeader>{ window.L.t('Description') }</TableHeader>
          <TableHeader>{ window.L.t('Answers') }</TableHeader>
        </TableHead>
        <TableBody>
          {group.map(this.renderRow.bind(this))}
        </TableBody>
      </Table>
    );
  }

  renderRow(form, i) {
    const header = form.header || {};
    return (
      <TableRow onClick={this.onRowClick.bind(this, form.id)} style={styles.row} key={i}>
        <TableCell>{header.title}</TableCell>
        <TableCell style={{maxWidth: 400}}>{header.description}</TableCell>
        <TableCell>{form.stats.responses}</TableCell>
        <TableCell><MdDelete key={i} onClick={ this.confirmDeletion.bind(this, header.title, header.description, form._id) } /></TableCell>
      </TableRow>
    );
  }

  render() {

    const groups = _.groupBy(this.props.forms.items, 'status');
    return (
      <Page>
        <ContentHeader title="View Forms" style={styles.header}>
          <Link to="forms/create"><Button>Create</Button></Link>
        </ContentHeader>

        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="Active">
            {this.renderTable(groups.active || groups[''])}
          </Tab>
          <Tab title="Draft">
            {this.renderTable(groups.draft || [])}
          </Tab>
          <Tab title="Past">
            {this.renderTable(groups.past || [])}
          </Tab>
        </Tabs>

        {
          this.state.showConfirmDialog ?
          <div style={ styles.confirmOverlay }>
            <div style={ styles.confirmDialog }>
              <h2>Warning: this action has no undo.</h2>
              <p style={ styles.confirmMessage }>Are you sure you want to remove the form <strong style={ styles.strong }>"{ this.state.confirmFormName }"</strong>?</p>
              <button style={ [ styles.confirmButton, styles.yesButton ] } onClick={ this.onConfirmClick.bind(this) }>Yes</button>
              <button style={ [ styles.confirmButton, styles.noButton ] } onClick={ this.closeDialog.bind(this) }>No</button>
            </div>
          </div>
          : null
        }
      </Page>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  list: {
    width: '100%',
    border: 'none'
  },
  row: {
    cursor: 'pointer',
    borderBottom: '1px solid ' + settings.lightGrey,
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: settings.lightGrey
    }
  },
  confirmOverlay: {
    background: 'rgba(0,0,0,.7)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '5000'
  },
  confirmDialog: {
    width: '500px',
    background: 'white',
    padding: '30px 30px 110px 30px',
    margin: '50px auto',
    position: 'relative'
  },
  confirmMessage: {
    fontSize: '16px',
    marginTop: '20px'
  },
  confirmButton: {
    position: 'absolute',
    padding: '0 20px',
    lineHeight: '40px',
    border: 'none',
    background: '#ddd',
    cursor: 'pointer'
  },
  yesButton: {
    right: '30px',
    bottom: '30px',
    background: settings.brandColor,
    color: 'white'
  },
  noButton: {
    left: '30px',
    bottom: '30px'
  },
  tabs: {
    backgroundColor: 'white',
    marginTop: 20,
    clear: 'both'
  }
};
