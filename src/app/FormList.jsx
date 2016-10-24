import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { authSnackbarDisplayedOnce } from 'app/AppActions';
import { deleteForm, fetchForms } from 'forms/FormActions';
import { mediumGrey, brandColor } from 'settings';
import Page from 'app/layout/Page';
import { IconButton, DataTable, TableHeader } from 'react-mdl';
import ContentHeader from 'components/ContentHeader';
import L from 'i18n';
import moment from 'moment';
import Login from 'app/Login';

import { CoralButton, CoralDialog } from '../components/ui';

// Forms, Widgets, Submissions
@connect(({ app, oidc, forms }) => ({ app, oidc, forms }))
@Radium
export default class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'open',
      copying:{}
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.setDisplayMode = this.setDisplayMode.bind(this);
    this.confirmDeletion = this.confirmDeletion.bind(this);
    this.onCopyFormClick = this.onCopyFormClick.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.dispatch(fetchForms());
  }

  componentWillUpdate() {
    if (!this.props.forms.formList) {
      this.props.dispatch(fetchForms());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(authSnackbarDisplayedOnce());
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
    const { formToDelete } = this.state;
    this.closeDialog();
    this.props.dispatch(deleteForm(...formToDelete));
  }

  closeDialog() {
    this.setState({
      confirmFormName: '',
      showConfirmDialog: false,
      formToDelete: null
    });
  }

  onRowClick(id) {
    this.context.router.push(`/forms/${id}/submissions`);
  }

  setDisplayMode(displayMode) {
    this.setState({ displayMode });
  }

  onCopyFormClick(form, event) {
    event.stopPropagation();
    this.context.router.push(`/forms/create?copying=${form.id}`);
  }

  render() {
    const {app, oidc, forms} = this.props;
    const allForms = forms.formList.map(id => forms[id]);
    const visibleForms = allForms.filter(form => form.status === this.state.displayMode);
    const { displayMode } = this.state;
    const authTimeout = app.features.authEnabled ? new Date(oidc.user.expires_at * 1000) : undefined;

    return (
      <Page authTimeout={authTimeout} displayAuthSnackbar={!app.authSnackbarDisplayedOnce}>

        <ContentHeader title="View Forms" style={styles.header} subhead="Create, edit and view forms">
          <Link to="forms/create" style={styles.createButton}>
            <CoralButton icon="add" type="success">
            Create a form
          </CoralButton>
          </Link>
        </ContentHeader>

        <CoralButton
          active={displayMode === 'open'}
          onClick={() => this.setDisplayMode('open')}
          style={{ marginRight: 10 }}
        >
          Live
        </CoralButton>

        <CoralButton
          active={displayMode === 'closed'}
          onClick={() => this.setDisplayMode('closed')}
        >
          Closed
        </CoralButton>

        <FormTable
          forms={visibleForms}
          onRowClick={this.onRowClick}
          confirmDeletion={this.confirmDeletion}
          onCopyFormClick={this.onCopyFormClick}
          copying={this.state.copying}
        />

        <ConfirmDialog
          show={this.state.showConfirmDialog}
          formName={this.state.confirmFormName}
          onConfirmClick={this.onConfirmClick}
          onCloseClick={this.closeDialog}
        />

      </Page>
    );
  }
}

const ConfirmDialog = ({ show, formName, onConfirmClick, onCloseClick }) => show ? (
  <CoralDialog
    className="confirmDialog"
    title="Delete form"
    onCancel={onCloseClick}
    open={show}
  >
    <div style={styles.dialogContent}>
      <h2 className="confirmDialog__title">Warning: this action has no undo.</h2>
      <p className="confirmDialog__description" style={styles.confirmMessage}>Are you sure you want to remove the form <strong style={ styles.strong }>"{ formName }"</strong>?</p>
      <div className="confirmDialog__actions" style={styles.actions}>
        <CoralButton className="confirmDialog__button--cancel" style={styles.cancelButton} onClick={onCloseClick}>Cancel</CoralButton>
        <CoralButton type="success" className="confirmDialog__button--confirm" onClick={onConfirmClick}>Yes, delete form</CoralButton>
      </div>
    </div>
  </CoralDialog>
) : null;

const formatForm = ({ header, stats, id, date_created }, index) => {
  return {
    id,
    name: header.title,
    description: header.description,
    submissions: stats.responses,
    date_created,
    copy: index,
    remove: index
  };
};


const FormTable = ({ loadingTags, forms, onRowClick, confirmDeletion, onCopyFormClick }) => (
  <DataTable style={styles.table} sortable rows={forms.map(formatForm)}>
    <TableHeader cellFormatter={(n, r, i) => <span style={styles.name} onClick={() => onRowClick(r.id)}>{n || L.t('Untitled Form')}</span>} name="name">{ L.t('Name') }</TableHeader>
    <TableHeader name="description">{ L.t('Description') }</TableHeader>
    <TableHeader sortFn={(a, b, asc) => asc ? b - a : a - b} cellFormatter={n => <span style={styles.submission}>{n}</span>} numeric name="submissions">{ L.t('Submissions') }</TableHeader>
    <TableHeader cellFormatter={date => moment(date).format('L')} name="date_created">{ L.t('Creation date') }</TableHeader>
    <TableHeader nosort name="copy" style={styles.rowActions} cellFormatter={i => <IconButton name='content_copy' onClick={e => onCopyFormClick(forms[i], e)}/>}></TableHeader>
    <TableHeader nosort style={styles.rowActions} name="remove"
      cellFormatter={i => <IconButton name='delete'
      onClick={e => confirmDeletion(forms[i].header.title, forms[i].header.description, forms[i].id, e)} />}></TableHeader>
  </DataTable>
);

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottom: `1px solid ${mediumGrey}`,
    marginBottom: 10
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
  actions: {
    paddingTop: 20,
    textAlign: 'right'
  },
  cancelButton: {
    marginRight: 10
  },
  dialogContent: {
    padding: 10
  },
  table: {
    marginTop: 25
  },
  submission: {
    textAlign: 'center'
  },
  rowActions: {
    width: 65,
    textAlign: 'right'
  },
  name: {
    cursor: 'pointer'
  }
};
