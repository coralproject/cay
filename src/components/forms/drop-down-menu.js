import React, {PropTypes} from 'react';
import Radium from 'radium';

class DropDownMenu extends React.Component {
  render() {
    return (
      <div>
        {this.props.menuItems.map((item, i) => {
          return (<div key={i}>{item.text}</div>);
        })}
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.string.isRequired,
      text: PropTypes.any.isRequired
    })
  ),
  openImmediately: PropTypes.bool
};

export default Radium(DropDownMenu);
