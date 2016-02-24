import React from 'react';
import Radium from 'radium';

import Heading from './Heading';

import { Lang } from '../lang';

@Lang
class ContentHeader extends React.Component {
  render() {
    return (
      <section style={styles.base}>
        <Heading
          size="large"
          subhead={""/*"some optional subhead"*/}>
          { L.t(this.props.title) }
        </Heading>
      </section>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    padding: '15px 15px 0 15px'
  }
};

export default Radium(ContentHeader);
