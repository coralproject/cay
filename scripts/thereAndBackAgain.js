/*

  This file contains:

  - a schema for dynamic filters (suitable for storing in a config file)
  - functions to:
    - convert filters a xenia query_set (for execution and saving)
    - convert xenia query_sets to filterStates (for loading)
  - schenanigans and tests

  Author: David Erwin, Coral Project

*/

// filters schema
//  an array of this form can be stored in a config file to allow
//  cay installs to take advantage of any statistics and other
//  filterable fields that may have been loaded into the db.
//  The category field can be used to group filters on the fe.
//  The "name" and "description" fields should be translated.

var filters = [

  {
    name: 'Comments',
    category: 'Activity',
    field: 'stats.comments.total',
    description: 'Number of comments',
    min: 0,
    max: 500
  },
  {
    name: 'Replied',
    category: 'Activity',
    field: 'stats.replied',
    description: 'Number replies they have written to others.',
    min: 0,
    max: 500
  },
  {
    name: 'Replies',
    category: 'Response',
    field: 'stats.replies',
    description: 'Number times other have replied to them.',
    min: 0,
    max: 500
  },
  {
    name: 'Replies per Comment',
    category: 'Response',
    field: 'stats.replies_per_comment',
    description: 'Number of replies received per comment.',
    min: 0,
    max: 500
  }

];

var queryTemplate = {
  name: '<this is the user group name defined by the user>',
  desc: '<this is the user group description defined by the user>',
  pre_script: '',
  pst_script: '',
  params: [],
  queries: [
    {
      name: 'user_search',
      type: 'pipeline',
      collection: 'users',
      commands: [],
      return: true
    }
  ]
};


// Takes a filterState
// returns a xenia ready query_set generated from those filters
var getQueryFromFilterState = function (filterState) {

  var statement;
  var query = queryTemplate;

  for (var i in filterState) {

    // create the min statement
    statement = {};
    statement[i] = { $gte: filterState[i].userMin };

    query.queries[0].commands.push({ $match: statement });


    // create the max statement
    statement = {};
    statement[i] = { $lte: filterState[i].userMax };

    // TODO: min and max pipeline operations can be skipped if defaults

    query.queries[0].commands.push({ $match: statement });

  }

  return query;

};


// Takes a query_set from xenia
// Creates a filterState object ready to render the front end
var getFilterStateFromQuery = function (query) {

  var filterState = {},
    commands = query.queries[0].commands;

  for (var i in commands) {

    // we need to test against the operator
    for (var operator in commands[i]) {

      if (operator === '$match') {

        for (var field in commands[i][operator]) {

          var filter;

          if (typeof filterState[field] === 'undefined') {
            filter = getFilterByField(field);
          } else {
            filter = filterState[field];
          }

          for (var comparison in commands[i][operator][field]) {
            if (comparison === '$gte') {
              filter.min = commands[i][operator][field][comparison];
            } else if (comparison === '$lte') {
              filter.max = commands[i][operator][field][comparison];
            }
          }

          filterState[field] = filter;

        }

      }

    }


  }

  return filterState;

};

// Convenience function to look up a filter by it's field
var getFilterByField = function (field) {

  for (var k in filters) {
    if (filters[k].field === field) {
      return filters[k];
    }
  }

  return null;

};

// throwaway function to generate a random filter state for the demo
// could be fun for kicks
var getRandomFilterState = function () {

  var filter;
  var filterState = {};

  for (var i in filters) {

    /*
    if (Math.random() > 0.5) {
      continue;
    }*/

    // start from the default filter
    filter = filters[i];

    // get a min value in the lower 1/2 of the range
    filter.userMin = filters[i].min + Math.floor(Math.random() * ((filters[i].max - filters[i].min) / 2));
    // get a max value in the upper 1/2 of the range
    filter.userMax = filters[i].max - Math.floor(Math.random() * ((filters[i].max - filters[i].min) / 2));

    filterState[filters[i].field] = filter;

  }

  return filterState;

};

// this is the runner with quips to describe what's happening
(function () {

  console.log('Here\'s a random filterState:');
  var filterState = getRandomFilterState();
  console.log(filterState);


  console.log('------------------------');
  console.log('Here\'s a xenia query generated from that state:');
  var query = getQueryFromFilterState(filterState);
  console.log('(showing commands only)');
  console.log(query.queries[0].commands);


  console.log('------------------------');
  console.log('Here\'s the filter state restored from the xenia query');
  var extractedFilterState = getFilterStateFromQuery(query);
  console.log(extractedFilterState);


  console.log('just for kicks...  I\'m on my third whiskey...');

  var back = getQueryFromFilterState(extractedFilterState);
  var forth = getFilterStateFromQuery(back);
  back = getQueryFromFilterState(forth);
  forth = getFilterStateFromQuery(back);
  back = getQueryFromFilterState(getFilterStateFromQuery(back));
  forth = getFilterStateFromQuery(getQueryFromFilterState(getFilterStateFromQuery(back)));

  console.log('Are they the same after lots of schenanigans?');
  console.log(JSON.stringify(back) === JSON.stringify(query), ' and ', JSON.stringify(forth) === JSON.stringify(filterState));

}());
