import React from 'react';

import FaTimesCircle from 'react-icons/lib/fa/times-circle';

export default class TaggerRemoveComponent extends React.Component {
  render() {
    return (
      <button {...this.props}>
        <FaTimesCircle />
      </button>
    );
  }
}
