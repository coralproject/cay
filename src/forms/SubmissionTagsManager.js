
import React from 'react';
import Radium from 'radium';
import FaClose from 'react-icons/lib/fa/close';
import { mediumGrey, darkGrey, grey } from 'settings';

export default Radium(({ onAddTagKeyPress, tags = [], onRemoveTag }) => (
  <div style={styles.tags}>
    <h4 style={styles.tagTitle}>Tag submission</h4>
    <p style={styles.tagDescription}>Press 'enter' to add a tag</p>
    <input style={styles.tagInput} onKeyPress={onAddTagKeyPress} />
    <div style={styles.submissionTagsContainer}>
      {tags.filter(tag => -1 === ['flagged', 'bookmarked'].indexOf(tag))
        .map(tag => (
          <div className='submissionTag' key={tag} style={styles.submissionTag}>{tag}
            <FaClose style={styles.submissionTagRemove} onClick={() => onRemoveTag(tag)} /></div>
        ))}
    </div>
  </div>
));

const styles = {
  submissionTagsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 10,
    width: 140,
    flexWrap: 'wrap'
  },
  submissionTag: {
    background: '#fff',
    padding: 10,
    borderRadius: 4,
    border: `1px solid ${mediumGrey}`,
    marginRight: 5,
    display: 'flex',
    marginTop: 5
  },
  submissionTagRemove: {
    marginLeft: 5,
    cursor: 'pointer'
  },
  tags: {
    width: 200,
    paddingLeft: 30
  },
  tagTitle: {
    fontWeight: 'bold',
    color: darkGrey
  },
  tagDescription: {
    color: grey,
    marginTop: 5
  },
  tagInput: {
    marginTop: 5,
    height: 40,
    borderRadius: 8,
    width: 140,
    border: '1px solid #ccc',
    padding: 10,
    fontSize: 16
  }
}
