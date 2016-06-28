import React from 'react';
import Radium from 'radium';

import Heading from 'components/Heading';

import { Lang } from 'i18n/lang';

@Lang
@Radium
class ContentHeader extends React.Component {
  render() {
    return (
      <section style={[styles.base, this.props.style]}>
        <Heading fontWeight="600"
          size="large"
          subhead={this.props.subhead ? this.props.subhead : ''}>
          { window.L.t(this.props.title) }
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
