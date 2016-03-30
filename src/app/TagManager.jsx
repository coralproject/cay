import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import InPlaceEditor from 'components/forms/InPlaceEditor';
import Tagger from 'components/forms/Tagger';

import Table from 'components/tables/Table';
import TableHead from 'components/tables/TableHead';
import TableHeader from 'components/tables/TableHeader';
import TableBody from 'components/tables/TableBody';
import TableRow from 'components/tables/TableRow';
import TableCell from 'components/tables/TableCell';

import { storeTag, getTags, deleteTag } from 'tags/TagActions';

import FaSpinner from 'react-icons/lib/fa/spinner';
import MdDelete from 'react-icons/lib/md/delete';

import settings from 'settings';

import { Lang } from 'i18n/lang';

require('react-tag-input.css');

@Lang
@connect(state => state.tags)
@Radium
export default class TagManager extends React.Component {

  invalidTagMessage = 'Please type a valid tag, using only letters, numbers, dashes and underscores. Ex: this_is-1-valid_tag'

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {

    // redirect to login page if user is not authorized
    //   TODO: refactor: pass in a function that calculates auth state
    if (window.requireLogin && !this.props.authorized) {
      const {router} = this.context;
      return router.push('/login');
    }

    this.setState({ tags: [ 'top_commenter', 'banned', 'moderator', 'martian', 'ufo' ] });
  }

  componentDidMount() {
    this.props.dispatch(getTags());
  }

  confirmDeletion(tagName, tagDescription, index) {
    this.setState({ confirmTagName: tagName, showConfirmDialog: true, tagToDelete: [ tagName, tagDescription, index ] });
  }

  onConfirmClick() {
    var tagToDelete = this.state.tagToDelete;
    this.setState({ confirmTagName: '', showConfirmDialog: false, tagToDelete: null });
    this.props.dispatch(deleteTag(...tagToDelete));
  }

  closeDialog() {
    this.setState({ confirmTagName: '', showConfirmDialog: false, tagToDelete: null });
  }

  validateTag(tagName) {
    return /^([A-Za-z_-\d]*)$/.test(tagName);
  }

  tagAdderClickHandler() {

    var tagName = React.findDOMNode(this.refs.tagNameInput).value;

    if (tagName.length > 0 && this.validateTag(tagName)) {
      this.setState({ adderValidationError: false });

      var tagDescription = React.findDOMNode(this.refs.tagDescriptionInput).value;

      React.findDOMNode(this.refs.tagNameInput).value = '';
      React.findDOMNode(this.refs.tagDescriptionInput).value = '';

      this.props.dispatch(storeTag(tagName, tagDescription));
    } else {
      this.setState({ adderValidationError: this.invalidTagMessage });
    }
  }

  tagAdderKeyHandler(event) {
    if (event.key == 'Enter') {
      this.tagAdderClickHandler();
    }
  }

  onDescriptionEdit(tagName, index, value) {
    this.props.dispatch(storeTag(tagName, value, index));
  }

  onTagNameEdit(tagDescription, index, value) {
    if (this.validateTag(value)) {
      this.props.dispatch(storeTag(value, tagDescription, index, this.props.tags[index].name));
    } else {
      this.showValidationError();
    }
  }

