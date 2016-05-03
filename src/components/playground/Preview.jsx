import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CommentBox from './CommentBox';
import Stream from './Stream';

import MdComment from 'react-icons/lib/md/comment';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { commentsAreVisible: this.props.togglerGroups.layout.togglers.hiddenbydefault.status };
  }

  onClickToReadClick() {
    this.setState({ commentsAreVisible: true });
  }

  onHideCommentsClick() {
    console.log("Hide");
    this.setState({ commentsAreVisible: false }); 
  }

  render() {


    var guidelines = this.props.togglerGroups['community'].togglers['guidelines'].status ? 
        <div style={ styles.guidelines }>
          We aim to create a safe and sustainable environment for discussion. That means:
          
          <ul>
            <li>Be supportive of each other</li>
            <li>Criticize ideas, not people</li>
            <li>Flag bad behavior</li>
            <li>Follow the rules</li>
          </ul>

          <p>The best contributions will be featured on the site and in our newsletter.</p>
          <a href="#">Click here to read our community guidelines and harassment policy.</a>
        </div>
      : 
        null;

    return (
      <div style={ styles.preview }>
        <div style={ styles.previewBar }>
          <h2 style={ styles.previewBarTitle }>
            <span style={ styles.previewTitleSpan }>PREVIEW</span>
          </h2>
          {
            this.props.togglerGroups.layout.togglers.hiddenbydefault.status &&
            this.state.commentsAreVisible ?
              <button style={ styles.hideComments } onClick={ this.onHideCommentsClick.bind(this) }>Hide comments</button>
            : null
          }
        </div>

        { 
          !this.props.togglerGroups.layout.togglers.hiddenbydefault.status || 
            this.state.commentsAreVisible ?

            <div style={ styles.sandBox }>
              <p style={ styles.sandBoxIntro }>This is a sandbox only, this preview will be reset every time you reload the page.</p>
              {guidelines}
              <CommentBox />
              <Stream />
            </div>

          : 

            <div style={ styles.clickToRead } onClick={ this.onClickToReadClick.bind(this) }>
              <MdComment /> Click to see the comments...
            </div>
        }
      </div>
    );
  }
}

// same as the @connect decorator above
export default Preview;

var styles = {
  preview: {
    background: 'white',
    padding: '40px',
    color: '#3d3d3d',
    minHeight: '500px',
    position: 'relative',
    [mediaQueries.tablet]: {
      padding: '20px 20px 120px 20px'
    }
  },
  previewIcon: {
    marginTop: '-10px',
    marginRight: '10px'
  },
  clickToRead: {
    cursor: 'pointer',
    padding: '20px',
    border: '1px solid #ddd',
    margin: '10px 0',
    fontSize: '20pt',
    color: '#444'
  },
  sandBox: {
  },
  sandBoxIntro: {
    padding: '20px',
    color: '#999',
    textAlign: 'center',
    fontSize: '9pt'
  },
  previewBar: {
    borderBottom: '1px solid #ccc',
    position: 'relative',
    fontSize: '16pt',
    paddingBottom: '10px',
    position: 'relative'
  },
  previewTitleSpan: {
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    fontSize: '24pt'
  },
  hideComments: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    background: '#eee',
    padding: '5px 10px',
    border: '1px solid #aaa'
  },
  guidelines: {
    padding: '20px',
    lineHeight: '1.1',
    color: '#222',
    background: '#eee',
    marginBottom: '20px'
  }
};
