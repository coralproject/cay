import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';
import Icon from '../../components/icon';

import CommentBox from './commentBox';
import Stream from './stream';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  render() {

    return (
      <div>
        <div style={ styles.previewBar }>
          <h2 style={ styles.previewBarTitle }>
            <Icon size="large" name="fa-eye" />
            Preview
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
  sandBox: {
    padding: '30px'
  },
  sandBoxIntro: {
    padding: '20px',
    color: settings.grey,
    textAlign: 'center',
    fontSize: '9pt'
  },
  previewBar: {
    padding: '30px',
    borderBottom: '1px solid ' + settings.lightGrey,
    position: 'relative',
    fontSize: '16pt',
    cursor: 'pointer'
  },
  previewBarTitle: {
    fontSize: '24pt'
  }
};
