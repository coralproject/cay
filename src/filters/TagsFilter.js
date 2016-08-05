
/**
 * Module dependencies
 */

import React from 'react';
import Radium from 'radium';

/**
 * Tags filters
 */
 
export default Radium(({ tags, showNoTags, onShowAll, onShowOnly, onTagClick }) => (
  <div style={styles.container}>
    <span style={styles.showAll} onClick={onShowAll}>Show all</span>
    <h3 style={styles.title}>Only users with these tags</h3>
    <ol>
      {tags.concat({name: 'No tags', excluded: !showNoTags}).map((tag, key) => (
        <li style={styles.item} key={key}>
          <label><input onChange={ evt => onTagClick(key, evt.target.checked)}
            checked={!tag.excluded} type='checkbox' /> {tag.name}
          </label>
          <span style={styles.showAll} onClick={() => onShowOnly(key)}>only</span>
        </li>
      ))}
    </ol>
  </div>
));

/**
 * Module styles
 */

const styles = {
  container: {
    padding: 20
  },
  showAll: {
    float: 'right',
    cursor: 'pointer',
    color: '#999'
  },
  title: {
    marginBottom: 20
  },
  item: {
    margin: '10px auto'
  }
};