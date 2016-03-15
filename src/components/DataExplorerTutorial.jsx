import React from 'react';
import Radium from 'radium';

@Radium
class ExplorerTutorial extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome!</p>
        <p> {"Get started by selecting a query_set from the dropdown above or creating a new one."} </p>
      </div>
    );
  }
}

const styles = {
  backgroundColor: 'white',
  padding: '10px'
};

export default ExplorerTutorial;
