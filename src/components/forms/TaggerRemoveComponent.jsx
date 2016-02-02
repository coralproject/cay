import React from 'react';

import Icon from '../Icon.jsx';

export default class TaggerRemoveComponent extends React.Component {
  render() {
    return (
      <button {...this.props}>
        <Icon color="#a00" name="fa-times-circle" />
      </button>
    );
  }
}
