import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MdDelete from 'react-icons/lib/md/delete';

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
import { deleteAsk } from 'asks/AskActions';

@connect(({ asks }) => ({ asks }))
@Radium
export default class AskList extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  confirmDeletion(name, description, index, event) {
    event.stopPropagation();
    this.setState({
      confirmAskName: name,
      showConfirmDialog: true,
      askToDelete: [ name, description, index ]
    });
  }

  onConfirmClick() {
    var askToDelete = this.state.tagToDelete;
    this.setState({ confirmAskName: '', showConfirmDialog: false, tagToDelete: null });
    this.props.dispatch(deleteAsk(...askToDelete));
  }

  closeDialog() {
    this.setState({ confirmAskName: '', showConfirmDialog: false, askToDelete: null });
  }

  onRowClick(_id) {
    const {router} = this.context;
    return router.push(`/asks/${_id}`);
  }

  renderRow(ask, i) {
    return (
      <TableRow onClick={this.onRowClick.bind(this, ask._id)} style={styles.row} key={i}>
        <TableCell>{ask.name}</TableCell>
        <TableCell>{ask.description}</TableCell>
        <TableCell>{ask.answers}</TableCell>
        <TableCell><MdDelete key={i} onClick={ this.confirmDeletion.bind(this, ask.name, ask.description, i) } /></TableCell>
      </TableRow>
    );
  }

  render() {
    return (
      <Page>
        <ContentHeader title="Asks" style={styles.header}>
          <Link to="asks/create"><Button>Create</Button></Link>
        </ContentHeader>

        <Table style={styles.list} striped={ true } multiSelect={ false } hasActions={ true } isLoading={ this.props.loadingTags } loadingMessage="Loading...">
          <TableHead>
            <TableHeader>{ window.L.t('Name') }</TableHeader>
            <TableHeader>{ window.L.t('Description') }</TableHeader>
            <TableHeader>{ window.L.t('Answers') }</TableHeader>
          </TableHead>
          <TableBody>
            {this.props.asks.map(this.renderRow.bind(this))}
          </TableBody>
        </Table>
        {
          this.state.showConfirmDialog ?
          <div style={ styles.confirmOverlay }>
            <div style={ styles.confirmDialog }>
              <h2>Warning: this action has no undo.</h2>
              <p style={ styles.confirmMessage }>Are you sure you want to remove the ask <strong style={ styles.strong }>"{ this.state.confirmAskName }"</strong>?</p>
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
    width: '100%'
  },
  row: {
    cursor: 'pointer'
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
  }
}
