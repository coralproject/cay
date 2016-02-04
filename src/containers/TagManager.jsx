import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Page from './Page';
import ContentHeader from '../components/ContentHeader';
import InPlaceEditor from '../components/forms/InPlaceEditor';
import Tagger from '../components/forms/Tagger';
import Icon from '../components/Icon';

import Table from '../components/tables/Table';
import TableHead from '../components/tables/TableHead';
import TableHeader from '../components/tables/TableHeader';
import TableBody from '../components/tables/TableBody';
import TableRow from '../components/tables/TableRow';
import TableCell from '../components/tables/TableCell';

import { storeTag, getTags, deleteTag } from '../actions/tags';

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
    this.props.dispatch(deleteTag(tagName, tagDescription, index));
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
      this.setState({ adderValidationError: "Please type a valid tag, using only letters, numbers, dashes and underscores. Ex: this_is-1-valid_tag" });
    }
  }

  tagAdderKeyHandler(event) {
    if (event.key == 'Enter') {
      this.tagAdderClickHandler();
    }
  }

  onNameEdit(index, value) {
    var firstSlice = this.state.tags.slice(0, index);
    var lastSlice = this.state.tags.slice(index + 1);
    var tagsCopy = firstSlice.concat(value).concat(lastSlice);
    this.setState({ tags: tagsCopy });
  }

  onDescriptionEdit(tagName, index, value) {
    this.props.dispatch(storeTag(tagName, value, index));
  }

  render() {

    var tagList = this.props.tags ? 
      this.props.tags.map((tag, i) => {
        return (
          <TableRow key={ i }>
            <TableCell>
              <InPlaceEditor key={ i } initialValue={ tag.name } onSave={ this.onNameEdit.bind(this, i) } />
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
                  <span style={ styles.spinner }><Icon name="fa-spinner" /></span>
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

      </Page>
    );
  }
}
const styles = {
  tagManagerContent: {
    padding: '20px'
  },
  tableBase: {
    margin: '20px 0',
    width: '70%',
    maxWidth: '900px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: 'white',
    padding: '20px'
  },
  tableHeader: {
    textAlign: 'left',
    color: '#999'
  },
  actionsHeader: {
    width: '200px'
  },
  checkBoxColumn: {
    padding: '10px',
    textAlign: 'center'
  },
  checkBoxHeader: {
    padding: '10px',
    textAlign: 'center'
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
  actionColumn: {
    textAlign: 'right'
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
  }
};
