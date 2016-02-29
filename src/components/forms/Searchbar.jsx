import React from 'react';
import Radium from 'radium';

import MdSearch from 'react-icons/lib/md/search';

@Radium
export default class Searchbar extends React.Component {
  render() {
    return (
      <form style={[styles.form, this.props.style]} action="#" method="GET">
        <input className="searchBar__input" style={styles.input} name="search" placeholder="Search..." type="text" />
        <MdSearch style={styles.icon} onClick={this.props.onClick} />
      </form>
    );
  }
}

const styles = {
  icon: {
    width: 32,
    height: 32,
    fill: 'white',
    cursor: 'pointer'
  },
  form: {
    borderLeft: '1px solid #F87F70',
    borderRight: '1px solid #F87F70',
    float: 'left',
    height: '50px',
    margin: '0px 0px 0px 10%',
    outline: 'none'
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    height: '100%',
    paddingLeft: 10,
    fontSize: '20px',
    transition: 'background-color .3s',
    ':focus': {
      background: 'white',
      color: '#ccc',
      outline: 'none'
    }
  }
};
