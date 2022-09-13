const _ = require('lodash');

// #region internal functions

/**
 * Find the most repeated word in a given array.
 *
 * @param {Array} arr: Array of strings or int
 * @returns: Most repeated string or int
 */
function getMostRepeated(arr) {
  let mostRepeted = '';
  let mostRepetedCount = -1;
  let countMapper = {};

  for (let item of arr) {
    if (!countMapper.hasOwnProperty(item)) {
      countMapper[item] = 1;
      continue;
    }

    countMapper[item]++;

    if (mostRepetedCount < countMapper[item]) {
      mostRepetedCount = countMapper[item];
      mostRepeted = item;
    }
  }

  return mostRepeted;
}

// #endregion

/**
 * Find the mode of a property of a object given a list of objects
 *
 * @param {Array<object>} objects : Array of objects
 * @param {string} property : The property name to be used for mode calculation
 */
function getMode(objects, property) {
  if (!objects || !objects.length) return null;

  if (!objects[0].hasOwnProperty(property)) return null;

  let values = null;

  if (_.isString(objects[0][property])) {
    values = objects.map((obj) => obj[property]);
  }

  if (_.isArray(objects[0][property])) {
    values = objects.reduce((acc, obj) => {
      return [...acc, ...obj[property]];
    }, []);
  }

  if (!values) {
    throw new Error('The type is not supported');
  }

  return getMostRepeated(values);
}

module.exports = {
  getMode,
};
