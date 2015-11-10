import React from 'react';
import Radium from 'radium';

import InfoBox from './info-box';
import Button from './button';
import Checkbox from './checkbox';

@Radium
class Trust extends React.Component {
  getFilters() {
    const filters = ['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']
    return filters.map(filter => <InfoBox name={filter} />);
  }

  render() {
    return (
      <div style={styles}>
        <Button>Base button</Button>
        <Button size="small">Small Button</Button>
        <Button size="large">Large Button</Button>
        <Checkbox checked={false} label="this is a checkbox label" />
        <div className="filterList">
          {this.getFilters()}
        </div>
      </div>
    );
  }
}

var styles = {
  minHeight: '250px',
  padding: '15px',
  // margin-right: auto;
  // margin-left: auto;
  paddingLeft: '15px',
  paddingRight: '15px'
}

export default Trust;
