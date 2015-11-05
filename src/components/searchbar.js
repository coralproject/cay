import React from 'react';
import Radium from 'radium';

@Radium
class Searchbar extends React.Component {
  render() {
    return (
      <form style={styles.form} action="#" method="GET">
        <input style={styles.input} name="search" placeholder="Search..." type="text" />
        <button style={styles.button} type="submit">🔍</button>
      </form>
    );
  }
}

let styles = {
  form: {
    borderLeft: '1px solid #F87F70',
    borderRight: '1px solid #F87F70',
    float: 'left',
    width: '40%',
    height: '50px',
    margin: '0px 0px 0px 10%'
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    height: '100%',
    paddingLeft: '10px',
    fontSize: '20px',
    transition: 'background-color .3s',
    ':focus': {
      background: 'white',
      color: '#ccc'
    }
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    height: '100%',
    width: '40px'
  }
}

export default Searchbar;
