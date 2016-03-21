import React from 'react';
import Radium from 'radium';

import Heading from 'components/Heading';

import { Lang } from 'i18n/lang';

@Lang
class ContentHeader extends React.Component {
  render() {
    return (
      <section style={styles.base}>
        <Heading fontWeight="600"
          size="large"
          subhead={""/*"some optional subhead"*/}>
          { window.L.t(this.props.title) }
        </Heading>
      </section>
    );
  }
}

const styles = {
  base: {
    position: 'relative'
  }
};

export default Radium(ContentHeader);
