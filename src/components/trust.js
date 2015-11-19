import React, {PropTypes} from 'react';
import Radium from 'radium';

import Button from './button';
import Checkbox from './checkbox';


import settings from '../settings';

import ContentHeader from './content-header';
import FilterTable from './filter-table';
import UserTable from './user-table';
import UserDetail from './user-detail';

@Radium
export default class Trust extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired,
    onUserClick: PropTypes.func.isRequired
  }

  render() {

    const users = [{"id":1,"displayName":"Paula","name":"Rickey Tremblay","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg","raw":{"name":"Dayne Heidenreich","username":"Robb","email":"Adriel@verdie.biz","address":{"street":"Hand Ridge","suite":"Apt. 780","city":"Aracelystad","zipcode":"71598","geo":{"lat":"70.9475","lng":"92.5130"}},"phone":"(178)043-6005 x211","website":"geovany.name","company":{"name":"Farrell and Daughters","catchPhrase":"Devolved modular definition","bs":"visualize one-to-one channels"}},"actions":[{"type":"recommend","userId":12,"date":"2015-03-11T14:23:02.358Z"},{"type":"recommend","userId":9,"date":"2013-02-09T04:23:02.359Z"},{"type":"recommend","userId":14,"date":"2012-11-25T03:23:02.360Z"},{"type":"recommend","userId":16,"date":"2015-10-10T12:23:02.360Z"},{"type":"recommend","userId":9,"date":"2011-09-26T07:23:02.360Z"},{"type":"recommend","userId":14,"date":"2014-01-24T23:23:02.360Z"}]},{"id":2,"displayName":"Gunner_Leuschke","name":"Matilde Schuster","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/kamal_chaneman/128.jpg","raw":{"name":"Reginald Satterfield","username":"Elna_Auer","email":"Blanca@albin.org","address":{"street":"Tillman Harbors","suite":"Apt. 969","city":"Stammmouth","zipcode":"80222","geo":{"lat":"59.6392","lng":"61.0492"}},"phone":"843.960.5448 x536","website":"jeffrey.net","company":{"name":"Nienow, Ferry and Abernathy","catchPhrase":"Team-oriented even-keeled adapter","bs":"deploy next-generation interfaces"}},"actions":[{"type":"recommend","userId":8,"date":"2012-12-10T08:23:02.361Z"},{"type":"recommend","userId":5,"date":"2012-05-11T10:23:02.361Z"},{"type":"recommend","userId":2,"date":"2015-11-09T22:23:02.361Z"},{"type":"recommend","userId":2,"date":"2013-09-10T02:23:02.361Z"},{"type":"recommend","userId":2,"date":"2014-10-10T12:23:02.361Z"},{"type":"recommend","userId":3,"date":"2015-01-24T23:23:02.361Z"}]},{"id":3,"displayName":"Mable_Rowe","name":"Adrien Rosenbaum DDS","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg","raw":{"name":"Rudy Schuppe","username":"Leon_Labadie","email":"Nick@matteo.org","address":{"street":"Runolfsdottir Green","suite":"Apt. 911","city":"Klingland","zipcode":"63677-6400","geo":{"lat":"35.1212","lng":"154.2305"}},"phone":"1-560-293-0858","website":"letha.me","company":{"name":"Stark, Nienow and Jerde","catchPhrase":"Devolved asynchronous parallelism","bs":"disintermediate transparent relationships"}},"actions":[{"type":"recommend","userId":13,"date":"2013-04-11T00:23:02.361Z"},{"type":"recommend","userId":8,"date":"2013-10-10T12:23:02.361Z"},{"type":"recommend","userId":16,"date":"2014-11-09T22:23:02.361Z"},{"type":"recommend","userId":7,"date":"2014-10-10T12:23:02.361Z"},{"type":"recommend","userId":11,"date":"2012-12-10T08:23:02.361Z"},{"type":"recommend","userId":13,"date":"2014-06-10T20:23:02.361Z"}]},{"id":4,"displayName":"Jordan","name":"Mr. Damian Kemmer","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/alevizio/128.jpg","raw":{"name":"Joan Quigley","username":"Ocie_Hoppe","email":"Oswaldo.Reilly@carlos.me","address":{"street":"Ullrich Groves","suite":"Suite 074","city":"South Harrisonmouth","zipcode":"64352","geo":{"lat":"-32.9236","lng":"169.0317"}},"phone":"(055)714-1865 x3854","website":"alana.io","company":{"name":"Wehner-Jacobson","catchPhrase":"Networked 6th generation synergy","bs":"transform wireless partnerships"}},"actions":[{"type":"recommend","userId":3,"date":"2012-08-10T16:23:02.361Z"},{"type":"recommend","userId":4,"date":"2013-02-09T04:23:02.361Z"},{"type":"recommend","userId":6,"date":"2013-06-26T01:23:02.361Z"},{"type":"recommend","userId":6,"date":"2011-09-26T07:23:02.361Z"},{"type":"recommend","userId":15,"date":"2014-05-11T10:23:02.361Z"},{"type":"recommend","userId":18,"date":"2012-08-10T16:23:02.361Z"}]},{"id":5,"displayName":"Jaeden","name":"Roderick Torphy","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/ccinojasso1/128.jpg","raw":{"name":"Christian Boyle","username":"Terrill","email":"Sherman.Jerde@karelle.net","address":{"street":"Strosin Plain","suite":"Suite 561","city":"Alexandrineside","zipcode":"57860","geo":{"lat":"-87.7410","lng":"-125.3712"}},"phone":"957.524.7454 x3189","website":"carlo.info","company":{"name":"Hickle LLC","catchPhrase":"De-engineered empowering emulation","bs":"implement ubiquitous experiences"}},"actions":[{"type":"recommend","userId":10,"date":"2015-08-25T21:23:02.361Z"},{"type":"recommend","userId":12,"date":"2015-03-11T14:23:02.361Z"},{"type":"recommend","userId":12,"date":"2012-11-25T03:23:02.361Z"},{"type":"recommend","userId":13,"date":"2015-04-26T05:23:02.361Z"},{"type":"recommend","userId":14,"date":"2012-09-25T07:23:02.361Z"},{"type":"recommend","userId":20,"date":"2015-05-26T15:23:02.361Z"}]},{"id":6,"displayName":"Demario","name":"Miss Thaddeus Lebsack","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/thaodang17/128.jpg","raw":{"name":"Sean Upton","username":"Desmond_Dach","email":"Charles@rogers.biz","address":{"street":"Jarod Mews","suite":"Suite 335","city":"South Hershel","zipcode":"02389-5128","geo":{"lat":"-34.1221","lng":"-105.5470"}},"phone":"1-899-875-5270 x8784","website":"domenick.me","company":{"name":"Nolan, Runolfsdottir and Nolan","catchPhrase":"Enterprise-wide zero tolerance customer loyalty","bs":"expedite synergistic eyeballs"}},"actions":[{"type":"recommend","userId":18,"date":"2012-12-25T13:23:02.361Z"},{"type":"recommend","userId":18,"date":"2014-08-10T16:23:02.361Z"},{"type":"recommend","userId":7,"date":"2014-12-10T08:23:02.361Z"},{"type":"recommend","userId":12,"date":"2014-03-26T19:23:02.361Z"},{"type":"recommend","userId":3,"date":"2014-02-09T04:23:02.361Z"},{"type":"recommend","userId":18,"date":"2011-10-11T12:23:02.361Z"}]},{"id":7,"displayName":"Gabriella_Cummings","name":"Carli Jacobson IV","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mocabyte/128.jpg","raw":{"name":"Mr. Justice Johnson","username":"Juston_Wilkinson","email":"Daryl.Gerlach@leora.biz","address":{"street":"Sincere Islands","suite":"Suite 037","city":"Port Caliton","zipcode":"20551","geo":{"lat":"-23.4489","lng":"-141.7459"}},"phone":"1-586-476-8174 x0354","website":"willy.com","company":{"name":"Gorczany-Mayer","catchPhrase":"Exclusive 3rd generation help-desk","bs":"deploy seamless e-business"}},"actions":[{"type":"recommend","userId":18,"date":"2012-11-09T22:23:02.361Z"},{"type":"recommend","userId":6,"date":"2014-11-25T03:23:02.361Z"},{"type":"recommend","userId":6,"date":"2012-10-10T12:23:02.361Z"},{"type":"recommend","userId":7,"date":"2015-09-10T02:23:02.361Z"},{"type":"recommend","userId":9,"date":"2014-12-10T08:23:02.361Z"},{"type":"recommend","userId":10,"date":"2015-06-26T01:23:02.361Z"}]},{"id":8,"displayName":"Noemie_Wuckert","name":"Franco Stehr","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/strikewan/128.jpg","raw":{"name":"Buster Hoppe","username":"Trent","email":"Celia@agustina.ca","address":{"street":"Bert Cliff","suite":"Suite 591","city":"Brandiborough","zipcode":"61544","geo":{"lat":"26.8669","lng":"-170.5121"}},"phone":"1-276-289-3669","website":"kristina.net","company":{"name":"McCullough and Sons","catchPhrase":"Cloned full-range initiative","bs":"disintermediate vertical partnerships"}},"actions":[{"type":"recommend","userId":10,"date":"2013-09-25T07:23:02.361Z"},{"type":"recommend","userId":2,"date":"2012-06-26T01:23:02.362Z"},{"type":"recommend","userId":5,"date":"2013-05-11T10:23:02.362Z"},{"type":"recommend","userId":4,"date":"2012-03-26T19:23:02.362Z"},{"type":"recommend","userId":2,"date":"2014-04-26T05:23:02.362Z"},{"type":"recommend","userId":16,"date":"2014-01-24T23:23:02.362Z"}]},{"id":9,"displayName":"Boyd.Streich","name":"Maximus Cummings","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/diansigitp/128.jpg","raw":{"name":"Guillermo Oberbrunner","username":"Gus","email":"Harmony@harold.me","address":{"street":"Lowe Curve","suite":"Apt. 627","city":"Port Mitchell","zipcode":"34328-1409","geo":{"lat":"43.9536","lng":"162.4635"}},"phone":"077.549.3754 x8485","website":"casey.info","company":{"name":"Ferry-Kihn","catchPhrase":"Sharable impactful secured line","bs":"extend one-to-one convergence"}},"actions":[{"type":"recommend","userId":16,"date":"2015-05-26T15:23:02.362Z"},{"type":"recommend","userId":10,"date":"2014-03-11T14:23:02.362Z"},{"type":"recommend","userId":2,"date":"2013-02-24T09:23:02.362Z"},{"type":"recommend","userId":9,"date":"2012-03-26T19:23:02.362Z"},{"type":"recommend","userId":9,"date":"2013-09-25T07:23:02.362Z"},{"type":"recommend","userId":9,"date":"2012-01-25T23:23:02.362Z"}]},{"id":10,"displayName":"Gunnar.Block","name":"Mrs. Judd Donnelly","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/robinclediere/128.jpg","raw":{"name":"Aliya Treutel DDS","username":"Bettye_Lind","email":"Frieda.Roob@tyrell.us","address":{"street":"Torp Underpass","suite":"Apt. 997","city":"Eliseland","zipcode":"78106-6181","geo":{"lat":"65.5011","lng":"-174.2749"}},"phone":"1-401-827-4988 x48534","website":"georgiana.info","company":{"name":"Brakus-Ryan","catchPhrase":"Extended composite synergy","bs":"deploy enterprise e-services"}},"actions":[{"type":"recommend","userId":5,"date":"2014-09-10T02:23:02.362Z"},{"type":"recommend","userId":16,"date":"2013-09-10T02:23:02.362Z"},{"type":"recommend","userId":10,"date":"2012-02-10T04:23:02.362Z"},{"type":"recommend","userId":10,"date":"2013-08-25T21:23:02.362Z"},{"type":"recommend","userId":13,"date":"2012-01-10T18:23:02.362Z"},{"type":"recommend","userId":10,"date":"2012-09-25T07:23:02.362Z"}]},{"id":11,"displayName":"Selmer_Kling","name":"Elian Nicolas","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg","raw":{"name":"Shayne Kshlerin","username":"Cassie.Cole","email":"Bertram@robb.name","address":{"street":"Littel Land","suite":"Apt. 869","city":"Rosalyntown","zipcode":"95531","geo":{"lat":"51.4938","lng":"149.4441"}},"phone":"1-872-457-5633 x8724","website":"sherwood.com","company":{"name":"Gleichner and Sons","catchPhrase":"Intuitive stable attitude","bs":"expedite dot-com interfaces"}},"actions":[{"type":"recommend","userId":10,"date":"2013-07-26T11:23:02.362Z"},{"type":"recommend","userId":12,"date":"2014-07-26T11:23:02.362Z"},{"type":"recommend","userId":15,"date":"2013-08-25T21:23:02.362Z"},{"type":"recommend","userId":14,"date":"2014-03-26T19:23:02.362Z"},{"type":"recommend","userId":15,"date":"2015-04-11T00:23:02.362Z"},{"type":"recommend","userId":7,"date":"2012-09-10T02:23:02.362Z"}]},{"id":12,"displayName":"Blake.Corkery","name":"Tomas Walker","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/homka/128.jpg","raw":{"name":"Vern Heaney","username":"Kathryn","email":"Amelie@katlyn.biz","address":{"street":"Bergnaum Fall","suite":"Suite 859","city":"Ferryburgh","zipcode":"61426","geo":{"lat":"56.1321","lng":"78.2691"}},"phone":"(931)425-7609","website":"rudolph.name","company":{"name":"Mann Group","catchPhrase":"Horizontal mission-critical ability","bs":"integrate one-to-one e-commerce"}},"actions":[{"type":"recommend","userId":17,"date":"2013-06-26T01:23:02.362Z"},{"type":"recommend","userId":11,"date":"2015-04-26T05:23:02.362Z"},{"type":"recommend","userId":4,"date":"2013-04-11T00:23:02.362Z"},{"type":"recommend","userId":18,"date":"2015-05-11T10:23:02.362Z"},{"type":"recommend","userId":10,"date":"2011-11-10T22:23:02.362Z"},{"type":"recommend","userId":10,"date":"2013-03-11T14:23:02.362Z"}]},{"id":13,"displayName":"Colleen.Morar","name":"Ludwig Pfeffer","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/tobysaxon/128.jpg","raw":{"name":"Natalia Stroman DVM","username":"Maurice.Denesik","email":"Ed_Wehner@trevor.co.uk","address":{"street":"Howell Oval","suite":"Suite 939","city":"Lake Efrain","zipcode":"27545-6313","geo":{"lat":"-45.1168","lng":"91.8773"}},"phone":"023.181.7287","website":"lucas.ca","company":{"name":"Berge, Murazik and Kling","catchPhrase":"Implemented needs-based initiative","bs":"unleash strategic paradigms"}},"actions":[{"type":"recommend","userId":16,"date":"2012-08-10T16:23:02.362Z"},{"type":"recommend","userId":9,"date":"2013-06-26T01:23:02.362Z"},{"type":"recommend","userId":5,"date":"2013-09-10T02:23:02.362Z"},{"type":"recommend","userId":9,"date":"2013-03-11T14:23:02.362Z"},{"type":"recommend","userId":4,"date":"2014-10-10T12:23:02.362Z"},{"type":"recommend","userId":7,"date":"2014-08-10T16:23:02.362Z"}]},{"id":14,"displayName":"Leora","name":"Summer Reichert","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/andresenfredrik/128.jpg","raw":{"name":"Andreanne Stokes","username":"Chaim.Rempel","email":"Zackery_Waelchi@chris.co.uk","address":{"street":"Schmeler Heights","suite":"Suite 199","city":"West Marilieburgh","zipcode":"84437","geo":{"lat":"-83.8439","lng":"83.2755"}},"phone":"(042)887-4231 x038","website":"rory.ca","company":{"name":"Waters, Torp and Wiegand","catchPhrase":"Secured object-oriented implementation","bs":"iterate e-business eyeballs"}},"actions":[{"type":"recommend","userId":4,"date":"2014-02-24T09:23:02.362Z"},{"type":"recommend","userId":16,"date":"2013-10-25T17:23:02.362Z"},{"type":"recommend","userId":10,"date":"2014-11-09T22:23:02.362Z"},{"type":"recommend","userId":15,"date":"2015-07-26T11:23:02.362Z"},{"type":"recommend","userId":6,"date":"2012-02-25T09:23:02.362Z"},{"type":"recommend","userId":3,"date":"2012-05-26T15:23:02.362Z"}]},{"id":15,"displayName":"Angelina","name":"Lizzie Walter","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/kohette/128.jpg","raw":{"name":"Jerome Corkery","username":"Maryjane_Robel","email":"Juwan@chadrick.biz","address":{"street":"Harªann Bridge","suite":"Suite 166","city":"Melodychester","zipcode":"86459-2120","geo":{"lat":"-19.3758","lng":"-151.7967"}},"phone":"268.233.7535 x386","website":"andreanne.me","company":{"name":"Feil, Dicki and Harris","catchPhrase":"Face to face local portal","bs":"recontextualize compelling schemas"}},"actions":[{"type":"recommend","userId":7,"date":"2015-02-09T04:23:02.363Z"},{"type":"recommend","userId":3,"date":"2014-12-10T08:23:02.363Z"},{"type":"recommend","userId":13,"date":"2015-06-10T20:23:02.363Z"},{"type":"recommend","userId":13,"date":"2014-02-09T04:23:02.363Z"},{"type":"recommend","userId":14,"date":"2012-01-25T23:23:02.363Z"},{"type":"recommend","userId":15,"date":"2015-08-10T16:23:02.363Z"}]},{"id":16,"displayName":"Winston","name":"Wilmer O'Conner","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/artd_sign/128.jpg","raw":{"name":"Martin Bergstrom Jr.","username":"Ericka","email":"Mathias@edgardo.us","address":{"street":"Stiedemann Ports","suite":"Suite 235","city":"Port Myra","zipcode":"35488","geo":{"lat":"-29.9303","lng":"-172.1217"}},"phone":"273-020-6250 x8445","website":"korbin.net","company":{"name":"Ritchie and Sons","catchPhrase":"Managed client-driven toolset","bs":"disintermediate web-enabled web-readiness"}},"actions":[{"type":"recommend","userId":2,"date":"2012-12-10T08:23:02.363Z"},{"type":"recommend","userId":8,"date":"2012-02-10T04:23:02.363Z"},{"type":"recommend","userId":2,"date":"2013-12-10T08:23:02.363Z"},{"type":"recommend","userId":18,"date":"2014-05-11T10:23:02.363Z"},{"type":"recommend","userId":10,"date":"2012-09-25T07:23:02.363Z"},{"type":"recommend","userId":19,"date":"2013-05-26T15:23:02.363Z"}]},{"id":17,"displayName":"Jan_Emard","name":"Carolyne Rempel","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/sprayaga/128.jpg","raw":{"name":"Catalina Romaguera","username":"Izabella_Beier","email":"Thalia_Wolff@brycen.me","address":{"street":"Easter Locks","suite":"Suite 189","city":"Port Carliborough","zipcode":"36911-1410","geo":{"lat":"1.0532","lng":"-37.5192"}},"phone":"644-912-9234 x86879","website":"jackie.name","company":{"name":"Crona Inc","catchPhrase":"Future-proofed executive function","bs":"harness e-business web services"}},"actions":[{"type":"recommend","userId":7,"date":"2014-04-11T00:23:02.363Z"},{"type":"recommend","userId":11,"date":"2012-05-11T10:23:02.363Z"},{"type":"recommend","userId":4,"date":"2013-03-11T14:23:02.363Z"},{"type":"recommend","userId":5,"date":"2013-02-24T09:23:02.363Z"},{"type":"recommend","userId":4,"date":"2015-01-24T23:23:02.363Z"},{"type":"recommend","userId":13,"date":"2013-02-09T04:23:02.363Z"}]},{"id":18,"displayName":"Jaida.Schamberger","name":"Leland Krajcik","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/simobenso/128.jpg","raw":{"name":"Aletha Stehr","username":"Kolby","email":"Emiliano.Powlowski@lavonne.ca","address":{"street":"Joany Junctions","suite":"Suite 330","city":"New Katlynport","zipcode":"92994-1769","geo":{"lat":"26.5010","lng":"25.4919"}},"phone":"1-190-478-7398 x4109","website":"marjory.name","company":{"name":"Kreiger-Renner","catchPhrase":"Right-sized neutral benchmark","bs":"architect one-to-one metrics"}},"actions":[{"type":"recommend","userId":14,"date":"2011-09-26T07:23:02.363Z"},{"type":"recommend","userId":9,"date":"2015-01-09T18:23:02.363Z"},{"type":"recommend","userId":6,"date":"2013-06-26T01:23:02.363Z"},{"type":"recommend","userId":6,"date":"2012-07-11T06:23:02.363Z"},{"type":"recommend","userId":11,"date":"2015-04-11T00:23:02.363Z"},{"type":"recommend","userId":9,"date":"2014-11-25T03:23:02.363Z"}]},{"id":19,"displayName":"Kendrick.Brakus","name":"Bennie Harber","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/jffgrdnr/128.jpg","raw":{"name":"Lorenza Mueller","username":"Destin_Cronin","email":"Maureen@emilia.net","address":{"street":"Howe Plains","suite":"Apt. 733","city":"South Kristofferville","zipcode":"46684","geo":{"lat":"48.9588","lng":"-160.5820"}},"phone":"(075)720-3072 x176","website":"tyrique.biz","company":{"name":"Zulauf, Will and Kassulke","catchPhrase":"Optional analyzing knowledge user","bs":"incubate e-business initiatives"}},"actions":[{"type":"recommend","userId":13,"date":"2012-12-25T13:23:02.363Z"},{"type":"recommend","userId":16,"date":"2014-03-11T14:23:02.363Z"},{"type":"recommend","userId":5,"date":"2013-10-25T17:23:02.363Z"},{"type":"recommend","userId":11,"date":"2012-01-10T18:23:02.363Z"},{"type":"recommend","userId":20,"date":"2015-07-26T11:23:02.363Z"},{"type":"recommend","userId":2,"date":"2013-03-11T14:23:02.363Z"}]},{"id":20,"displayName":"Jillian","name":"Mr. Mark Reichert","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/m4rio/128.jpg","raw":{"name":"Alfredo Wolf","username":"Conrad","email":"Elsa_Frami@jamel.ca","address":{"street":"Sid Parkways","suite":"Apt. 051","city":"East Constance","zipcode":"30700","geo":{"lat":"-32.7924","lng":"-128.7957"}},"phone":"815-523-5216 x972","website":"drake.us","company":{"name":"Lebsack Inc","catchPhrase":"Pre-emptive fresh-thinking complexity","bs":"cultivate user-centric web-readiness"}},"actions":[{"type":"recommend","userId":3,"date":"2013-06-26T01:23:02.363Z"},{"type":"recommend","userId":14,"date":"2013-06-10T20:23:02.363Z"},{"type":"recommend","userId":8,"date":"2012-11-25T03:23:02.363Z"},{"type":"recommend","userId":10,"date":"2012-07-26T11:23:02.363Z"},{"type":"recommend","userId":1,"date":"2014-08-10T16:23:02.363Z"},{"type":"recommend","userId":3,"date":"2015-09-25T07:23:02.363Z"}]}];

    return (
      <div style={styles.wrapper}>
        <ContentHeader title="Trust Module Header" />
        <div style={styles.base}>
          <UserDetail
            {...this.props}
            style={styles.userDetail} />
          <UserTable
            style={styles.userTable}
            users={users}
            onUserClick={this.props.onUserClick} />
          <FilterTable
            style={styles.filterTable}
            onFilterClick={this.props.onFilterClick}
            filters={['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']} />
        </div>
      </div>
    );
  }
}

var styles = {
  base: {
    display: 'flex',
    minHeight: '250px',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15 // why do I have to write these all out?
  },
  wrapper:  {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  },
  filterTable: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userTable: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  userDetail: {
    flex: 2,
    marginLeft: 5,
    marginRight: 5
  }
};
