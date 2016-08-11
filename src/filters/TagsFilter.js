
/**
 * Module dependencies
 */

import React from 'react';
import Radium from 'radium';

/**
 * Tags filters
 */
 
export default Radium(({ tags, excludedTags, onShowAll, onShowOnly, onTagClick }) => (
  <div style={styles.container}>
    <span style={styles.showAll} onClick={onShowAll}>Show all</span>
    <h3 style={styles.title}>Only users with these tags</h3>
    <ol>
      {tags.concat({name: 'No tags'}).map((tag, key) => (
        <li style={styles.item} key={tag.name}>
          <label><input onChange={ evt => onTagClick(tag.name)}
            checked={-1 === excludedTags.indexOf(tag.name)} type='checkbox' /> {tag.name}
          </label>
          <span style={styles.showAll} onClick={() => onShowOnly(tags, tag.name)}>only</span>
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
