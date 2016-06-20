
import template from 'lodash/string/template';
import isDate from 'lodash/lang/isDate';
import XeniaDriver from 'xenia-driver';
import { clamp } from 'components/utils/math';

const pageSize = 20;

// create a silly new xenia driver
const xenia = new XeniaDriver('url', 'auth');

// make a query from the current state
onmessage = ({data: [fs, page, editMode]}) => {
  const filterList = editMode ? fs.editFilterList : fs.filterList;
  const filters = filterList.map(key => fs[key]);
  const x = xenia({
    name: 'user_search_' + Math.random().toString().slice(-10),
    desc: 'user search currently. this is going to be more dynamic in the future'
  });

  const addMatches = x => {
    let breakdown = editMode ? fs.breakdownEdit : fs.breakdown;
    let specificBreakdown = editMode ? fs.specificBreakdownEdit : fs.specificBreakdown;

    // filter by breakdown if needed
    if (-1 === ['author', 'section'].indexOf(breakdown) || specificBreakdown === '') {
      breakdown = 'all';
    } else {
      x.match({[`statistics.comments.${breakdown}.${specificBreakdown}`]: { $exists: true }});
    }

    filters.forEach(filter => {
      let dbField;
      // get the name of the mongo db field we want to $match on.
      if (breakdown !== 'all' && specificBreakdown !== '') {
        dbField = template(filter.template)({dimension: `${breakdown}.${specificBreakdown}`});
      } else { // all
        dbField = template(filter.template)({dimension: 'all'});
      }

      // Only create match statements for non-defaults
      // user min and user max are stored for UX purposes.
      // filter.userMax and filter.max COULD be different values, but be equivalent in the UI (visually)
      // filter.min and filter.max change when the ranges are populated from the server
      const clampedUserMin = clamp(filter.userMin, filter.min, filter.max);
      const clampedUserMax = clamp(filter.userMax, filter.min, filter.max);

      // convert everything to numbers since equivalent Dates are not equal
      // this will break if a string literal is ever a filter value since NaN !== NaN
      if (+filter.min !== +clampedUserMin) {
        let searchMin;
        if (isDate(clampedUserMin)) {
          searchMin = `#date:${clampedUserMin.toISOString()}`;
        } else if (filter.type === 'intDateProximity') {
          searchMin = `#time:${-clampedUserMin*24}h`;
        } else {
          searchMin = clampedUserMin;
        }

        x.match({[dbField]: {$gte: searchMin}});
      }

      if (+filter.max !== +clampedUserMax) {
        let searchMax;
        if (isDate(clampedUserMax)) {
          searchMax = `#date:${clampedUserMax.toISOString()}`;
        } else if (filter.type === 'intDateProximity') {
          searchMax = `#time:${-clampedUserMax*24}h`;
        } else {
          searchMax = clampedUserMax;
        }
        x.match({[dbField]: {$lte: searchMax}});
      }
    });

    return x;
  };
  addMatches(x.addQuery());

  if(fs.sortBy) {
    const breakdown = editMode ? fs.breakdownEdit : fs.breakdown;
    const specificBreakdown = editMode ? fs.specificBreakdownEdit : fs.specificBreakdown;
    const { sortBy } = fs;
    const field = template(sortBy[0])
      ({dimension: `${breakdown}${specificBreakdown ? `.${specificBreakdown}` : ''}`});
    x.sort([field, sortBy[1]]);
  }
  x.skip(page * pageSize).limit(pageSize)
    .include(['name', 'avatar', 'statistics.comments']);

  // get the counts
  addMatches(x.addQuery()).group({_id: null, count: {$sum: 1}});

  postMessage(x.addQuery()._data);
};
