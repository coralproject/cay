import React, {PropTypes} from 'react';
import Radium from 'radium';

class DropDownMenu extends React.Component {
  render() {
    return (
      <div>DropDownMenu</div>
    );
  }
}

DropDownMenu.propTypes = {
  menuItems: PropTypes.arrayOf({
    payload: PropTypes.string.isRequired,
    text: PropTypes.any.isRequired
  }),
  openImmediately: PropTypes.bool
};

export default Radium(DropDownMenu);
