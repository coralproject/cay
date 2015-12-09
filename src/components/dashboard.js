import React from 'react';
import Radium from 'radium';

import RadioButtonGroup from './form/radio-button-group';
import RadioButton from './form/radio-button';
import Checkbox from './form/checkbox';
import Card from './cards/card';
import CardHeader from './cards/card-header';
import Paper from './paper';

import settings from '../settings';

import ContentHeader from './content-header';

@Radium
export default class Dashboard extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <ContentHeader title="Dashboard" />
        <div style={styles.base}>
          <Checkbox label="this is a checkbox label"/>
          <RadioButtonGroup>
            <RadioButton value="luke skywalker" label="Luke" checked="checked" />
            <RadioButton value="obi wan kenobi" label="Obi Wan" />
            <RadioButton value="leia organa" label="Leia" />
          </RadioButtonGroup>

          <div style={styles.row}>
            <Card style={[styles.panel, styles.firstChild]}>
              <CardHeader
                title="Module Name A"
                subtitle="A Super Awesome Subtitle"/>
              <Paper>
                <p>Bacon ipsum dolor amet spare ribs chicken pork loin kevin swine turkey flank picanha pastrami brisket ham beef ribs shoulder. Venison chuck ball tip biltong ground round, salami sausage beef kielbasa. Porchetta ground round brisket bresaola. Sirloin salami prosciutto capicola beef ribs, doner pancetta. Pork loin turkey spare ribs leberkas, beef jowl drumstick t-bone jerky brisket pig ball tip picanha. Ham sirloin shankle chuck, cupim shoulder meatball tail.</p>
              </Paper>
            </Card>
            <Card style={styles.panel}>
              <CardHeader
                title="Module Name B"
                subtitle=""/>
              <Paper>
                <p>Bacon ipsum dolor amet spare ribs chicken pork loin kevin swine turkey flank picanha pastrami brisket ham beef ribs shoulder. Venison chuck ball tip biltong ground round, salami sausage beef kielbasa. Porchetta ground round brisket bresaola. Sirloin salami prosciutto capicola beef ribs, doner pancetta. Pork loin turkey spare ribs leberkas, beef jowl drumstick t-bone jerky brisket pig ball tip picanha. Ham sirloin shankle chuck, cupim shoulder meatball tail.</p>
              </Paper>
            </Card>
            <Card style={[styles.panel, styles.lastChild]}>
              <CardHeader
                title="Module Name C"
                subtitle="A subtitle here"/>
              <Paper>
                <p>Bacon ipsum dolor amet spare ribs chicken pork loin kevin swine turkey flank picanha pastrami brisket ham beef ribs shoulder. Venison chuck ball tip biltong ground round, salami sausage beef kielbasa. Porchetta ground round brisket bresaola. Sirloin salami prosciutto capicola beef ribs, doner pancetta. Pork loin turkey spare ribs leberkas, beef jowl drumstick t-bone jerky brisket pig ball tip picanha. Ham sirloin shankle chuck, cupim shoulder meatball tail.</p>
              </Paper>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

var styles = {
  base: {
    minHeight: '250px',
    padding: '15px',
    // margin-right: auto;
    // margin-left: auto;
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  wrapper: {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  },
  row: {
    display: 'flex'
  },
  panel: {
    flex: 1,
    margin: 10
  },
  firstChild: {
    marginLeft: 0
  },
  lastChild: {
    marginRight: 0
  }
};
