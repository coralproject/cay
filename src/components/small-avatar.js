import React from 'react';
import Radium from 'radium';

@Radium
class SmallAvatar extends React.Component {
  render() {
    return (
      <div style={styles}>
        <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" />
      </div>
    );
  }
}

export default SmallAvatar;
