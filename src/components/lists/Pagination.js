
import React from 'react';
import Radium from 'radium';
import { bgColorBase, grey } from 'settings';

@Radium
export default class Pagination extends React.Component {

  render() {

    const { current, total, onChange } = this.props;

    const paginationStyle = {
      position: 'absolute',
      width: '100%',
      bottom: -30,
      backgroundColor: bgColorBase,
      display: total > 1 ? 'flex' : 'none',
      justifyContent: 'space-between'
    };

    return (
      <div style={paginationStyle}>
        <div
          onClick={() => onChange(0)}
          key="alpha"
          style={styles.arrow}>«</div>
        <div
          onClick={() => current && onChange(current - 1)}
          key="bravo"
          style={styles.arrow}>‹</div>
        <div
          style={styles.pageNum}
          key="charlie">Page {current + 1} of {total}</div>
        <div
          onClick={() => current < total && onChange(current + 1)}
          key="delta"
          style={styles.arrow}>›</div>
        <div
          onClick={() => onChange(total - 1)}
          key="echo"
          style={styles.arrow}>»</div>
      </div>
    );
  }
}

const styles = {
  arrow: {
    width: 32,
    height: 32,
    textAlign: 'center',
    cursor: 'pointer',
    color: grey,
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    borderRadius: 16,
    lineHeight: '1.5em',
    transition: 'all .3s',
    ':hover': {
      color: '#000',
      backgroundColor: grey
    }
  },
  pageNum: {
    lineHeight: '1.8em'
  }
};
