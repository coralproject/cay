import React from 'react';
import Radium from 'radium';

import Heading from 'components/Heading';

import L from 'i18n';

@Radium
class ContentHeader extends React.Component {
  render() {
    return (
      <section style={[styles.base, this.props.style]}>
        <Heading fontWeight="600"
          size="large"
          subhead={this.props.subhead ? this.props.subhead : ''}>
          { L.t(this.props.title) }
        </Heading>
        { this.props.children }
      </section>
    );
  }
}

const styles = {
  base: {
    position: 'relative'
  }
};

export default ContentHeader;