  render() {

    var tagList = this.props.tags ?
      this.props.tags.map((tag, i) => {
        return (
          <TableRow key={ i } style={ i % 2 ? styles.striped : null }>
            <TableCell style={ styles.tdPadding }>
              <InPlaceEditor key={ i } initialValue={ tag.name } validationMessage={ this.invalidTagMessage } validatorFunction={ this.validateTag } onSave={ this.onTagNameEdit.bind(this, tag.description, i) } />
            </TableCell>
            <TableCell style={ styles.tdPadding }>
              <InPlaceEditor key={ i } initialValue={ tag.description ? tag.description : '(No description given)' } onSave={ this.onDescriptionEdit.bind(this, tag.name, i) } />
            </TableCell>
            <TableCell style={ styles.tdPadding }>
              <button key={ i } style={ styles.actionButtons } onClick={ this.confirmDeletion.bind(this, tag.name, tag.description, i) }><MdDelete /></button>
            </TableCell>
          </TableRow>
        );
      })
    : null;

    var tagger = this.props.tags ?
      <div>
        <Tagger tagList={ this.props.tags } freeForm={ false } type="user" id={ 1 } />
      </div>
    : '';

    return (

      <Page>

        <ContentHeader title={ window.L.t('Tag Manager') } />

        <div style={ styles.tagManagerContent }>

          <div style={ styles.tagAdder }>
            <input style={ styles.tagAdderInput } ref="tagNameInput" onKeyPress={ this.tagAdderKeyHandler.bind(this) } type="text" placeholder="Tag name" />
            <input style={ styles.tagAdderInput } ref="tagDescriptionInput" onKeyPress={ this.tagAdderKeyHandler.bind(this) } type="text" placeholder="Description (optional)" />
            <button style={ styles.tagAdderButton } onClick={ this.tagAdderClickHandler.bind(this) }>Add tag</button>
            {
              this.props.loading ?
                <span style={ styles.loadingMessage }>
                  <span style={ styles.spinner }><FaSpinner /></span>
                  <span>Loading...</span>
                </span>
              : ''
            }
          </div>

          {
            this.props.hasErrors ?
              <div style={ styles.errorMsg }>{ this.props.errorMsg }</div>
            : ''
          }

          {
            this.state.adderValidationError ?
              <div style={ styles.errorMsg }>{ this.state.adderValidationError }</div>
            : ''
          }

          {
            this.props.tags && this.props.tags.length ?
              <div>
                <p>
                  { "Click on a tag's name or description to edit it." }
                </p>
                <Table style={styles.table} striped={ true } multiSelect={ false } hasActions={ true } isLoading={ this.props.loadingTags } loadingMessage="Loading tags...">
                  <TableHead>
                    <TableHeader>{ window.L.t('Tag') }</TableHeader>
                    <TableHeader>{ window.L.t('Description') }</TableHeader>
                  </TableHead>
                  <TableBody>
                    { tagList }
                  </TableBody>
                </Table>
              </div>
            :
              <p style={ styles.noTags }>No tags created yet.</p>
          }
        </div>

        {
          this.state.showConfirmDialog ?
          <div style={ styles.confirmOverlay }>
            <div style={ styles.confirmDialog }>
              <h2>Warning: this action has no undo.</h2>
              <p style={ styles.confirmMessage }>Are you sure you want to remove the tag <strong style={ styles.strong }>'{ this.state.confirmTagName }'</strong>?</p>
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
  tagManagerContent: {
  },
  noTags: {
    fontSize: '14pt',
    marginTop: '30px',
    fontStyle: 'italic'
  },
  actionButtons: {
    border: 'none',
    padding: '0px 10px',
    height: '40px',
    cursor: 'pointer',
    background: 'none',
    color: settings.darkGrey,
    ':hover': {
      color: 'red'
    }
  },
  danger: {
    color: settings.dangerColor
  },
  tagAdder: {
    width: '700px',
    margin: '20px 0'
  },
  tagAdderInput: {
    display: 'inline-block',
    padding: '0 10px',
    lineHeight: '40px',
    fontSize: '11pt',
    borderLeft: '1px solid ' + settings.blueGrey,
    borderTop: '1px solid ' + settings.blueGrey,
    borderBottom: '1px solid ' + settings.blueGrey,
    borderRight: '0px'
  },
  tagAdderButton: {
    display: 'inline-block',
    padding: '0 10px',
    lineHeight: '38px',
    background: '#eee',
    margin: '0px',
    border: '1px solid ' + settings.blueGrey,
    fontSize: '11pt',
    cursor: 'pointer'
  },
  errorMsg: {
    color: settings.dangerColor,
    margin: '10px 0'
  },
  loadingMessage: {
    color: settings.grey,
    fontSize: '11pt',
    padding: '0 20px',
    display: 'inline-block'
  },
  spinner: {
    display: 'inline-block',
    animationName: 'spin',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
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
  strong: {
    fontWeight: 'bold'
  },
  striped: {
    backgroundColor: settings.mediumGrey
  },
  tdPadding: {
    padding: '5px'
  },
  table: {
    maxWidth: '900px',
    width: '100%'
  }
};
