
/**
 * Module dependencies
 */

import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FaTrash from 'react-icons/lib/fa/trash';
import MdBuild from 'react-icons/lib/md/build';
import { deleteForm, fetchForms } from 'forms/FormActions';
import { mediumGrey, lightGrey, brandColor } from 'settings';
import Page from 'app/layout/Page';
import Button from 'components/Button';
import ContentHeader from 'components/ContentHeader';
import Table from 'components/tables/Table';
import TableHead from 'components/tables/TableHead';
import TableHeader from 'components/tables/TableHeader';
import TableBody from 'components/tables/TableBody';
import TableRow from 'components/tables/TableRow';
import TableCell from 'components/tables/TableCell';
import ButtonGroup from 'components/ButtonGroup';

// Forms, Widgets, Submissions
@connect(({ forms }) => ({ forms }))
@Radium
export default class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = { displayMode: 'open' };
  }

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
    this.context.router.push(`/forms/${id}/submissions`);
  }

  setDisplayMode(displayMode) {
    this.setState({ displayMode });
  }

  render() {
    const forms = this.props.forms.formList.map(id => this.props.forms[id]);
    const visibleForms = forms.filter(form => form.status === this.state.displayMode);

    return (
      <Page>
        <ContentHeader title="View Forms" style={styles.header} subhead="Create, edit and view forms">
          <Link to="forms/create" style={styles.createButton}>
            <Button category="info">Create <MdBuild /></Button>
          </Link>
        </ContentHeader>

        <ButtonGroup initialActiveIndex={0} behavior="radio">
          <Button onClick={this.setDisplayMode.bind(this, 'open')}>Open</Button>
          <Button onClick={this.setDisplayMode.bind(this, 'closed')}>Closed</Button>
        </ButtonGroup>

        <FormTable forms={visibleForms} onRowClick={this.onRowClick.bind(this)}
          confirmDeletion={this.confirmDeletion.bind(this)}/>

        <ConfirmDialog show={this.state.showConfirmDialog}
          formName={this.state.confirmFormName}
          onConfirmClick={this.onConfirmClick.bind(this)}
          onCloseClick={this.closeDialog.bind(this)} />
      </Page>
    );
  }
}

const ConfirmDialog = ({ show, formName, onConfirmClick, onCloseClick }) => show ? (
  <div style={ styles.confirmOverlay }>
    <div style={ styles.confirmDialog }>
      <h2>Warning: this action has no undo.</h2>
      <p style={ styles.confirmMessage }>Are you sure you want to remove the form <strong style={ styles.strong }>"{ formName }"</strong>?</p>
      <button style={[styles.confirmButton, styles.yesButton]} onClick={onConfirmClick}>Yes</button>
      <button style={[styles.confirmButton, styles.noButton]} onClick={onCloseClick}>No</button>
    </div>
  </div>
) : null;

const FormTable = ({ loadingTags, forms, onRowClick, confirmDeletion }) => (
  <Table style={styles.list} striped={true} multiSelect={false}
    hasActions={ true } isLoading={ loadingTags }
    loadingMessage="Loading...">
    <TableHead>
      <TableHeader>{ window.L.t('Name') }</TableHeader>
      <TableHeader>{ window.L.t('Description') }</TableHeader>
      <TableHeader>{ window.L.t('Submissions') }</TableHeader>
    </TableHead>
    <TableBody>
      {forms.map((form, i) => <FormTableRow header={form.header} key={i}
        index={i} form={form} onRowClick={onRowClick} confirmDeletion={confirmDeletion} />)}
    </TableBody>
  </Table>
);

const FormTableRow = ({ index, form, onRowClick, confirmDeletion, header }) => (
  <TableRow onClick={() => onRowClick(form.id)} style={styles.row} key={index}>
    <TableCell>{header.title}</TableCell>
    <TableCell style={{maxWidth: 400}}>{header.description}</TableCell>
    <TableCell>{form.stats.responses}</TableCell>
    <TableCell>
      <div style={styles.trashButton} onClick={() => confirmDeletion(header.title, header.description, form.id) }>
        <FaTrash style={styles.trashIcon} key={index} />
      </div>
    </TableCell>
  </TableRow>
);

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottom: `1px solid ${mediumGrey}`,
    marginBottom: 10
  },
  list: {
    width: '100%',
    border: 'none'
  },
  row: {
    cursor: 'pointer',
    borderBottom: `5px solid ${lightGrey}`,
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: lightGrey
    }
  },
  createButton: {
    marginTop: 10
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
    background: brandColor,
    color: 'white'
  },
  noButton: {
    left: '30px',
    bottom: '30px'
  },
  trashButton: {
    backgroundColor: lightGrey,
    width: 30,
    height: 30,
    marginTop: 5,
    borderRadius: 3,
    position: 'relative',
    ':hover': {
      backgroundColor: mediumGrey
    }
  },
  trashIcon: {
    display: 'block',
    position: 'absolute',
    top: 7,
    left: 7
  }
};
