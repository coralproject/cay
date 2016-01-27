import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../../components/Icon';

import CommentBox from './commentBox';
import Stream from './stream';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  render() {

    return (
      <div style={ styles.preview }>
        <div style={ styles.previewBar }>
          <h2 style={ styles.previewBarTitle }>
            <Icon size="large" name="fa-eye" />
            <span style={ styles.previewTitleSpan }>Preview</span>
          </h2>
        </div>
        <div style={ styles.sandBox }>
          <p style={ styles.sandBoxIntro }>This is a sandbox only, this preview will be reset every time you reload the page.</p>
          <CommentBox />
          <Stream />
        </div>
      </div>
    );
  }
}

// same as the @connect decorator above
export default Preview;

var styles = {
  preview: {
    background: 'white',
    padding: '50px 350px 50px 50px',
    color: '#3d3d3d'
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
    fontSize: '16pt'
  },
  previewTitleSpan: {
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    fontSize: '24pt'
  }
};
