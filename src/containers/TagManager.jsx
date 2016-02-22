import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import InPlaceEditor from '../components/forms/InPlaceEditor';
import Tagger from '../components/forms/Tagger';

import Table from '../components/tables/Table';
import TableHead from '../components/tables/TableHead';
import TableHeader from '../components/tables/TableHeader';
import TableBody from '../components/tables/TableBody';
import TableRow from '../components/tables/TableRow';
import TableCell from '../components/tables/TableCell';

import { storeTag, getTags, deleteTag } from '../actions/tags';

import {FaSpinner} from 'react-icons';

require('../../css/react-tag-input.css');

@connect(state => {
  return state.tags;
})
@Radium
export default class TagManager extends React.Component {

  componentWillMount() {
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
      this.setState({ adderValidationError: 'Please type a valid tag, using only letters, numbers, dashes and underscores. Ex: this_is-1-valid_tag' });
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

  onTagEdit(tagDescription, index, value) {
    console.log(value);
    console.log(tagDescription);
    this.props.dispatch(storeTag(value, tagDescription, index));
  }

  render() {

    var tagList = this.props.tags ? 
      this.props.tags.map((tag, i) => {
        return (
          <TableRow key={ i }>
            <TableCell>
              <InPlaceEditor key={ i } initialValue={ tag.name } onSave={ this.onTagEdit.bind(this, tag.description, i) } />
            </TableCell>
            <TableCell>
              <InPlaceEditor key={ i } initialValue={ tag.description } onSave={ this.onDescriptionEdit.bind(this, tag.name, i) } />
            </TableCell>
            <TableCell>
              <button style={ [ styles.actionButtons, styles.danger ] } onClick={ this.confirmDeletion.bind(this, tag.name, tag.description, i) }>Delete</button>
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

        <ContentHeader title="Tag Manager" />

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

          <Table multiSelect={ true } hasActions={ true } isLoading={ this.props.loadingTags } loadingMessage="Loading tags...">
            <TableHead>
              <TableHeader>Tag</TableHeader>
              <TableHeader>Description</TableHeader>
            </TableHead>
            <TableBody>
              {
                  tagList
              }
            </TableBody>
          </Table>
          
          { 
            this.props.tags ?
              tagger
            : ''
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
    padding: '20px'
  },
  actionButtons: {
    border: '1px solid #ccc',
    padding: '10px',
    cursor: 'pointer',
    margin: '5px',
    background: 'none'
  },
  danger: {
    color: '#a00'
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
    borderLeft: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRight: '0px'
  },
  tagAdderButton: {
    display: 'inline-block',
    padding: '0 10px',
    lineHeight: '38px',
    background: '#eee',
    margin: '0px',
    border: '1px solid #ccc',
    fontSize: '11pt',
    cursor: 'pointer'
  },
  errorMsg: {
    color: '#900',
    margin: '10px 0'
  },
  loadingMsg: {
    color: '#999',
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
    bottom: '30px'
  },
  noButton: {
    left: '30px',
    bottom: '30px'
  },
  strong: {
    fontWeight: 'bold'
  }
};
