
/**
 * Module dependencies
 */

import isUndefined from 'lodash/lang/isUndefined';
import isNull from 'lodash/lang/isNull';
import reduce from 'lodash/collection/reduce';
import has from 'lodash/object/has';
import isString from 'lodash/lang/isString';
import isDate from 'lodash/lang/isDate';
import { clamp } from 'components/utils/math';

// TODO: refactor this function. It's large and hard to understand
export const parseFilterRanges = (ranges, filterState) =>
reduce(ranges, (accum, value, aggKey) => {
  let [key, field] = aggKey.split('_');

  if (field === 'id' || value === null) return accum;

  // we might have already updated the old filter with the min value
  // retrieve it from the accumulator in progress instead of the state
  let newFilter = has(accum, key) ? accum[key] : {};
  const oldFilter = filterState[key];
  const clampedUserMin = clamp(oldFilter.userMin, oldFilter.min, oldFilter.max);
  const clampedUserMax = clamp(oldFilter.userMax, oldFilter.min, oldFilter.max);

  const possibleDateValue = new Date(value);
  // if it's a Date, change the type
  // console.log('parsed value', aggKey, value, possibleDateValue);
  if (isString(value) && isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
    value = possibleDateValue;
  }

  // do not override the min that has been set if a minRange|maxRange has been set in data_config.json
  if ((isUndefined(oldFilter.minRange) && field === 'min') ||
    (isUndefined(oldFilter.maxRange) && field === 'max')) {
    newFilter[field] = value; // where field is {min|max}
  }
  accum[key] = newFilter;

  // on the first pass, go ahead and force a change on userMin and userMax
  // but only if the userMin and userMax are defaults.
  if (field === 'min' && +oldFilter.min === +clampedUserMin && isUndefined(oldFilter.minRange)) {
    newFilter.userMin = value;
  } else if (field === 'max' && +oldFilter.max === +clampedUserMax && isUndefined(oldFilter.maxRange)) {
    newFilter.userMax = value;
  }

  return accum;
}, {});

export const distributionForInput = (x, inputValue) =>
x.addQuery()
.project({
  count: {
    $subtract: [
      `$statistics.comments.all.all.${inputValue}`,
      {
        $mod: [`$statistics.comments.all.all.${inputValue}`, 15]
      }
    ]
  },
  _id: false
})
.group({
  _id: '$count',
  total: {$sum: 1}
})
.sort({
  '_id': 1
});

export const getFiltersFromConfig = configFilters => {
  const filterList = [];
  const editFilterList = [];
  const filters = configFilters.reduce((accum, filter, i) => {
    const key = `filter${i}`;
    const editableKey = `${key}Editable`;

    const min = isUndefined(filter.minRange) ? null : filter.minRange;
    const max = isUndefined(filter.maxRange) ? null : filter.maxRange;
    const userMin = isNull(min) ? null : filter.minRange;
    const userMax = isNull(max) ? null : filter.maxRange;

    accum[key] = {...filter, min, max, userMin, userMax, key};
    accum[editableKey] = {...accum[key], key: editableKey};

    if (filter.type === 'intDateProximity') {
      // "ago" filter does not load ranges from xenia yet.
      accum[key] = {...filter, min: 0, userMin: 0, max: 10000, userMax: 10000, key};
    }

    filterList.push(key);
    editFilterList.push(editableKey);

    return accum;
  }, {});

  return [filters, filterList, editFilterList];
};
